import prisma from "@/lib/db/prisma"
import { Box } from "@mantine/core"
import { loadListprompt } from "../_action/loadListPrompt"

export async function LoadListPrompt({ children }: { children: (list: any[]) => React.ReactNode }) {
    const list = await loadListprompt()
    return <Box>{children(list)}</Box>
}