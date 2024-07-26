import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const data = await request.json();
  const create = await prisma.promptEnginer.create({ data });
  revalidatePath("/tools")
  return new Response(JSON.stringify(create));
}
