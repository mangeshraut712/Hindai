import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  const nvidiaKey = process.env.NVIDIA_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;
  const openrouterUrl = process.env.OPENROUTER_URL || 'https://openrouter.ai/api/v1/chat/completions';

  const results: {
    nvidia: { status: string; error: any; response: any };
    openrouter: { status: string; error: any; response: any };
  } = {
    nvidia: { status: 'not_tested', error: null, response: null },
    openrouter: { status: 'not_tested', error: null, response: null }
  };

  // Test NVIDIA API
  if (nvidiaKey) {
    try {
      const nvidiaResponse = await fetch(
        'https://integrate.api.nvidia.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${nvidiaKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'meta/llama-3.1-70b-instruct',
            messages: [
              {
                role: 'user',
                content: 'Test message - respond with "NVIDIA OK"'
              }
            ],
            max_tokens: 10,
            temperature: 0.1
          })
        }
      );

      if (nvidiaResponse.ok) {
        const nvidiaData = await nvidiaResponse.json();
        results.nvidia.status = 'success';
        results.nvidia.response = {
          content: nvidiaData.choices[0]?.message?.content,
          model: nvidiaData.model,
          usage: nvidiaData.usage
        };
      } else {
        const errorData = await nvidiaResponse.text();
        results.nvidia.status = 'error';
        results.nvidia.error = {
          status: nvidiaResponse.status,
          details: errorData
        };
      }
    } catch (error) {
      results.nvidia.status = 'error';
      results.nvidia.error = {
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  } else {
    results.nvidia.status = 'missing_key';
    results.nvidia.error = { message: 'NVIDIA_API_KEY not found' };
  }

  // Test OpenRouter API
  if (openrouterKey) {
    try {
      const openrouterResponse = await fetch(openrouterUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://hindai-nine.vercel.app',
          'X-Title': 'Hind AI Scripture Platform'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-haiku',
          messages: [
            {
              role: 'user',
              content: 'Test message - respond with "OpenRouter OK"'
            }
          ],
          max_tokens: 10,
          temperature: 0.1
        })
      });

      if (openrouterResponse.ok) {
        const openrouterData = await openrouterResponse.json();
        results.openrouter.status = 'success';
        results.openrouter.response = {
          content: openrouterData.choices[0]?.message?.content,
          model: openrouterData.model,
          usage: openrouterData.usage
        };
      } else {
        const errorData = await openrouterResponse.text();
        results.openrouter.status = 'error';
        results.openrouter.error = {
          status: openrouterResponse.status,
          details: errorData
        };
      }
    } catch (error) {
      results.openrouter.status = 'error';
      results.openrouter.error = {
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  } else {
    results.openrouter.status = 'missing_key';
    results.openrouter.error = { message: 'OPENROUTER_API_KEY not found' };
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    results
  });
}
