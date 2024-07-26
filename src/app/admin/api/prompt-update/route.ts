import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  const { id, title, prompt, desc } = await req.json();
  if (!id || !title || !prompt || !desc) {
    return new Response(JSON.stringify({ error: "require id and content" }), {
      status: 400,
    });
  }
  const update = await prisma.promptEnginer.update({
    where: { id },
    data: {
      title,
      prompt,
      desc,
    },
  });
  
  return new Response(JSON.stringify(update));
}
