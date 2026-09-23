
import React from 'react';
import { CategoryStructure } from '../types';
import { PhoneticSymbol } from './PhoneticSymbol';
import { findSymbolData } from '../utils/phonetic-utils';

interface CategoryDisplayProps {
  category: CategoryStructure;
  categoryKey: string;
}

export const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ category, categoryKey }) => {
  return (
    <div className="flex items-center mb-2 p-1.5">
      <span className="w-12 text-sm font-black text-black shrink-0 uppercase tracking-tight pl-1">
        {category.name}
      </span>
      <div className="flex items-center text-lg text-black font-bold">
        <span className="text-black font-black select-none mx-1.5 text-sm">/</span>
        <div className="flex flex-wrap items-center gap-1 mx-0.5">
          {category.symbols.map((symbolChar, symbolIndex) => {
            const symbolData = findSymbolData(symbolChar);
            const symbolKey = `${categoryKey}-${symbolChar}-${symbolIndex}`;

            return (
              <PhoneticSymbol
                key={symbolKey}
                symbol={symbolData.symbol}
                audioFile={symbolData.audioFile}
              />
            );
          })}
        </div>
        <span className="text-black font-black select-none mx-1.5 text-sm">/</span>
      </div>
    </div>
  );
};
