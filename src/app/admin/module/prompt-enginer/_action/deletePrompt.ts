'use server'
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function deletePrompt(id: string) {
  const res = await prisma.promptEnginer.delete({ where: { id } });
  revalidatePath("/admin/module/prompt-enginer");
  return res;
}
