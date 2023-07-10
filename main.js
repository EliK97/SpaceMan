document.addEventListener('DOMContentLoaded', function() {
    const wordDisplay = document.getElementById('word-display');
    const letterButtons = document.querySelectorAll('.letter-button');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
                       
    let wordBank = ['tech', 'computer', 'software', 'mouse', 'keyboard', 'smart', 'laptop']; // array for words 
    let chosenWord = ''; //empty string 
    let guessedWord = []; // empty array 
    let guessesLeft = 6; // number of guesses
    let gameRunning = false; //the game is set to false

    // Function to pick a random word from the word bank
    function pickRandomWord() {
        const randomIndex = Math.floor(Math.random() * wordBank.length);  // this line looks for a random word index in the array
        chosenWord = wordBank[randomIndex].toUpperCase();    //this line sets random word from the array has the choosen word 
        guessedWord = Array(chosenWord.length).fill('_'); //this line takes the choosen word an displays it as _ characters
        wordDisplay.innerText = guessedWord.join(' ');
    }

    // Function to handle letter button click event
    function handleLetterButtonClick(e) {
        if (!gameRunning) return;

        const guessedLetter = e.target.innerText;
        e.target.disabled = true;    //this means any selected letter  when the game is not ready or running would disable 

        let letterFound = false;  //this means letter was not found either user did submit a letter 
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guessedLetter) {    //the [i] is look at all individual letter of the choosen word an match it to the gussedWord
                guessedWord[i] = guessedLetter;  // this represent blank of the chosen word length when the guess word set is the same as the user that means the letter is true
                letterFound = true;
            }
        }

        wordDisplay.innerText = guessedWord.join(' ');

        if (!letterFound) {  // when user selects a letter that not found in the choosen word  guesses is  decremeninted 
            guessesLeft--;
        }

        if (guessesLeft === 0 || guessedWord.indexOf('_') === -1) {  //this means if the game is over when no more guesses are available or no more _  to call the endGame fucntion
            endGame();
        }
    }

    // Function to handle start button click event
    function handleStartButtonClick() {
        if (gameRunning) return;  // when game is running do the following lines 

        gameRunning = true;
        startButton.disabled = true; // the game starts the start will be disbale  only reset will be actice along with letter buttons
        resetButton.disabled = false; 
        letterButtons.forEach(button => button.disabled = false); //this means that button to select a letter able to be used once the game is running 
        pickRandomWord();
    }

    // Function to handle reset button click event
    function handleResetButtonClick() {
        gameRunning = false;
        startButton.disabled = false;
        resetButton.disabled = true;
        letterButtons.forEach(button => {  // until the game is reset none of the letter button are working 
            button.disabled = true;
            button.removeAttribute('disabled');
        });
        guessesLeft = 6;
        wordDisplay.innerText = '';
    }

    // Function to end the game
    function endGame() {      //the end game function should disable the entire game until user hit the start button 
        gameRunning = false;
        startButton.disabled = false;
        resetButton.disabled = true;
        letterButtons.forEach(button => button.disabled = true);

        if (guessesLeft === 0) {
            wordDisplay.innerText = 'You lost! The word was: ' + chosenWord;    //if statement display coorect word when user gueess wrong word 
        } else {
            wordDisplay.innerText = 'Congratulations! You won!' + chosenWord +' '+'is the correct word Thanks for playing'; //this dsiplay only when user gueess  correct
        }
    }

    // Add event listeners
    letterButtons.forEach(button => button.addEventListener('click', handleLetterButtonClick));  //this listen for when each button is clicked
    startButton.addEventListener('click', handleStartButtonClick);  //listen for start button click
    resetButton.addEventListener('click', handleResetButtonClick); //listen for reset button click
});
