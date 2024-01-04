import {useEffect, useState} from "react";

import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const [input, setInput] = useState<string>("");

  const speach = useSpeech(sentences);
  useEffect(()=> {
    getContent()
  },[])

  const getContent = async () => {
    const response = await fetchContent();
    setInput(response)
    parseContent(response)
  }

  const parseContent = (content: string) => {
    let parsedContent:string[] = []
    const speachString = content.split('<speak>').pop()?.split('</speak>')[0]
    const startString = speachString?.split('<s>')

    startString?.forEach(item =>item && parsedContent.push(item.split('</s>')[0]))
    setSentences(parsedContent)
  }

  const handlePlay = () => {
    speach.play()
  }

  const handlePause = () => {
    speach.pause()
  }

  const getNewContent = () => {
    getContent()
    speach.reset()
  }

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading currentSentenceIdx={speach.currentSentenceIdx} currnentWordIndex={speach.currentWordIndex} sentences={sentences}/>
      </div>
      <div>
        
        <Controls play={handlePlay} state={speach.playbackState} pause={handlePause} loadNewContent={getNewContent} />
      </div>
    </div>
  );
}

export default App;
