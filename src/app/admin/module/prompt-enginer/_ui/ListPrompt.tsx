import { Button, Card, Flex, Stack, Text } from "@mantine/core"
import { ButtonDeletePrompt } from "../_component/ButtonDeletePrompt"

export function ListPrompt({ list }: { list: any[] }) {
    return <Stack p={"md"} >
        {list.map((v, k) => <Card withBorder key={k}>
            <Stack gap={0}>
                <Flex justify={"end"}>
                    <ButtonDeletePrompt id={v.id} />
                </Flex>
                <Text fw={"bold"}>{v.title}</Text>
                <Text c={"gray"}>{v.desc}</Text>
                <Text>{v.prompt}</Text>
            </Stack>
        </Card>)}
    </Stack>
}