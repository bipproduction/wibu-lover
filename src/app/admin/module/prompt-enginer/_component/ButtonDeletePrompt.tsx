'use client'
import { Button } from "@mantine/core"
import { deletePrompt } from "../_action/deletePrompt"
import { useState } from "react"

export function ButtonDeletePrompt({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    async function onDeletePrompt() {
        setLoading(true)
        const res = await deletePrompt(id)
        if (res) {
            setLoading(false)
            return
        }
        setLoading(false)
    }
    return <Button
        loading={loading}
        variant="outline"
        size="xs"
        radius={100}
        color="red"
        onClick={onDeletePrompt}>delete</Button>
}