import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { PHONETIC_EXAMPLES } from '../data/phonetic-examples';
import { PHONETIC_CONTRASTS } from '../data/phonetic-contrasts';
import { Volume2 } from 'lucide-react';
import { useExampleWords } from '../contexts/ExampleWordsContext';

interface PhoneticTooltipProps {
    symbol: string;
    children: React.ReactNode;
}

export const PhoneticTooltip: React.FC<PhoneticTooltipProps> = ({ symbol, children }) => {
    const { showExampleWords } = useExampleWords();
    // Try to match the symbol directly or with slashes (as defined in the data file)
    const examples = PHONETIC_EXAMPLES[symbol] || PHONETIC_EXAMPLES[`/${symbol}/`];
    const contrasts = PHONETIC_CONTRASTS[symbol] || PHONETIC_CONTRASTS[`/${symbol}/`];

    if (!examples || !showExampleWords) {
        return <>{children}</>;
    }

    const playWord = (word: string) => {
        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US'; // Default to US English
        utterance.rate = 0.8; // Slightly slower for clarity
        window.speechSynthesis.speak(utterance);
    };

    return (
        <HoverCard.Root openDelay={200} closeDelay={300}>
            <HoverCard.Trigger asChild>
                {children}
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    className="z-50 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 rounded-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    sideOffset={8}
                >
                    <div className="flex flex-col gap-1 min-w-[180px]">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b-2 border-gray-100 pb-1 mb-1">
                            Example Words
                        </div>
                        {examples.map((ex, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playWord(ex.word);
                                }}
                                className="flex items-center justify-between p-2 hover:bg-[#FFFDF5] hover:text-[#FF69B4] rounded border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-left group active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                                <div className="flex flex-col leading-none gap-1">
                                    <span className="font-bold text-sm">{ex.word}</span>
                                    <span className="text-xs text-gray-400 font-mono group-hover:text-[#FF69B4]">
                                        {(() => {
                                            const parts = ex.ipa.split(symbol);
                                            if (parts.length === 1) return ex.ipa;
                                            return parts.map((part, i) => (
                                                <React.Fragment key={i}>
                                                    {part}
                                                    {i < parts.length - 1 && (
                                                        <span className="font-black text-black bg-[#FFDE00] px-[1px] rounded-[2px] mx-[0.5px] inline-block leading-none">{symbol}</span>
                                                    )}
                                                </React.Fragment>
                                            ));
                                        })()}
                                    </span>
                                </div>
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-[#FF69B4] group-hover:text-white transition-colors">
                                    <Volume2 size={12} />
                                </div>
                            </button>
                        ))}

                        {contrasts && contrasts.length > 0 && (
                            <>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b-2 border-gray-100 pb-1 mb-1 mt-2">
                                    Compare
                                </div>
                                {contrasts.map((contrast, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-2 p-1.5 bg-gray-50 rounded border border-gray-100">
                                        <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                                            <span className="bg-[#FFDE00] text-black px-1 rounded">{symbol}</span>
                                            <span>vs</span>
                                            <span className="bg-white border border-gray-200 px-1 rounded">{contrast.otherSymbol}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    playWord(contrast.word1);
                                                }}
                                                className="text-xs font-bold hover:text-[#FF69B4] hover:underline decoration-2 underline-offset-2"
                                            >
                                                {contrast.word1}
                                            </button>
                                            <span className="text-gray-300">/</span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    playWord(contrast.word2);
                                                }}
                                                className="text-xs font-bold hover:text-[#FF69B4] hover:underline decoration-2 underline-offset-2"
                                            >
                                                {contrast.word2}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <HoverCard.Arrow className="fill-black" width={12} height={6} />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};
