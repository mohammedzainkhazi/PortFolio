import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { message, context } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  const messages: Groq.Chat.ChatCompletionMessageParam[] = [];
  if (context) messages.push({ role: 'system', content: context });
  messages.push({ role: 'user', content: message });

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
  });

  const response = completion.choices[0]?.message?.content ?? '';
  return NextResponse.json({ response });
}
