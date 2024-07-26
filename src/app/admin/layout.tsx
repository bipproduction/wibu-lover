'use client'
import { ActionIcon, Anchor, Flex, Stack, Text, Title } from "@mantine/core";
import { useSelectedLayoutSegments } from "next/navigation";
import { MdHome } from "react-icons/md";

const color = {
    border: "#d9d9d9"
}
const listMenu = [
    {
        id: "1",
        title: "propmt enginer",
        link: "/admin/module/prompt-enginer"
    },
    {
        id: "2",
        title: "test",
        link: "/admin/module/test"
    }
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const segment = useSelectedLayoutSegments()
    const currentSegment = "/admin/" + segment.join('/')
    return <Stack h={"100vh"} gap={0}>
        <Flex gap={"md"} p={"sm"} style={{
            borderBottom: `0.5px solid ${color.border}`
        }}>
            <ActionIcon onClick={() => window.location.href = "/"}>
                <MdHome />
            </ActionIcon>
            <Title order={3}>Admin</Title>
        </Flex>
        <Flex gap={0} flex={1} >
            <Stack w={200} gap={0} p={"md"} style={{
                borderRight: `0.5px solid ${color.border}`
            }} visibleFrom="md">
                <Stack gap={0} flex={1}>
                    {listMenu.map((v, k) => <Anchor c={currentSegment === v.link ? "cyan" : "black"} key={k} href={v.link} >{v.title}</Anchor>)}
                </Stack>
                <Text>v.1.0.1</Text>
            </Stack>
            <Stack flex={1} gap={0}>
                {children}
            </Stack>
        </Flex>
    </Stack>
}