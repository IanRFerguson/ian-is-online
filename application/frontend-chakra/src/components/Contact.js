import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import ProfileArray from "./ProfileArray";
import ContactForm from "./ContactForm";

export default function Contact({ color }) {
  const profile = ProfileArray();
  const linkedin = () => {
    window.open(`${profile.linkedin}`, "_blank", "noreferrer,noopener");
  };
  const github = () => {
    window.open(`${profile.github}`, "_blank", "noreferrer,noopener");
  };
  const email = () => {
    window.open(`mailto:${profile.email}`, "_blank", "noreferrer,noopener");
  };
  const instagram = () => {
    window.open(`${profile.instagram}`, "_blank", "nonrefferer,noopener")
  }
  return (
    <>
      <Container maxW={"3xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                04
              </Text>
              <Text fontWeight={800}>Contact</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={"3xl"}>Let's chat!</Heading>
            <Text color={"gray.600"} fontSize={"xl"} px={4}>
              If you'd like to discuss engineering your next project or New York Knicks basketball, feel free to drop me a note in the form below:
            </Text>

            {/* Preserving legacy code */}
            {/* <Text color={`${color}.500`} fontWeight={600} fontSize={"lg"} px={4}>
              {profile.email}
            </Text> */}

            <Center>
              <ContactForm />
            </Center>
            <Center>
              <HStack pt={4} spacing={4}>
                <FaLinkedin onClick={linkedin} size={28} />
                <FaGithub onClick={github} size={28} />
                <FaInstagram onClick={instagram} size={28} />
              </HStack>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

