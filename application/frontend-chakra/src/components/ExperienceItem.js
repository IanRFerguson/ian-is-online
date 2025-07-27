import { useState } from "react";
import { Text, Stack, Box, Collapse } from "@chakra-ui/react";


const ExperienceItem = ({ item }) => {
    // State to manage which summary sections are expanded
    // Array of booleans, one per summary section
    const [expanded, setExpanded] = useState(Array(item.summary.length).fill(false));

    const toggleSummary = (idx) => {
        setExpanded((prev) => {
            const newArr = [...prev];
            newArr[idx] = !newArr[idx];
            return newArr;
        });
    };

    return (
        <div>
            <Text fontWeight={600}>{item.title}  |  {item.duration}</Text>
            <Stack spacing={4}>
                {item.summary.map((summaryItem, idx) => (
                    <Stack key={idx}>
                        <Text fontWeight={600}>{summaryItem.sectionHeader}</Text>
                        <Box>
                            <button
                                style={{ marginBottom: '0.5rem' }}
                                onClick={() => toggleSummary(idx)}
                            >
                                {expanded[idx] ? 'Hide Details' : 'Show Details'}
                            </button>
                            <Collapse in={expanded[idx]} animateOpacity>
                                <Box as="ul" pl={4} style={{ listStyleType: 'disc' }}>
                                    {summaryItem.sectionValue.map((val, vIdx) => (
                                        <Box as="li" key={vIdx}>
                                            {val}
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Box>
                    </Stack>
                ))}
            </Stack>
        </div>
    );
}

export default ExperienceItem