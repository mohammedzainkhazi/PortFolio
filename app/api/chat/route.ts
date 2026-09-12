import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ response: 'Groq API key is not configured.' });
    }

    const { message, context } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    const groq = new Groq({ apiKey });

    const messages: Groq.Chat.ChatCompletionMessageParam[] = [];
    if (context) messages.push({ role: 'system', content: context });
    messages.push({ role: 'user', content: message });

    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages,
    });

    const response = completion.choices[0]?.message?.content ?? '';
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Groq API error:', error);
    return NextResponse.json({ response: 'I am currently operating in offline mode. Zain is available for direct inquiries!' });
  }
}



