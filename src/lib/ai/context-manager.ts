export class ContextManager {
  private maxContextTokens: number;
  private estimatedTokensPerChar: number = 0.25; // Rough estimate: 4 chars ≈ 1 token

  constructor(maxContextTokens: number = 32000) {
    this.maxContextTokens = maxContextTokens;
  }

  /**
   * Estimate token count for a text string
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length * this.estimatedTokensPerChar);
  }

  /**
   * Calculate total tokens in the conversation
   */
  private calculateTotalTokens(messages: Array<{ role: string; content: string }>): number {
    return messages.reduce((total, msg) => total + this.estimateTokens(msg.content), 0);
  }

  /**
   * Trim conversation to fit within token limit
   * Keeps system message and most recent messages
   */
  public trimConversation(
    messages: Array<{ role: string; content: string }>,
    systemPrompt: string
  ): Array<{ role: string; content: string }> {
    const systemTokens = this.estimateTokens(systemPrompt);
    const availableTokens = this.maxContextTokens - systemTokens - 1000; // Reserve 1000 tokens for response

    if (availableTokens <= 0) {
      console.warn("System prompt exceeds token limit");
      return [{ role: "system", content: systemPrompt }];
    }

    const history = messages.filter((message) => message.role !== "system");
    const kept: Array<{ role: string; content: string }> = [];
    let currentTokens = 0;

    // Keep the newest history that fits. The server prompt stays first and is not duplicated.
    for (let i = history.length - 1; i >= 0; i--) {
      const message = history[i];
      if (!message) continue;
      const messageTokens = this.estimateTokens(message.content);

      if (currentTokens + messageTokens > availableTokens) {
        break;
      }

      kept.unshift(message);
      currentTokens += messageTokens;
    }

    return [{ role: "system", content: systemPrompt }, ...kept];
  }

  /**
   * Get conversation summary for long conversations
   */
  public async summarizeConversation(
    messages: Array<{ role: string; content: string }>
  ): Promise<string> {
    // This would call an LLM to summarize the conversation
    // For now, return a simple summary
    const userMessages = messages.filter((m) => m.role === "user");
    const lastFewMessages = userMessages.slice(-3);

    return `Conversation summary: User asked about ${lastFewMessages.length} topics including ${lastFewMessages.map((m) => m.content.substring(0, 50)).join(", ")}`;
  }

  /**
   * Check if conversation needs summarization
   */
  public needsSummarization(messages: Array<{ role: string; content: string }>): boolean {
    const totalTokens = this.calculateTotalTokens(messages);
    return totalTokens > this.maxContextTokens * 0.7; // Summarize at 70% capacity
  }

  /**
   * Get context window info
   */
  public getContextInfo(messages: Array<{ role: string; content: string }>): {
    totalTokens: number;
    messageCount: number;
    utilization: number;
    needsTrimming: boolean;
  } {
    const totalTokens = this.calculateTotalTokens(messages);
    const utilization = totalTokens / this.maxContextTokens;

    return {
      totalTokens,
      messageCount: messages.length,
      utilization,
      needsTrimming: utilization > 0.8,
    };
  }
}

// Singleton instance
export const contextManager = new ContextManager();
