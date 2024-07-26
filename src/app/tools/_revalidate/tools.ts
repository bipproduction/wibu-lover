"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateTools() {
  revalidatePath("/tools", "layout");
}
