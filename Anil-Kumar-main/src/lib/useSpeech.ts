import { useEffect, useState } from 'react';

import { PlayingState } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

import {createSpeechEngine} from "./speech"
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  useEffect(()=> {
    play()
  },[currentSentenceIdx] )
  
  const onBoundary = () => {
  setCurrentWordIndex((prev)=> prev+1)
}

const onEnd = () => {
  if (currentSentenceIdx<sentences.length) {
    setCurrentSentenceIdx(currentSentenceIdx + 1)
    } else {
    speachEngine.cancel()
  }
  setCurrentWordIndex(0)
}

const reset = () => {
  setCurrentSentenceIdx(0)
setCurrentWordIndex(0)
}

const onStateUpdate = (status: PlayingState) => {
   setPlaybackState(status)

  if (status === "playing") {
    setCurrentWordIndex(0)
   }

  if (status === "paused") {
    speachEngine.pause()
  }

}
  const speachEngine = createSpeechEngine({onBoundary,onEnd,onStateUpdate})
const play = () => {
  speachEngine.load(sentences[currentSentenceIdx])
  speachEngine.play()
};
const pause = () => {
  speachEngine.pause()
};

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    currentWordIndex,
    reset
  };
};

export { useSpeech };
