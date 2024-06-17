import { ChangeEventHandler, useState } from 'react';

export const useInput = () => {
  const [value, setValue] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  return [value, onChange, setValue] as const;
};
