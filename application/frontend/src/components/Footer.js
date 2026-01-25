import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        align="center"
      >
        <Text fontFamily={"monospace"} fontSize={"110%"}>Made with ❤️ in San Francisco</Text>
        <Text fontFamily={"monospace"}> <a href="https://github.com/eldoraboo/portable-portfolio" target="_blank">View React Template</a></Text>
      </Container>
    </Box >
  );
}
