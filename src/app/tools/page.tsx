import prisma from "@/lib/db/prisma";
import { Stack } from "@mantine/core";
import { headers, cookies } from 'next/headers';



export default function ToolsHome() {
    const host = headers().get("origin")
    const cookieStore = cookies();
    const valid = cookieStore.get("valid")
    // if(!host) return <p>host not found</p>
    return <Stack>
        {valid?.value}
        <Test>
            {(d) => <Stack>{JSON.stringify(d, null, 4)}</Stack>}
        </Test>
        <p>ini tools home</p>
    </Stack>
}


async function Test({ children }: { children: (val: any) => React.ReactNode }) {
    const d = await prisma.promptEnginer.findMany()

    return <Stack>{children(d)}</Stack>
}

