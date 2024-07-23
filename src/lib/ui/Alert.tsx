'use client'
import { Modal } from "@mantine/core";
import { useAlert } from "../state/alert";

export function Alert() {
    const [alert, setAlert, reset, isEmpty] = useAlert()

    return <Modal opened={!isEmpty} onClose={reset} styles={{
        header: {
            backgroundColor: alert.type === "success" ? "green" : alert.type === "warning" ? "yellow" : alert.type === "error" ? "red" : "",
            color: "white"
        }
    }}>
        {alert.message}
    </Modal>
}