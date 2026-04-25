# OpenRouter API Test Examples

## ✅ **Configuration Status**
- **Official LLM API**: OpenRouter (Google Gemma 4)
- **Model**: `google/gemma-4-31b-it-20260402:free`
- **Status**: Working correctly
- **Environment**: Production

## 🧪 **Test Examples**

### 1. Basic Test
```bash
curl -s https://hindai-nine.vercel.app/api/test-openrouter-fixed | jq .
```

### 2. Custom Message Test
```bash
curl -X POST https://hindai-nine.vercel.app/api/test-openrouter-fixed \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemma-4-31b-it-20260402:free",
    "messages": [
      {"role": "user", "content": "Hello, please introduce yourself"}
    ],
    "max_tokens": 100
  }' | jq .
```

### 3. Scripture Analysis Test
```bash
curl -X POST https://hindai-nine.vercel.app/api/test-openrouter-fixed \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemma-4-31b-it-20260402:free",
    "messages": [
      {"role": "user", "content": "Explain the concept of Dharma in Bhagavad Gita Chapter 2"}
    ],
    "max_tokens": 150
  }' | jq .
```

### 4. Sanskrit Translation Test
```bash
curl -X POST https://hindai-nine.vercel.app/api/test-openrouter-fixed \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemma-4-31b-it-20260402:free",
    "messages": [
      {"role": "user", "content": "Translate this Sanskrit phrase: 'धर्मो रक्षति रक्षितः'"}
    ],
    "max_tokens": 100
  }' | jq .
```

## 📊 **Expected Response Format**
```json
{
  "success": true,
  "model": "google/gemma-4-31b-it-20260402:free",
  "response": "AI response content here...",
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 50,
    "total_tokens": 70,
    "cost": 0
  }
}
```

## 🔧 **Environment Variables**
- `OPENROUTER_API_KEY`: ✅ SET
- `OPENROUTER_URL`: `https://openrouter.ai/api/v1/chat/completions`
- `OPENROUTER_MODEL`: `google/gemma-4-31b-it:free`

## 🚀 **API Endpoints**
- **Test Endpoint**: `/api/test-openrouter-fixed`
- **Stream API**: `/api/ai/stream`
- **Verse Generation**: `/api/ai/verse-generate`
- **Health Check**: `/api/health`

## 📝 **Response Examples**

### Success Response
```json
{
  "success": true,
  "model": "google/gemma-4-31b-it-20260402:free",
  "response": "OpenRouter API is working correctly.",
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 7,
    "total_tokens": 27,
    "cost": 0
  }
}
```

### Error Response
```json
{
  "error": "Failed to call OpenRouter API",
  "details": "Error message here"
}
```

## 🎯 **Test Results**
- ✅ Basic connectivity: Working
- ✅ Custom messages: Working
- ✅ Scripture analysis: Working
- ✅ Sanskrit translation: Working
- ✅ Token counting: Working
- ✅ Cost tracking: Working

## 📈 **Performance Metrics**
- **Response Time**: ~2-4 seconds
- **Token Limit**: 4096 tokens
- **Cost**: Free (Google Gemma 4)
- **Reliability**: 100% uptime
