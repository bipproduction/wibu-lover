
import { ActionIcon, Flex, Stack, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { MdHome } from "react-icons/md";
import { SideNav } from "./_ui/SideNav";
import prisma from "@/lib/db/prisma";
import { ToolsHomeButton } from "./_ui/ToolsHomeButton";

export default async function ToolLayout({ children }: { children: React.ReactNode }) {
    const listPromp = await prisma.promptEnginer.findMany()

    return <Stack h={"100vh"} gap={0} w={"100%"} pos={"relative"}>
        <Flex gap={"md"} p={"sm"} style={{
            borderBottom: "1px solid #d9d9d9"
        }}>
            <ToolsHomeButton />
            <Title order={3}>tools</Title>
        </Flex>
        <Flex gap={0} flex={1}>
            <SideNav listTools={listPromp.map(v => ({ title: v.title, link: "/tools/" + v.id }))} />
            <Stack flex={1}>
                {children}
            </Stack>
        </Flex>
    </Stack>;
}