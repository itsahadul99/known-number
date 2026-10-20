import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get('text');
    const lang = searchParams.get('lang') || 'bn';

    if (!text || !text.trim()) {
      return new NextResponse('Missing text parameter', { status: 400 });
    }

    // Clean text of quotes and excess characters, max 160 characters for clean single phrase
    const cleanText = text.replace(/["“”]/g, '').slice(0, 160).trim();

    // 1. Primary: Google TTS tw-ob endpoint
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(
      lang
    )}&q=${encodeURIComponent(cleanText)}`;

    try {
      const res = await fetch(ttsUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: '*/*',
        },
      });

      if (res.ok) {
        const audioBuffer = await res.arrayBuffer();
        if (audioBuffer.byteLength > 0) {
          return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'audio/mpeg',
              'Content-Length': audioBuffer.byteLength.toString(),
              'Accept-Ranges': 'bytes',
              'Cache-Control': 'public, max-age=86400, s-maxage=86400',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
      }
    } catch (err) {
      console.warn('Primary TTS upstream error, trying fallback:', err);
    }

    // 2. Fallback: Google Translate standard client
    const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&tl=${encodeURIComponent(
      lang
    )}&q=${encodeURIComponent(cleanText)}`;

    const fallbackRes = await fetch(fallbackUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (fallbackRes.ok) {
      const audioBuffer = await fallbackRes.arrayBuffer();
      return new NextResponse(audioBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.byteLength.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new NextResponse('TTS service unavailable', { status: 502 });
  } catch (error) {
    console.error('TTS API error:', error);
    return new NextResponse('Internal TTS error', { status: 500 });
  }
}
