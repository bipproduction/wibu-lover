import { valid } from "@/app/tools/_ui/valid";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET() {
  valid("apa ini").then((a) => console.log("valid + " + a));
  return new Response("revalidate");
}
