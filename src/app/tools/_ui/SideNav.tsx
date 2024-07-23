'use client'
import { Stack, Flex, ActionIcon, Anchor, Avatar } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useSelectedLayoutSegments } from "next/navigation";
import { MdClose } from "react-icons/md";

export function SideNav({ listTools }: { listTools: any[] }) {
    const segment = useSelectedLayoutSegments()
    const currentSegment = "/tools/" + segment.join('/')
    const [open, setOpen] = useLocalStorage({
        key: "open_nav",
        defaultValue: false
    })

    return <Stack bg={"dark"} gap={0} p={"xs"} w={open ? 300 : 65} visibleFrom="md">
        <Flex justify={"start"}>
            <ActionIcon variant="transparent" onClick={() => setOpen(!open)}>
                <MdClose />
            </ActionIcon>
        </Flex>
        <Stack py={"xl"}>
            {open && listTools.map((v, k) => <Anchor c={currentSegment === v.link ? "cyan" : "white"} key={k} href={v.link} >{v.title}</Anchor>)}
            {!open && listTools.map((v, k) => <Anchor key={k} href={v.link} >
                <Avatar color={currentSegment === v.link ? "cyan" : "white"}>
                    {(v.title as string).substring(0, 1)}
                </Avatar>
            </Anchor>)}
        </Stack>
    </Stack>
}