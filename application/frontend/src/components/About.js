import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
} from "@chakra-ui/react";
import { Fade } from "react-reveal";
import ProfileArray from "./ProfileArray";

export default function About({ color }) {
  const profile = ProfileArray();
  return (
    <>
      <Container maxW={"3xl"} id="about">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Fade bottom>
            <Stack align="center" direction="row" px={4}>
              <HStack mx={4}>
                <Text color={`${color}.400`} fontWeight={800}>
                  01
                </Text>
                <Text fontWeight={800}>About</Text>
              </HStack>
              <Divider orientation="horizontal" />
            </Stack>
          </Fade>
          <Fade bottom>
            <Stack spacing={4} px={4}>
              {(Array.isArray(profile.about) ? profile.about : [profile.about]).map(
                (paragraph, idx) => (
                  <Text key={idx} color={"white.600"} fontSize={"xl"}>
                    {paragraph}
                  </Text>
                )
              )}
            </Stack>
          </Fade>
        </Stack>
      </Container>
    </>
  );
}

