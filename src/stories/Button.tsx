import { FC } from 'react';
import './button.css';

type ButtonProps = {
  primary?: boolean,
  backgroundColor?: string,
  size: string,
  label: string,
  onClick: () => void
}

export const Button: FC<ButtonProps> = ({ primary = false, backgroundColor, size, label, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
