'use client'

import { useShallowEffect } from "@mantine/hooks";

export function AppNotification() {

    useShallowEffect(() => {
        requestNotificationPermission()
    }, [])
    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            alert('Browser does not support notifications.');
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    };

    return null
}