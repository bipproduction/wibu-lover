
import { Flex, Stack, Title } from "@mantine/core";
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { LoadListPrompt } from "./_ui/LoadListPrompt";
import { SideNav } from "./_ui/SideNav";
import { ToolsHomeButton } from "./_ui/ToolsHomeButton";

export default async function ToolLayout({ children }: { children: React.ReactNode }) {

    const h = userAgent({headers: headers()}).engine
    return <Stack h={"100vh"} gap={0} w={"100%"} pos={"relative"}>
        {/* {d.length} */}
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