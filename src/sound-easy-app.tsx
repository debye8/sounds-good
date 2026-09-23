import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { PracticeModeProvider } from './contexts/PracticeModeContext';
import { ExampleWordsProvider } from './contexts/ExampleWordsContext';
import { SoundEasyContent } from './components/SoundEasyContent';

/**
 * Main application component that wraps the content with the AudioPlayerProvider and PracticeModeProvider
 */
export const SoundEasyApp = () => {
  return (
    <AudioPlayerProvider>
      <PracticeModeProvider>
        <ExampleWordsProvider>
          <SoundEasyContent />
        </ExampleWordsProvider>
      </PracticeModeProvider>
    </AudioPlayerProvider>
  );
}
