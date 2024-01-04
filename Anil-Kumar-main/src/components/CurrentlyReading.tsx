/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
  currnentWordIndex
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
  currnentWordIndex: number;
}) => {

  const renderwords = (sentence: string) => {
    return <span style={{display: "flex"}}> {sentence.split(" ").map((item, index)=> {
      if (index === currnentWordIndex) {
        return <p style={{color:"red"}}> {item} &nbsp; </p>
      } else {
        return <p > {item} &nbsp;</p>
      }
    })
    }
    </span>
  }

  return sentences.map((item, index)=> {
    if (index === currentSentenceIdx) {
      return <div data-testid="currently-reading">
        {renderwords(item)}
      </div>
    } else {
      return <div><p>{item}</p></div>
    }
  })
};
