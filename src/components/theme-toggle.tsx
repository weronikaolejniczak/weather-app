import { HTMLAttributes, MouseEventHandler } from 'react';

import { Theme } from '@/constants/theme';

import MoonToggleIcon from '@/assets/icons/moon-toggle.svg?react';
import SunToggleIcon from '@/assets/icons/sun-toggle.svg?react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  value: Theme;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ICON_SIZE = '32';

export const ThemeToggle = ({ value, onClick }: Props) => {
  return (
    <button aria-label="Toggle theme" onClick={onClick}>
      {value === Theme.Dark ? (
        <SunToggleIcon
          className="hover:animate-ping"
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      ) : (
        <MoonToggleIcon
          className="hover:animate-ping"
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      )}
    </button>
  );
};
