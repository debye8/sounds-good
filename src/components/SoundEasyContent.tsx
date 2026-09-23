import React, { useState } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { AudioStatusIndicator } from './AudioStatusIndicator';
import { CategoryDisplay } from './CategoryDisplay';
import { PracticeMode } from './PracticeMode';
import { StatsModal } from './StatsModal';
import { ReadAlongSettings } from './ReadAlongSettings';
import { imageStructure } from '../constants/phonetic-structure';
import { Play, Square, Target, BarChart2, Volume2 } from 'lucide-react';

export const SoundEasyContent: React.FC = () => {
  const {
    isLearningMode,
    startLearningMode,
    stopLearningMode,
    isLoadingAll,
    audioLoadStatus
  } = useAudioPlayer();

  const [showPracticeMode, setShowPracticeMode] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isLoop, setIsLoop] = useState(false);
  const [loopCount, setLoopCount] = useState(3);

  // Calculate loading progress
  const totalSymbols = Object.keys(audioLoadStatus).length;
  const loadedSymbols = Object.values(audioLoadStatus).filter(status => status === 'loaded').length;
  const loadingProgress = totalSymbols > 0 ? Math.floor((loadedSymbols / totalSymbols) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 bg-[#FFFDF5] font-sans max-w-5xl mx-auto min-h-screen border-x-4 border-black shadow-[8px_0px_0px_0px_rgba(0,0,0,0.2)]">
      <div className="flex justify-between items-center mb-4 gap-3 bg-[#FFDE00] border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center gap-2">
          <ReadAlongSettings
            playbackSpeed={playbackSpeed}
            isLoop={isLoop}
            loopCount={loopCount}
            onSpeedChange={setPlaybackSpeed}
            onLoopChange={setIsLoop}
            onLoopCountChange={setLoopCount}
            disabled={isLearningMode}
          >
            <button
              onClick={() => isLearningMode ? stopLearningMode() : startLearningMode()}
              className={`flex items-center gap-2 px-3 py-1.5 bg-[#4ECDC4] text-black border-2 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-sm
                        ${isLoadingAll ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoadingAll}
            >
              {isLearningMode ? <Square size={16} fill="black" /> : <Play size={16} fill="black" />}
              {isLearningMode ? "停止跟读" : "跟读模式"}
            </button>
          </ReadAlongSettings>

          <button
            onClick={() => setShowPracticeMode(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#FF69B4] text-black border-2 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-sm"
          >
            <Target size={16} />
            练习模式
          </button>

          <button
            onClick={() => setShowStatsModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white text-black border-2 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-sm"
          >
            <BarChart2 size={16} />
            学习统计
          </button>
        </div>

        {isLoadingAll && (
          <div className="flex items-center bg-white px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-24 bg-gray-200 border-2 border-black h-3 mr-2 relative overflow-hidden">
              <div
                className="bg-[#FF69B4] h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold text-black">{loadingProgress}%</span>
          </div>
        )}
      </div>

      <div className={"flex flex-row justify-between items-start gap-4"}>
        <div className="flex-1">
          {imageStructure.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h2 className={`${section.titleClass} text-xl font-black uppercase mb-2 text-black drop-shadow-[1px_1px_0px_rgba(255,255,255,1)] flex items-center gap-2`}>
                <div className="w-3 h-3 bg-black"></div>
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.categories.map((category, categoryIndex) => {
                  const categoryKey = `${section.title}-${category.name}-${categoryIndex}`;
                  return (
                    <CategoryDisplay
                      key={categoryKey}
                      category={category}
                      categoryKey={categoryKey}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Mode Modal */}
      {showPracticeMode && (
        <PracticeMode onClose={() => setShowPracticeMode(false)} />
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <StatsModal onClose={() => setShowStatsModal(false)} />
      )}

      {/* Audio Source Attribution */}
      <div className="mt-8 pt-4 border-t-4 border-black text-center">
        <div className="inline-block bg-white border-2 border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-bold text-black flex items-center gap-1">
            <Volume2 size={12} />
            音频资源: {' '}
            <a
              href="https://www.youtube.com/@yingyutu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF69B4] hover:text-[#4ECDC4] underline decoration-2 decoration-black ml-1"
            >
              @yingyutu
            </a>
          </p>
        </div>
      </div>

      <AudioStatusIndicator />
    </div>
  );
};
