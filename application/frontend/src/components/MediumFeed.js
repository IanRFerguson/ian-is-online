import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Link,
    SimpleGrid,
    useColorModeValue,
    HStack,
    Fade,
    Divider,
    Card,
    CardBody,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ArticleCard = ({ article, color }) => {
    return (
        <Card>
            <Stack>
                <CardBody align="left" h={[null, "40vh"]}>
                    <Heading size="sm">{article.title}</Heading>

                    <Text fontSize="sm" py={2} color="gray.500">
                        {article.date}
                    </Text>

                    <Link
                        href={article.link}
                        color={`${color}.400`}
                        isExternal
                    >
                        Read on Medium <ExternalLinkIcon mx="2px" />
                    </Link>
                </CardBody>
            </Stack>
        </Card>
    );
};

const MediumFeed = ({ color }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/medium');
                const data = await response.json();

                if (response.ok) {
                    setArticles(data.articles);
                } else {
                    setError(data.error || 'Failed to fetch articles');
                }
            } catch (err) {
                setError('Failed to fetch articles');
                console.error('Error fetching Medium articles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <Container maxW="3xl" id="medium" py={20}>
            <Stack align="center" direction="row" p={4}>
                <HStack mx={4}>
                    <Text color={`${color}.400`} fontWeight={800}>
                        04
                    </Text>
                    <Text fontWeight={800}>Writing</Text>
                </HStack>
                <Divider orientation="horizontal" />
            </Stack>
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
                {loading && (
                    <Text textAlign="center" color="gray.500">
                        Loading articles...
                    </Text>
                )}

                {error && (
                    <Text textAlign="center" color="red.500">
                        {error}
                    </Text>
                )}

                {!loading && !error && articles.length > 0 && (
                    <SimpleGrid columns={[1, 1, 1]} spacing={4}>
                        {articles.map((article, index) => (
                            <Fade key={index} in={true}>
                                <ArticleCard article={article} color={color} />
                            </Fade>
                        ))}
                    </SimpleGrid>
                )}

                {!loading && !error && articles.length === 0 && (
                    <Text textAlign="center" color="gray.500">
                        No articles found
                    </Text>
                )}
            </Stack>
        </Container>
    );
};

export default MediumFeed;
