import prisma from "@/lib/db/prisma";
import { Center, Stack } from "@mantine/core";
import { ModulePage } from "../_ui/ModulePage";

export const dynamic = "force-dynamic"
export default async function Page({ params }: { params: { module: string[] } }) {
    const id = params.module[0]
    const prompt = await prisma.promptEnginer.findUnique({ where: { id } })
    if (!prompt) return <Center><Stack>prompt not found</Stack></Center>
    return <ModulePage title={prompt.title} desc={prompt.desc} id={id} />
}