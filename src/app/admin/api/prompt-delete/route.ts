import prisma from "@/lib/db/prisma";

export async function DELETE(request: Request) {
  const data = await request.json();
  const create = await prisma.promptEnginer.delete({ where: { id: data.id } });
  return new Response(JSON.stringify(create));
}
