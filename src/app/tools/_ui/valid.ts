"use server";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function valid(apa?: string) {
  const cookieStore = cookies();
  const valid = cookieStore.get("valid")?.value;
  const tooggle = _.isEmpty(valid) || valid === "false";
  cookieStore.set("valid", tooggle ? "true" : "false", {});
  console.log(apa);
  revalidatePath("/tools");
  return "apa kabat";
}
