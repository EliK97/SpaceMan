// Spaceman game
const wordList = ['javascript', 'programming', 'computer', 'developer', 'algorithm']; // List of words to guess

let chosenWord = '';
let hiddenWord = [];
let guesses = [];
let remainingGuesses = 6;

// Function to choose a random word from the word list
function chooseWord() {
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Function to initialize the hidden word with underscores
function initializeHiddenWord() {
  hiddenWord = [];
  for (let i = 0; i < chosenWord.length; i++) {
    hiddenWord.push('_');
  }
}

// Function to display the current state of the game
function displayGame() {
  console.log('Hidden Word: ' + hiddenWord.join(' '));
  console.log('Guesses: ' + guesses.join(', '));
  console.log('Remaining Guesses: ' + remainingGuesses);
}

// Function to process a guessed letter
function processGuess(letter) {
  if (guesses.includes(letter)) {
    console.log('You already guessed that letter. Try again!');
    return;
  }

  guesses.push(letter);

  if (chosenWord.includes(letter)) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        hiddenWord[i] = letter;
      }
    }
    if (!hiddenWord.includes('_')) {
      console.log('Congratulations! You won!');
      console.log('The word was: ' + chosenWord);
      return;
    }
  } else {
    remainingGuesses--;
    console.log('Wrong guess! You have ' + remainingGuesses + ' guesses remaining.');
    if (remainingGuesses === 0) {
      console.log('Game over! You lost.');
      console.log('The word was: ' + chosenWord);
      return;
    }
  }

  displayGame();
}

// Function to start a new game
function newGame() {
  chooseWord();
  initializeHiddenWord();
  guesses = [];
  remainingGuesses = 6;

  console.log('Spaceman - Guess the Word!');
  displayGame();
}

// Event listener for user input
process.stdin.on('data', (input) => {
  const letter = input.toString().trim().toLowerCase();
  processGuess(letter);
});

// Start a new game
newGame();
