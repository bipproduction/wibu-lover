'use client'

import { ActionIcon } from "@mantine/core"
import { MdHome } from "react-icons/md"

export function ToolsHomeButton() {
    return <ActionIcon onClick={() => window.location.href = "/tools"}>
        <MdHome />
    </ActionIcon>
}