#!/usr/bin/env python3
"""
Hind AI - Gemma 4 Fine-tuning Script
Unsloth implementation for spiritual domain adaptation

This script fine-tunes Gemma 4 4B on Sanskrit scripture Q&A pairs
and publishes the model to HuggingFace.

Requirements:
- pip install unsloth transformers datasets accelerate
- huggingface_hub login
"""

import os
import torch
from datasets import load_dataset, Dataset
from transformers import TrainingArguments
from unsloth import FastLanguageModel, is_bfloat16_supported
from huggingface_hub import HfApi
from trl import SFTTrainer

# Configuration
MODEL_NAME = "google/gemma-4-4b-it"
MAX_SEQ_LENGTH = 2048
DTYPE = torch.bfloat16 if is_bfloat16_supported() else torch.float16
LOAD_IN_4BIT = True

# Fine-tuning parameters
OUTPUT_DIR = "./gemma-4-hindai-finetuned"
HUB_MODEL_NAME = "mangeshraut712/gemma-4-hindai-spiritual"

# Spiritual domain training data
TRAINING_DATA = [
    {
        "instruction": "Explain the concept of Karma Yoga from Bhagavad Gita.",
        "input": "",
        "output": "Karma Yoga is the path of selfless action. In Bhagavad Gita Chapter 3, Lord Krishna teaches Arjuna that one should perform their duties without attachment to results, offering all actions to the divine. This leads to liberation from the cycle of karma.",
    },
    {
        "instruction": "What is the significance of Om (ॐ) in Hindu philosophy?",
        "input": "",
        "output": "Om is the primordial sound, the vibration that created the universe. It represents Brahman (ultimate reality) and encompasses the three states: waking (A), dreaming (U), and deep sleep (M), plus the transcendent state.",
    },
    {
        "instruction": "Explain the four Purusharthas.",
        "input": "",
        "output": "The four Purusharthas are the aims of life in Hindu philosophy: Dharma (righteousness), Artha (prosperity), Kama (pleasure), and Moksha (liberation). They guide ethical living and spiritual progress.",
    },
]


def create_dataset():
    """Create dataset from spiritual Q&A pairs"""
    return Dataset.from_list(TRAINING_DATA)


def setup_model():
    """Load and configure Gemma 4 model with Unsloth"""
    print("Loading Gemma 4 model...")

    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=MODEL_NAME,
        max_seq_length=MAX_SEQ_LENGTH,
        dtype=DTYPE,
        load_in_4bit=LOAD_IN_4BIT,
    )

    # Add LoRA adapters for efficient fine-tuning
    model = FastLanguageModel.get_peft_model(
        model,
        r=16,  # LoRA rank
        target_modules=[
            "q_proj",
            "k_proj",
            "v_proj",
            "o_proj",
            "gate_proj",
            "up_proj",
            "down_proj",
        ],
        lora_alpha=16,
        lora_dropout=0,
        bias="none",
        use_gradient_checkpointing="unsloth",
        random_state=3407,
    )

    return model, tokenizer


def format_prompt(example):
    """Format prompts for spiritual Q&A"""
    instruction = example["instruction"]
    input_text = example["input"]
    output = example["output"]

    if input_text:
        prompt = f"### Instruction:\n{instruction}\n\n### Input:\n{input_text}\n\n### Response:\n{output}"
    else:
        prompt = f"### Instruction:\n{instruction}\n\n### Response:\n{output}"

    return {"text": prompt}


def train_model(model, tokenizer, dataset):
    """Fine-tune the model on spiritual data"""
    print("Starting fine-tuning...")

    trainer = SFTTrainer(
        model=model,
        tokenizer=tokenizer,
        train_dataset=dataset,
        dataset_text_field="text",
        max_seq_length=MAX_SEQ_LENGTH,
        dataset_num_proc=2,
        packing=False,
        args=TrainingArguments(
            per_device_train_batch_size=2,
            gradient_accumulation_steps=4,
            warmup_steps=5,
            max_steps=60,  # Adjust based on dataset size
            learning_rate=2e-4,
            fp16=not is_bfloat16_supported(),
            bf16=is_bfloat16_supported(),
            logging_steps=1,
            optim="adamw_8bit",
            weight_decay=0.01,
            lr_scheduler_type="linear",
            seed=3407,
            output_dir=OUTPUT_DIR,
            save_steps=30,
            save_total_limit=2,
        ),
    )

    trainer_stats = trainer.train()
    print(f"Training completed. Stats: {trainer_stats}")

    return trainer


def save_and_publish(model, tokenizer, trainer):
    """Save model locally and publish to HuggingFace"""
    print("Saving model...")

    # Save locally
    model.save_pretrained(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)

    # Publish to HuggingFace Hub
    print(f"Publishing to HuggingFace as {HUB_MODEL_NAME}...")

    model.push_to_hub(HUB_MODEL_NAME, token=os.getenv("HF_TOKEN"))
    tokenizer.push_to_hub(HUB_MODEL_NAME, token=os.getenv("HF_TOKEN"))

    # Create model card
    api = HfApi()
    api.upload_file(
        path_or_fileobj="model_card.md",
        path_in_repo="README.md",
        repo_id=HUB_MODEL_NAME,
    )

    print(f"Model published successfully: https://huggingface.co/{HUB_MODEL_NAME}")


def create_model_card():
    """Create a model card for the fine-tuned model"""
    model_card = f"""---
language: en
tags:
- spiritual
- sanskrit
- hinduism
- gemma
- fine-tuned
license: apache-2.0
---

# Gemma 4 - Hind AI Spiritual Assistant

This is a fine-tuned version of Google's Gemma 4 model, specialized for Hindu philosophy and Sanskrit scriptures.

## Model Details

- **Base Model**: {MODEL_NAME}
- **Fine-tuned for**: Spiritual Q&A, Sanskrit explanations, Hindu philosophy
- **Training Data**: Curated spiritual texts and Q&A pairs
- **Framework**: Unsloth for efficient fine-tuning

## Usage

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("{HUB_MODEL_NAME}")
model = AutoModelForCausalLM.from_pretrained("{HUB_MODEL_NAME}")

prompt = "Explain Karma Yoga from Bhagavad Gita."
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_length=512)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
```

## Intended Use

This model is designed to assist with:
- Explaining Hindu philosophical concepts
- Answering questions about Sanskrit scriptures
- Providing culturally appropriate spiritual guidance
- Supporting educational applications

## Limitations

- May not be suitable for non-spiritual domains
- Requires careful review for sensitive topics
- Should not replace qualified spiritual teachers

## Training Details

- LoRA fine-tuning with rank 16
- Spiritual domain dataset
- Optimized for instruction following

---
Built for the Kaggle Gemma 4 Hackathon - Future of Education Track
"""

    with open("model_card.md", "w") as f:
        f.write(model_card)


def main():
    """Main fine-tuning pipeline"""
    print("🚀 Starting Hind AI Gemma 4 Fine-tuning")
    print("=" * 50)

    # Create training dataset
    dataset = create_dataset()
    print(f"📚 Created dataset with {len(dataset)} examples")

    # Setup model
    model, tokenizer = setup_model()

    # Format prompts
    dataset = dataset.map(format_prompt)
    print("📝 Formatted prompts for training")

    # Train model
    trainer = train_model(model, tokenizer, dataset)

    # Create model card
    create_model_card()

    # Save and publish
    save_and_publish(model, tokenizer, trainer)

    print("✅ Fine-tuning complete!")
    print(f"🎉 Model available at: https://huggingface.co/{HUB_MODEL_NAME}")


if __name__ == "__main__":
    main()
