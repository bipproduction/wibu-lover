'use client'
import { Stack, Card, Title, TextInput, Textarea, Flex, Button } from "@mantine/core";
import { useState } from "react";
import { createPrompt } from "../_action/createPrompt";

const defaultFormData = {
    title: "",
    desc: "",
    prompt: ""
}
export function CreatePrompt() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(defaultFormData)
    async function onCreate() {
        setLoading(true)
        const res = await createPrompt(formData)
        if(res){
            setLoading(false)
            return setFormData(defaultFormData)
        }
        setLoading(false)
    }
    return <Stack p={"md"}>
        <Card withBorder>
            <Stack>
                <Title order={3}>Create</Title>
                <TextInput value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} label={"title"} placeholder={"title"} />
                <TextInput value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} label={"desc"} placeholder={"desc"} />
                <Textarea value={formData.prompt} onChange={e => setFormData({ ...formData, prompt: e.target.value })} autosize label={"prompt"} placeholder={"prompt"} />
                <Flex justify={"end"}>
                    <Button loading={loading} onClick={onCreate}>Create</Button>
                </Flex>
            </Stack>
        </Card>
    </Stack>
}