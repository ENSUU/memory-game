// API Used:
// - https://emoji-api.com/ -> To get the emojis. 

import { useState } from "react";
import { useEffect } from "react";

// Importing components
import Card from './components/Card';
import Navbar from './components/Navbar';

// Stylesheet
import './styles/App.css';

// Test Data
// import testData from './testdata.js';

function App() {
  // State
  const [emojis, setEmojis] = useState(null); 
  const [userScores, setUserScores] = useState({
    currentScore: 0, 
    bestScore: 0
  }); 
  const [userSelections, setUserSelections] = useState({}); 
  const [gameOver, setGameOver] = useState(false); 
  const [numOfRounds, setNumOfRounds] = useState(1); 

  useEffect(() => {
    // Get the array of all the emojis from emoji-api. 
    fetch(`https://emoji-api.com/emojis?access_key=${import.meta.env.VITE_API_PASS}`)
      // Convert response to an object. 
      .then(response => response.json())
      // Manually create an array of 12 random emojis. 
      .then(data => {
        // Create a copy of data to freely change/manipulate. 
        let fetchedData = [...data];
        
        // Create an empty array. This will be used to store the 12 random emojis. 
        let tempArray = []; 

        // Add 12 random emojis to tempArray. 
        for (let i = 0; i < 12; i++) {
          const numberOfEmojis = fetchedData.length; 
          // Generate a random index position between 0 and 1859 (inclusive). 
          const randomIndex = Math.floor(Math.random() * (numberOfEmojis)); 
          // Push the emoji located at the random index position to tempArray. 
          tempArray.push(fetchedData[randomIndex])
          // Remove the emoji from data to avoid duplicate emoji selection. 
          fetchedData.splice(randomIndex, randomIndex);
        }

        // Save the random array of emojis to state variable, emojis. 
        setEmojis(tempArray); 

        // Create the userSelections object. The key values represent: (the emoji's unicode : whether or not the user has clicked this emoji yet). 
        let userClicked = {}; 
        for (const emoji of tempArray) {
          userClicked[emoji.unicodeName] = false; 
        }
        setUserSelections(userClicked);

        // Using static emojis (for development).
        // setEmojis(testData);
    })
  }, [numOfRounds]);

  // Function to shuffle the emojis array (utilizes the Fisher-Yates Shuffle). Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  const shuffle = (arr) => {
    let currIndex = arr.length; 
    let randomIndex;  
    // While there are elements left to shuffle in array. 
    while (currIndex > 0) {
      // Pick a random element in the array. 
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex--; 
      // Swap positions of current element and random element. 
      [arr[currIndex], arr[randomIndex]] = [arr[randomIndex], arr[currIndex]]; 
    }
    // Return the shuffled array. 
    return arr; 
  } 

  function handleClick(e) {
    handleScore(e.target.dataset.unicode);  
    // Create a copy of the current emojis list. 
    let emojiCopy = [...emojis]; 
    // Shuffle around the elements in emojiCopy using shuffle function. 
    shuffle(emojiCopy); 
    // Set emojis state to emojiCopy. 
    setEmojis(emojiCopy);
  }

  function resetSelections(userSelections) {
    let updatedUserSelections = {...userSelections}; 
    for (const k of Object.keys(updatedUserSelections)) {
      updatedUserSelections[k] = false; 
    }
    return updatedUserSelections; 
  }

  function handleScore(clickedEmoUni) {
    let updatedUserSelections = {...userSelections}; 
    // If the emoji's value is False, means it hasn't been selected by the user yet, so increment score by 1. Also update userSelections. 
    if (userSelections[clickedEmoUni] === false) {
      setUserScores({...userScores, currentScore: userScores.currentScore + 1, bestScore: userScores.currentScore + 1});  
      updatedUserSelections[clickedEmoUni] = true;  
    }
    // Otherwise, we reset the user's score and set all the values in userSelection to False again. 
    else {
      setUserScores({...userScores, currentScore: 0});
      updatedUserSelections = resetSelections(updatedUserSelections);
    }
    setUserSelections(updatedUserSelections);
  }

  function checkWinner() {
    if(userScores.currentScore === 12) {
      setGameOver(true); 
      // Replace userScores.currentScore with '12' to avoid infinite rendering. 
      setUserScores({...userScores, currentScore: '12'});
    }
  }

  function restartGame(e) {
    e.preventDefault(); 
    setEmojis(null); 
    setUserScores({currentScore: 0, bestScore: 0}); 
    setUserSelections({}); 
    setGameOver(false);
    setNumOfRounds(numOfRounds + 1); 
  }

  // console.log(userSelections);
  checkWinner(); 
  

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="gameInfoContainer">
        <h3>Get points by clicking on an emoji, but don't click an emoji more than once.</h3>
        <div className="userScores">
          <h3 className="userCurScore">Score: {userScores.currentScore}</h3>
          <h3 className="userBestScore">Best Score: {userScores.bestScore}</h3>
        </div>
      </div>
      {!gameOver ? (
        <div className="cardContainer">
          {emojis && 
            emojis.map(emoji => {
              return <Card key={emoji.unicodeName} onClick={handleClick} emoji={emoji} /> 
            }
          )}
        </div>
      ) : (
        <>
          <h1 style={{textAlign:"center"}}>Game Over! You Win!</h1>
          <button className="playAgainBtn" onClick={restartGame}>Play Again</button>
        </>
      )}
    </div>
    
  )
}

export default App;
