import { useEffect, useCallback } from 'react';

export const useKeyboard = (onKeyPress: (key: string) => void, disabled: boolean = false) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (disabled) return;
    
    const { key } = event;
    
    if (key === 'Enter') {
      onKeyPress('ENTER');
    } else if (key === 'Backspace') {
      onKeyPress('BACKSPACE');
    } else if (/^[a-zA-Z]$/.test(key)) {
      onKeyPress(key.toUpperCase());
    }
  }, [onKeyPress, disabled]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};