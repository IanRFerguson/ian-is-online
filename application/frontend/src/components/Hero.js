import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
} from "@chakra-ui/react";

export default function Header({ color }) {
  const profile = {
    headerName: "Howdy! I'm Ian",
    headerRole: "I'm an engineer based in Brooklyn, New York",
    linkedin: "https://www.linkedin.com/in/ianrferguson/",
  };

  return (
    <>
      <Heading>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Heading>

      <Container maxW={"3xl"} id="hero">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
          pt={{ base: 36, md: 52 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"120%"}
          >
            {profile.headerName} <br />
            <Text
              as={"span"}
              color={`${color}.400`}
              fontSize={{ base: "lg", sm: "4xl", md: "6xl" }}
            >
              {profile.headerRole}
            </Text>
          </Heading>
        </Stack>
      </Container>
    </>
  );
}
