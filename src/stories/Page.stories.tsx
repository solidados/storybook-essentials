import { within, userEvent, expect } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';

export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const LoggedOut = {};

export const LoggedIn: StoryObj = {
  play: async ({ canvasElement }): Promise<void> => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(loginButton).not.toBeInTheDocument();

    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};
