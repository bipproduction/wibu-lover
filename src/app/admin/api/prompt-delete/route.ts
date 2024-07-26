import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function DELETE(request: Request) {
  const data = await request.json();
  const create = await prisma.promptEnginer.delete({ where: { id: data.id } });
  setTimeout(() => {
    revalidatePath("/tools", "layout");
    revalidatePath("/tools");
    console.log("revalidate");
  }, 5000);
  return new Response(JSON.stringify(create));
}
