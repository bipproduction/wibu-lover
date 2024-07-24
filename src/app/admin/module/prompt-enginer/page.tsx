'use client'
import { useAlert } from "@/lib/state/alert";
import { ActionIcon, Button, Card, Code, Flex, Group, JsonInput, Loader, Modal, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function Page() {
    const [reloadList, setReloadList] = useState(0)
    return <Flex wrap={"wrap"}>
        <Stack w={720}>
            <CreatePrompt onSuccess={() => setReloadList(r => r + 1)} />
        </Stack>
        <Stack flex={1}>
            <ListPrompt reload={reloadList} />
        </Stack>
    </Flex>
}

function CreatePrompt({ onSuccess }: { onSuccess: () => void }) {
    const [alert, setAlert] = useAlert()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useLocalStorage({
        key: "create-prompt2",
        defaultValue: {
            title: "",
            prompt: "",
            desc: ""
        }
    })

    async function onCreate() {
        const empty = form.title === ""
        if (empty) return setAlert({
            message: "title is require",
            type: "error"
        })

        try {
            const arr = _.isArray(JSON.parse(form.prompt))
            if (!arr) return setAlert({
                message: "prompt must be an array",
                type: "error"
            })

        } catch (error) {
            return setAlert({
                message: "prompt must be an array",
                type: "error"
            })
        }


        setLoading(true)
        const res = await fetch("/admin/api/prompt-create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })


        if (res.ok) {
            setAlert({
                message: "create success",
                type: "success"
            })
            setForm({
                title: "",
                prompt: "",
                desc: ""
            })

            onSuccess()
            return setLoading(false)
        }


        setAlert({
            message: `create failed ${res.status} | ${res.statusText}`,
            type: "error"
        })
        setLoading(false)

    }
    return <Stack p={"md"}>
        <Title order={4}>create</Title>
        <TextInput placeholder="title" label="title" value={form.title} onChange={(v) => setForm({ ...form, title: v.currentTarget.value })} />
        <Textarea placeholder="description" label="description" value={form.desc} onChange={(v) => setForm({ ...form, desc: v.currentTarget.value })} />
        <JsonInput styles={{
            input: {
                backgroundColor: "#222831",
                color: "gray"
            },
        }} value={form.prompt} onChange={(v) => setForm({ ...form, prompt: v })} label="prompt" minRows={10} maxRows={20} autosize validationError={"json error"} />
        <Group justify="flex-end">
            <Button loading={loading} onClick={onCreate}>create</Button>
        </Group>
    </Stack>
}

function ListPrompt({ reload }: { reload: number }) {
    const [listPrompt, setListPrompt] = useState<any[] | null>(null)


    useShallowEffect(() => {
        loadListPrompt()
    }, [reload])

    async function loadListPrompt() {
        const res = await fetch("/admin/api/prompt-list", {
            cache: "no-cache"
        })
        if (res.ok) {
            return setListPrompt(await res.json())
        }

        const apa = await res.text()
        console.log(apa)
    }
    return <Stack p={"md"} mah={720} pos={"relative"} style={{
        overflowY: "auto",
    }}>
        <Title order={4}>list prompt</Title>
        <Stack>
            {!listPrompt && <Loader />}
            {listPrompt?.map((v, k) => <Stack key={k}>
                <Card withBorder>
                    <Stack gap={0}>
                        <Flex justify="space-between" gap={"md"}>
                            <Text fw={"bold"}>{v.title}</Text>
                            <ButtonDelete onSuccess={() => loadListPrompt()} id={v.id} />
                        </Flex>
                        {(JSON.parse(v.prompt) as any[]).map((v, k) => <Stack gap={0} key={k}>
                            <Flex gap={"md"}>
                                <Text w={100}>role: </Text>
                                <Text flex={1}>{v.role}</Text>
                            </Flex>
                            <Flex gap={"md"}>
                                <Text w={100}>content: </Text>
                                <Text flex={1}>{v.content}</Text>
                            </Flex>
                        </Stack>)}
                    </Stack>
                </Card>
            </Stack>)}
        </Stack>
    </Stack>
}

function ButtonDelete({ id, onSuccess }: { id: string, onSuccess: () => void }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useAlert()
    async function onDelete() {
        setOpen(false)
        setLoading(true)
        const res = await fetch("/admin/api/prompt-delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })


        if (res.ok) {
            setLoading(false)
            onSuccess()
            return setAlert({
                message: "delete success",
                type: "success"
            })
        }


        setLoading(false)
        setAlert({
            message: `delete failed ${res.status} | ${res.statusText}`,
            type: "error"
        })
    }

    return <Stack gap={0}>
        <ActionIcon loading={loading} onClick={() => setOpen(true)} radius={100} bg={"red"}>
            <MdClose />
        </ActionIcon>
        <Modal opened={open} onClose={() => setOpen(false)}>
            <Stack p={"md"}>
                <Title order={4}>delete prompt</Title>
                <Text>Are you sure delete this prompt?</Text>
                <Group justify="right">
                    <Button onClick={() => setOpen(false)}>cancel</Button>
                    <Button color="red" onClick={onDelete}>delete</Button>
                </Group>
            </Stack>
        </Modal>
    </Stack>
}

export function EditPrompt({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useAlert()
    const [form, setForm] = useState<any>(null)

    return <Stack>

    </Stack>
}