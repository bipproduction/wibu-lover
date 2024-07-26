'use client'
import { ActionIcon, Anchor, Avatar, Button, Flex, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { valid } from "./valid";


export function SideNav({ listData }: { listData: any[] }) {
    const segment = useSelectedLayoutSegments()
    const currentSegment = "/tools/" + segment.join('/')
    const [open, setOpen] = useState(true)

    return <Stack bg={"dark"} gap={0} p={"xs"} w={open ? 300 : 65} visibleFrom="md">
        <Flex justify={"start"}>
            <ActionIcon variant="transparent" onClick={() => setOpen(!open)}>
                <MdClose />
            </ActionIcon>
        </Flex>
        <Stack py={"xl"}>
            {open && listData.map((v, k) => <Anchor c={currentSegment === v.link ? "cyan" : "white"} key={k} href={"/tools/" + v.id} >{v.title}</Anchor>)}
            {!open && listData.map((v, k) => <Anchor key={k} href={"/tools/" + v.id} >
                <Avatar color={currentSegment === v.link ? "cyan" : "white"}>
                    {(v.title as string).substring(0, 1)}
                </Avatar>
            </Anchor>)}
        </Stack>
    </Stack>
}