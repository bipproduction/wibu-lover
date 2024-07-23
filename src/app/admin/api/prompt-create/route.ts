import prisma from "@/lib/db/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const create = await prisma.promptEnginer.create({ data });
  return new Response(JSON.stringify(create));
}
