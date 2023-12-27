// API Used:
// - https://emoji-api.com/ -> To get the emojis. 

import { useState } from "react";
import { useEffect } from "react";

function App() {
  // An array of objects filled with emoji information. 
  const [emojis, setEmojis] = useState(null); 

  useEffect(() => {
    // Get the array of all the emojis from emoji-api. 
    fetch('https://emoji-api.com/emojis?access_key=87e81ad081a97e2d8380e35de532d2e7a51ba800')
      // Convert response to an object. 
      .then(response => response.json())
      // Manually create an array of 12 random emojis. 
      .then(data => {
        let tempArray = []; 
        for (let i = 0; i < 12; i++) {
          const numberOfEmojis = data.length; 
          // Generate a random index position between 0 and 1859 (inclusive). 
          const randomIndex = Math.floor(Math.random() * (numberOfEmojis)); 
          // Push the emoji located at the random index position to tempArray. 
          tempArray.push(data[randomIndex])
          // // Remove the emoji from data to avoid duplicate emoji selection. 
          data.pop(randomIndex); 
        }
        // Save the random array of emojis to state variable, emojis. 
        setEmojis(tempArray); 
      })
  }, [])

  return (
    <div>
      {emojis && 
        emojis.map(emoji => {
          return <p style={{fontSize: 60}} key={emoji.codePoint}> {emoji.character} </p>
        }
      )}
    </div>
  )
}

export default App;
