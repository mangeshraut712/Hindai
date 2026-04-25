import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'NVIDIA_API_KEY not found in environment variables' },
      { status: 500 }
    );
  }

  try {
    // Test NVIDIA API with a simple completion request
    const response = await fetch(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-70b-instruct',
          messages: [
            {
              role: 'user',
              content: 'Hello, this is a test message. Please respond with "NVIDIA API is working correctly."'
            }
          ],
          max_tokens: 50,
          temperature: 0.5
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
      message: 'NVIDIA API key test successful',
      response: data.choices[0]?.message?.content || 'No response content',
      model: data.model,
      usage: data.usage
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to test NVIDIA API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const apiKey = process.env.NVIDIA_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'NVIDIA_API_KEY not found in environment variables' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: body.model || 'meta/llama3-70b-instruct',
          messages: body.messages || [
            {
              role: 'user',
              content: 'Test message from API endpoint'
            }
          ],
          max_tokens: body.max_tokens || 100,
          temperature: body.temperature || 0.7
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
      response: data
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
