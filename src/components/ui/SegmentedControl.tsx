import { Box, ButtonGroup, Button } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { customColors, customShades } from '../../theme/custom-color';

type SegmentOption = {
  value: string;
  label: string;
};

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
}

const SegmentedControl = ({ options, value, onChange }: SegmentedControlProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const activeBgColor = useColorModeValue(
    customShades.blue[100],
    customShades.blue[900]
  );
  const activeTextColor = useColorModeValue(
    customColors.blue,
    customShades.blue[300]
  );
  const hoverBgColor = useColorModeValue(
    customShades.blue[50],
    customShades.blue[800]
  );

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p="1"
      width="fit-content"
    >
      <ButtonGroup size="md" variant="ghost" gap="0">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <Button
              key={option.value}
              onClick={() => onChange(option.value)}
              bg={isSelected ? activeBgColor : 'transparent'}
              color={isSelected ? activeTextColor : undefined}
              borderRadius="md"
              borderWidth="0"
              _hover={{
                bg: isSelected ? activeBgColor : hoverBgColor,
              }}
              px={4}
              fontSize="sm"
              fontWeight={isSelected ? "semibold" : "medium"}
              transition="all 0.2s"
            >
              {option.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};

export default SegmentedControl;
