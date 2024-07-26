import prisma from "@/lib/db/prisma";

export async function GET() {
  const list = await prisma.promptEnginer.findMany({
    orderBy: {
      title: "asc",
    },
  });

  return new Response(JSON.stringify(list));
}
