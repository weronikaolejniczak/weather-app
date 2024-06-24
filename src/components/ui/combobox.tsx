import {
  ComponentProps,
  Dispatch,
  FocusEventHandler,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useClickOutside } from '@/hooks/use-click-outside';

import { Input } from './input';
import { Label } from './label';
import { cn } from '@/utils/cn';

interface ComboboxContextState {
  isShown: boolean;
  setIsShown: Dispatch<SetStateAction<boolean>>;
  isSrOnlyLabel: boolean;
  setIsSrOnlyLabel: Dispatch<SetStateAction<boolean>>;
}

const ComboboxContext = createContext<ComboboxContextState>({
  isShown: false,
  setIsShown: () => {},
  isSrOnlyLabel: false,
  setIsSrOnlyLabel: () => {},
});

interface ComboboxProps {
  children: ReactNode;
}

const Combobox = ({ children }: ComboboxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isShown, setIsShown] = useState(false);
  const [isSrOnlyLabel, setIsSrOnlyLabel] = useState(false);

  useClickOutside(ref, () => {
    setIsShown(false);
  });

  return (
    <ComboboxContext.Provider
      value={{ isShown, setIsShown, isSrOnlyLabel, setIsSrOnlyLabel }}
    >
      <div ref={ref} className="relative group">
        {children}
      </div>
    </ComboboxContext.Provider>
  );
};

interface ComboboxLabelProps extends ComponentProps<typeof Label> {
  srOnly?: boolean;
}

const ComboboxLabel = ({ className, srOnly, ...props }: ComboboxLabelProps) => {
  const { setIsSrOnlyLabel } = useContext(ComboboxContext);

  useEffect(() => {
    setIsSrOnlyLabel(Boolean(srOnly));
  }, [setIsSrOnlyLabel, srOnly]);

  return (
    <Label className={cn(className, srOnly ? 'sr-only' : '')} {...props} />
  );
};

interface ComboboxInputProps extends ComponentProps<typeof Input> {}

const ComboboxInput = (props: ComboboxInputProps) => {
  const { setIsShown } = useContext(ComboboxContext);

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setIsShown(true);
    props.onFocus?.(event);
  };

  return <Input onFocus={handleFocus} {...props} />;
};

interface ComboboxListProps {
  children: ReactNode;
  id: string;
  label: string;
}

const ComboboxList = ({ id, label, children }: ComboboxListProps) => {
  const { isSrOnlyLabel, isShown } = useContext(ComboboxContext);

  if (!isShown) return;
  return (
    <ul
      className={cn(
        'absolute z-10 max-h-36 w-full p-2 flex flex-col gap-2 bg-white dark:bg-neutral-800 rounded-lg overflow-y-auto',
        isSrOnlyLabel ? 'top-14' : 'top-18',
      )}
      id={id}
      role="listbox"
      aria-label={label}
    >
      {children}
    </ul>
  );
};

interface ComboboxOptionProps {
  children: ReactNode;
  onClick: () => void;
  value: string;
}

const ComboboxOption = ({ children, onClick, value }: ComboboxOptionProps) => {
  const { setIsShown } = useContext(ComboboxContext);

  const handleClick = () => {
    setIsShown(false);
    onClick();
  };

  return (
    <li key={value} role="option">
      <button
        className="text-left w-full px-4 py-3 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
};

Combobox.Label = ComboboxLabel;
Combobox.Input = ComboboxInput;
Combobox.List = ComboboxList;
Combobox.Option = ComboboxOption;

export { Combobox, ComboboxLabel, ComboboxInput, ComboboxList, ComboboxOption };
