import React, { createContext, useContext, useState } from 'react';

interface ExampleWordsContextValue {
  showExampleWords: boolean;
  setShowExampleWords: (show: boolean) => void;
}

const ExampleWordsContext = createContext<ExampleWordsContextValue | undefined>(undefined);

export const ExampleWordsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showExampleWords, setShowExampleWords] = useState(false);

  return (
    <ExampleWordsContext.Provider value={{ showExampleWords, setShowExampleWords }}>
      {children}
    </ExampleWordsContext.Provider>
  );
};

export const useExampleWords = (): ExampleWordsContextValue => {
  const context = useContext(ExampleWordsContext);

  if (!context) {
    throw new Error('useExampleWords must be used within an ExampleWordsProvider');
  }

  return context;
};