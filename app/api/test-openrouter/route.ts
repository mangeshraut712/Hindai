import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const apiUrl = process.env.OPENROUTER_URL || 'https://openrouter.ai/api/v1/chat/completions';
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENROUTER_API_KEY not found in environment variables' },
      { status: 500 }
    );
  }

  try {
    // Test OpenRouter API with a simple completion request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://hindai-nine.vercel.app',
        'X-Title': 'Hind AI Scripture Platform'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: 'Hello, this is a test message. Please respond with "OpenRouter API is working correctly."'
          }
        ],
        max_tokens: 50,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { 
          error: 'OpenRouter API request failed',
          status: response.status,
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'OpenRouter API key test successful',
      response: data.choices[0]?.message?.content || 'No response content',
      model: data.model,
      usage: data.usage
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to test OpenRouter API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const apiKey = process.env.OPENROUTER_API_KEY;
  const apiUrl = process.env.OPENROUTER_URL || 'https://openrouter.ai/api/v1/chat/completions';
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENROUTER_API_KEY not found in environment variables' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://hindai-nine.vercel.app',
        'X-Title': 'Hind AI Scripture Platform'
      },
      body: JSON.stringify({
        model: body.model || 'anthropic/claude-3-haiku',
        messages: body.messages || [
          {
            role: 'user',
            content: 'Test message from API endpoint'
          }
        ],
        max_tokens: body.max_tokens || 100,
        temperature: body.temperature || 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { 
          error: 'OpenRouter API request failed',
          status: response.status,
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      response: data
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to call OpenRouter API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
