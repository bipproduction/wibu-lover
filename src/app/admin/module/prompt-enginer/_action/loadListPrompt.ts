"use server";
import prisma from "@/lib/db/prisma";

export async function loadListprompt() {
  const list = await prisma.promptEnginer.findMany({
    orderBy: {
      created: "desc",
    },
  });
  return list;
}
