import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import { useColorModeValue } from './ui/color-mode';
import { customShades } from '@/theme/custom-color';

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ReactElement;
  styles?: BoxProps;
}

export default function Feature({ title, text, icon, styles }: FeatureProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue(customShades.blue[50], customShades.blue[900]);
  const hoverBorderColor = useColorModeValue(customShades.blue[100], customShades.blue[700]);
  const hoverShadowColor = useColorModeValue(`0 10px 15px -3px ${customShades.blue[100]}`, `0 10px 15px -3px ${customShades.blue[900]}`);
  
  return (
    <Box 
      p={8} 
      borderRadius="xl" 
      bg={bgColor} 
      borderWidth="1px" 
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-4px)',
        boxShadow: hoverShadowColor,
        borderColor: hoverBorderColor,
      }}
      {...styles}
    >      <Stack direction="column" align="center" textAlign="center" gap={5}>
        <Box color={styles?.color || useColorModeValue(customShades.blue[500], customShades.blue[400])}>
          {icon}
        </Box>
        <Heading 
          fontSize="xl" 
          fontWeight="700" 
          letterSpacing="tight"
          color={styles?.color || useColorModeValue(customShades.purple[700], customShades.purple[300])}
        >
          {title}
        </Heading>
        <Text 
          opacity={styles?.color ? 0.9 : 0.8} 
          lineHeight="tall"
          color={styles?.color || useColorModeValue(customShades.blue[800], customShades.blue[200])}
        >
          {text}
        </Text>
      </Stack>
    </Box>
  );
}
