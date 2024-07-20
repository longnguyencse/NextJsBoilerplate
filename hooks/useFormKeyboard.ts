import { KeyboardEvent } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

const useFormKeyboard = () => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLFormElement>,
    isSubmitting: boolean,
    handleSubmit: UseFormHandleSubmit<any, any>,
    onSubmit: (values: any) => void
  ) => {
    if (!isSubmitting && (event.key === 'Enter' || event.key === 'Return')) {
      handleSubmit(onSubmit)();
    }
  };

  return {
    handleKeyDown
  };
};

export default useFormKeyboard;
