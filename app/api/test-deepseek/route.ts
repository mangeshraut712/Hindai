import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'NVIDIA_API_KEY not found in environment variables' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { model = "deepseek-ai/deepseek-v4-pro", messages, max_tokens = 200 } = body;

    const response = await fetch(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: messages || [
            {
              role: 'user',
              content: 'Say hello'
            }
          ],
          max_tokens,
          temperature: 0.7
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { 
          error: 'NVIDIA API request failed',
          status: response.status,
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      model: data.model,
      response: data.choices[0]?.message?.content || 'No response content',
      usage: data.usage
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to call NVIDIA API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'DeepSeek V4 Pro Test Endpoint',
    usage: 'POST with JSON body containing model, messages, and max_tokens',
    example: {
      model: "deepseek-ai/deepseek-v4-pro",
      messages: [{"role": "user", "content": "Say hello"}],
      max_tokens: 200
    }
  });
}
