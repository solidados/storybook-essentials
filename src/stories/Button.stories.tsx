import { fn } from '@storybook/test';
import { Button } from './Button';
import { Meta, StoryObj } from '@storybook/react/*';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    label: {
      control: 'text'
    },
    size: {
      control: {
        type: 'inline-radio',
      },
      options: ['small', 'large']
    },
    onClick: {
      table: {
        disable: true
      }
    }
  },
  args: {
    label: 'Button',
    onClick: fn()
  },
};

export default meta;

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button',
  },
};
