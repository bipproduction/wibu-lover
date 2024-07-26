
import { Flex, Stack, Title } from "@mantine/core";
import { LoadListPrompt } from "./_ui/LoadListPrompt";
import { SideNav } from "./_ui/SideNav";
import { ToolsHomeButton } from "./_ui/ToolsHomeButton";
import prisma from "@/lib/db/prisma";

export default async function ToolLayout({ children }: { children: React.ReactNode }) {

    return <Stack h={"100vh"} gap={0} w={"100%"} pos={"relative"}>
        <Flex gap={"md"} p={"sm"} style={{
            borderBottom: "1px solid #d9d9d9"
        }}>
            <ToolsHomeButton />
            <Title order={3}>tools</Title>
        </Flex>
        <Flex gap={0} flex={1}>
            <LoadListPrompt>
                {(list) => <SideNav listData={list} />}
            </LoadListPrompt>
            <Stack flex={1}>
                {children}
            </Stack>
        </Flex>
    </Stack>;
}