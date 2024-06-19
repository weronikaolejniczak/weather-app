import { ChangeEventHandler, useState } from 'react';

export const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  return [value, onChange, setValue] as const;
};
