import React from "react";
import "./type.css";
export const Type = () => {
  const Sentence =
    "Sometimes to understand a word's meaning you need more than a definition; you need to see the word used in a sentence";
  const [typeText, setText] = React.useState(Array(Sentence.length).fill(null));
  const onKeyPress = (e) => {
    const typeInput = e.target.value;
    const inputArray = typeInput.split("");
    if (e.keyCode === 8) {
      Array.prototype.splice.apply(typeText, [0, inputArray.length].concat(inputArray));
      setText([...typeText]);
    } else {
      Array.prototype.splice.apply(typeText, [0, inputArray.length].concat(inputArray));
      setText([...typeText]);
    }
    console.log(inputArray, "vvvvv");
  };
  console.log(typeText, "lll");
  return (
    <div>
      {Sentence.split("").map((letter, ind) => (
        <span
          key={ind}
          className={`letter-span ${
            typeText[ind] === null ? "no-fill" : typeText[ind] === letter ? "match" : "unmatch"
          }`}
        >
          {letter}
        </span>
      ))}
      <input type="text" onKeyDown={(e) => onKeyPress(e)} />
    </div>
  );
};
