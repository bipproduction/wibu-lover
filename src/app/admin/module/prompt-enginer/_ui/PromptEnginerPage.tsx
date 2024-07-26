'use client'
import { useAlert } from "@/lib/state/alert";
import { ActionIcon, Button, Card, Code, Flex, Group, JsonInput, Loader, Modal, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdClose, MdDelete, MdEdit, MdRemove } from "react-icons/md";

export default function PromptEnginerPage() {
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


type DataForm = {
    id?: string
    title: string
    prompt: string
    desc: string,
    type: "edit" | "create"
}
function FormEngineer({ data, onSuccess }: { data: DataForm, onSuccess: () => void }) {
    const [alert, setAlert] = useAlert()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState(data)

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
            setForm(data)

            onSuccess()
            return setLoading(false)
        }


        setAlert({
            message: `create failed ${res.status} | ${res.statusText}`,
            type: "error"
        })
        setLoading(false)

    }
    async function onUpdate() {
        setLoading(true)
        const res = await fetch("/admin/api/prompt-update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        if (res.ok) {
            setLoading(false)
            return onSuccess()
        }

        setLoading(false)
        setAlert({
            message: `update failed ${res.status} | ${res.statusText}`,
            type: "error"
        })
    }
    return <Stack p={"md"}>
        <Title order={4}>{data.type === "create" ? "create" : "update"}</Title>
        <TextInput placeholder="title" label="title" value={form.title} onChange={(v) => setForm({ ...form, title: v.currentTarget.value })} />
        <Textarea placeholder="description" label="description" value={form.desc} onChange={(v) => setForm({ ...form, desc: v.currentTarget.value })} />
        <JsonInput styles={{
            input: {
                backgroundColor: "#222831",
                color: "gray"
            },
        }} value={form.prompt} onChange={(v) => setForm({ ...form, prompt: v })} label="prompt" minRows={10} maxRows={20} autosize validationError={"json error"} />
        <Group justify="flex-end">
            <Button loading={loading} onClick={data.type === "create" ? onCreate : onUpdate}>{data.type === "create" ? "create" : "update"}</Button>
        </Group>
    </Stack>
}

function ListPrompt({ reload }: { reload: number }) {
    const [listPrompt, setListPrompt] = useState<any[] | null>(null)
    const [editId, setEditId] = useState("")

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

    async function onEdit(id: string) {
        setEditId(id)
    }

    return <Stack p={"md"} mah={720} pos={"relative"} style={{
        overflowY: "auto",
    }}>
        <Title order={4}>list prompt</Title>
        <Stack>
            {!listPrompt && <Loader />}
            {listPrompt?.map((v, k) => <Stack key={k}>
                <Card withBorder display={v.id === editId ? "block" : "none"}>
                    <EditPrompt data={{ ...v, type: "edit" }} onClose={() => {
                        setEditId("")
                        loadListPrompt()
                    }} />
                </Card>
                <Card withBorder display={v.id === editId ? "none" : "block"}>
                    <Stack gap={0}>
                        <Flex justify="space-between" gap={"md"}>
                            <Text fw={"bold"}>{v.title}</Text>
                            <Flex gap={"md"}>
                                <ButtonDelete onSuccess={() => loadListPrompt()} id={v.id} />
                                <ActionIcon onClick={() => onEdit(v.id)} variant="transparent">
                                    <MdEdit />
                                </ActionIcon>
                            </Flex>
                        </Flex>
                        <Flex gap={"md"}>
                            <Text w={100}>desc: </Text>
                            <Text flex={1}>{v.desc}</Text>
                        </Flex>
                        <Stack gap={0} p={"md"} style={{
                            backgroundColor: "lightgrey"
                        }}>
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
            return
        }


        setLoading(false)
        setAlert({
            message: `delete failed ${res.status} | ${res.statusText}`,
            type: "error"
        })
    }

    return <Stack gap={0}>
        <ActionIcon variant="transparent" loading={loading} onClick={() => setOpen(true)} radius={100}>
            <MdDelete color="red" />
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

function EditPrompt({ data, onClose }: { data: DataForm, onClose: () => void }) {

    return <Stack>
        <Flex justify={"space-between"}>
            <Title order={4}>edit prompt</Title>
            <ActionIcon variant="transparent" onClick={onClose}>
                <MdClose />
            </ActionIcon>
        </Flex>
        <FormEngineer data={data} onSuccess={() => onClose()} />
    </Stack>
}