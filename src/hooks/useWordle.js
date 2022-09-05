import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState(["hello"]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((L) => {
      return { key: L, color: "grey" };
    });

    formattedGuess.forEach((L, i) => {
      if (solutionArray[i] === L.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });
    formattedGuess.forEach((L, i) => {
      if (solutionArray.includes(L.key) && L.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(L.key)] = null;
      }
    });
    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys};
      formattedGuess.forEach((L) => {
        const currentColour = newKeys[L.key];

        if (L.color === "green") {
          newKeys[L.key] = "green";
          return;
        }
        if (L.color === "yellow" && currentColour !== "green") {
          newKeys[L.key] = "yellow";
          return;
        }
        if (
          L.color === "grey" &&
          currentColour !== "green" &&
          currentColour !== "yellow"
        ) {
          newKeys[L.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };
  // handle keyup event & track current guess
  // if user presses enter, add the new guess

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("nooo stop, u cunt");
        return;
      }

      if (history.includes(currentGuess)) {
        console.log("not this word again bitch");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("word is extra short as your PP");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };
  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};
export default useWordle;
