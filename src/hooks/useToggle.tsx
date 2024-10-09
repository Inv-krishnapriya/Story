import { useCallback, useState } from 'react';

/**
 * A quick and simple utility for toggle states
 */
const useToggle = (initialState = false) => {
  const [value, setValue] = useState<boolean>(initialState);

  // Function to toggle the state value
  const toggleState: any = useCallback(() => {
    setValue((prevState) => !prevState); // Toggle the value based on the previous state
  }, []);

  // Function to set the state value to a specific value
  const setState = useCallback((value: boolean) => {
    setValue(value); // Set the value to the provided value
  }, []);

  return [value, toggleState, setState];
};

export default useToggle;
