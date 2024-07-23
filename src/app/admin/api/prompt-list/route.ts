import prisma from "@/lib/db/prisma";

export async function GET() {
  const prompts = await prisma.promptEnginer.findMany({
    orderBy: { 
        created: "desc"
     },
  });

  return new Response(JSON.stringify(prompts));
}
