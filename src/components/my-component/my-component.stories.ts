import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

interface MyComponentArgs {
  first?: string;
  middle?: string;
  last?: string;
}

const meta: Meta<MyComponentArgs> = {
  title: 'Components/my-component',
  component: 'my-component',
  tags: ['autodocs'],
  argTypes: {
    first: {
      control: 'text',
      description: 'The first name',
    },
    middle: {
      control: 'text',
      description: 'The middle name',
    },
    last: {
      control: 'text',
      description: 'The last name',
    },
  },
  args: {
    first: 'Stencil',
    middle: "'Don't call me a framework'",
    last: 'JS',
  },
  render: (args) => html`
    <my-component
      first=${ifDefined(args.first)}
      middle=${ifDefined(args.middle)}
      last=${ifDefined(args.last)}
    ></my-component>
  `,
};

export default meta;
type Story = StoryObj<MyComponentArgs>;

export const Default: Story = {};

export const CustomName: Story = {
  args: {
    first: 'Design',
    middle: 'System',
    last: 'Storybook',
  },
};
