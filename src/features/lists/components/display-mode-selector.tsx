import { FaChevronDown } from 'react-icons/fa';

import { Group, Menu, Text, UnstyledButton } from '@mantine/core';

import { ViewMode } from '@/types';

import { displayOptions } from '../constants';

export const DisplayModeSelector: React.FC<{
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}> = ({ value, onChange }) => {
  const selectedOption = displayOptions.find((opt) => opt.value === value);

  return (
    <Group gap="xs">
      <Menu>
        <Menu.Target>
          <UnstyledButton>
            <Group gap="xs">
              {selectedOption && <selectedOption.icon size={16} />}
              <Text>{selectedOption?.label}</Text>
              <FaChevronDown size={16} />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          {displayOptions.map((option) => (
            <Menu.Item
              key={option.value}
              leftSection={<option.icon size={16} />}
              onClick={() => onChange(option.value as ViewMode)}
            >
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
