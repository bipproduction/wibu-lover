"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

type Data = {
  title: string;
  desc: string;
  prompt: string;
};
export async function createPrompt(data: Data) {
  const res = await prisma.promptEnginer.create({ data });
  revalidatePath("/admin/module/prompt-enginer");
  return res;
}
