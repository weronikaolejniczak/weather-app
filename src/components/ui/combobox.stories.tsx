import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Combobox } from './combobox';
import { Label } from './label';

const OPTIONS = ['Firefox', 'Mozilla', 'Chrome'];

const meta: Meta<typeof Combobox> = {
  component: Combobox,
  title: 'UI/Combobox',
  parameters: {
    backgrounds: {
      default: 'gray',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Combobox>
        <Label htmlFor="search-input">Browsers</Label>
        <Combobox.Input
          id="search-input"
          type="text"
          name="search-input"
          className="w-full"
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
        />
        {OPTIONS.length > 0 && (
          <Combobox.List id="browsers" label="Examples of browsers">
            {OPTIONS.map((option) => {
              return (
                <Combobox.Option
                  key={option}
                  value={option}
                  onClick={() => setValue(option)}
                >
                  {option}
                </Combobox.Option>
              );
            })}
          </Combobox.List>
        )}
      </Combobox>
    );
  },
};
