import prisma from "@/lib/db/prisma";

export async function LoadListPrompt({ children }: { children: (list: any[]) => React.ReactNode }) {
    const listPromp = await prisma.promptEnginer.findMany()
    return <>{children(listPromp)}</>;
}