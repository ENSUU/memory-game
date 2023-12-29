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
import testData from './testdata.js';

function App() {
  // An array of objects filled with emoji information. 
  const [emojis, setEmojis] = useState(null); 

  useEffect(() => {
    // Get the array of all the emojis from emoji-api. 
    // fetch('https://emoji-api.com/emojis?access_key=87e81ad081a97e2d8380e35de532d2e7a51ba800')
    //   // Convert response to an object. 
    //   .then(response => response.json())
    //   // Manually create an array of 12 random emojis. 
    //   .then(data => {
    //     let tempArray = []; 
    //     for (let i = 0; i < 12; i++) {
    //       const numberOfEmojis = data.length; 
    //       // Generate a random index position between 0 and 1859 (inclusive). 
    //       const randomIndex = Math.floor(Math.random() * (numberOfEmojis)); 
    //       // Push the emoji located at the random index position to tempArray. 
    //       tempArray.push(data[randomIndex])
    //       // // Remove the emoji from data to avoid duplicate emoji selection. 
    //       data.pop(randomIndex); 
    //     }
    //     // Save the random array of emojis to state variable, emojis. 
    //     setEmojis(tempArray); 

        // Using static emojis (for development).
        setEmojis(testData);
  }, [])

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

  function handleClick() {
    // Create a copy of the current emojis list. 
    let emojiCopy = [...emojis]; 
    // Shuffle around the elements in emojiCopy using shuffle function. 
    shuffle(emojiCopy); 
    // Set emojis state to emojiCopy. 
    setEmojis(emojiCopy);
  }

  return (
    <>
      <Navbar />
      <div className="gameInfoContainer">
        <h2>Get points by clicking on an emoji, but don't click an emoji more than once.</h2>
        <div className="userScores">
          <h2 className="userCurScore">Score: 0</h2>
          <h2 className="userBestScore">Best Score: 0</h2>
        </div>
      </div>
      <div className="cardContainer">
        {emojis && 
          emojis.map(emoji => {
            return <Card key={emoji.unicodeName} onClick={handleClick} emoji={emoji} /> 
          }
        )}
      </div>
    </>
    
  )
}

export default App;
