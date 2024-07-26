import prisma from "@/lib/db/prisma";
import { Box, Card, Flex, Stack, Text } from "@mantine/core";
import { CreatePrompt } from "./_ui/CreatePrompt";
import { ListPrompt } from "./_ui/ListPrompt";
import { LoadListPrompt } from "./_component/LoadListPrompt";

export default function Page() {
    return <Stack>
        <Flex>
            <Stack w={460}>
                <CreatePrompt />
            </Stack>
            <Stack flex={1}>
                <LoadListPrompt>
                    {(list) => <ListPrompt list={list} />}
                </LoadListPrompt>
            </Stack>
        </Flex>
    </Stack>
}





