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
    const [listTools, setListTools] = useState<any[]>(listData)
    const [triger, setTriger] = useState(0)

    async function getListTools() {
        const res = await fetch("/api/list-prompt", { cache: "no-cache", next: { tags: ["tools"] } })
        if (res.status !== 200) return console.log(await res.text())
        const json = await res.json()
        setListTools(json)
    }

    useShallowEffect(() => {
        getListTools()
        if (triger) {
            valid("ini adalah apa").then((a) => console.log("valid + " + a))
        }
    }, [triger])

    const val = async () => {
        valid("ini adalah apa")
        // fetch("/api/revalidate", {
            
        // })
    }

    return <Stack bg={"dark"} gap={0} p={"xs"} w={open ? 300 : 65} visibleFrom="md">
        {/* <form action={val}>
            <Button  type={"submit"}>valid</Button>
        </form> */}
        {/* <Button onClick={val} type={"submit"}>Revalidate</Button> */}
        <Flex justify={"start"}>
            <ActionIcon variant="transparent" onClick={() => setOpen(!open)}>
                <MdClose />
            </ActionIcon>
        </Flex>
        <Stack py={"xl"}>
            {open && listTools.map((v, k) => <Anchor c={currentSegment === v.link ? "cyan" : "white"} key={k} href={"/tools/" + v.id} >{v.title}</Anchor>)}
            {!open && listTools.map((v, k) => <Anchor key={k} href={"/tools/" + v.id} >
                <Avatar color={currentSegment === v.link ? "cyan" : "white"}>
                    {(v.title as string).substring(0, 1)}
                </Avatar>
            </Anchor>)}
        </Stack>
    </Stack>
}