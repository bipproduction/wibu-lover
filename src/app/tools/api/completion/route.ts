import prisma from "@/lib/db/prisma";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
const openai = new OpenAI();

export async function POST(req: Request) {
  const { id, content } = await req.json();
  if (!id || !content) {
    return new Response(JSON.stringify({ error: "require id and content" }), {
      status: 400,
    });
  }
  const prompt = await prisma.promptEnginer.findUnique({ where: { id } });
  if (!prompt) {
    return new Response(JSON.stringify({ error: "prompt not found" }), {
      status: 400,
    });
  }

  const userPrompt = [
    {
      role: "user",
      content,
    },
  ];

  const messages = [
    ...(JSON.parse(prompt.prompt as string) as ChatCompletionMessageParam[]),
    ...userPrompt,
  ] as ChatCompletionMessageParam[];

    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-4o-mini",
    });

    return new Response(JSON.stringify(completion.choices[0].message.content));
//   return new Response(JSON.stringify({}));
}
