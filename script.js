const bgMusic = document.getElementById("bg-music");
const heroImg = document.getElementById("hero-img");
const villainImg = document.getElementById("villain-img");
const progressBar = document.getElementById("progress-bar");
const finalMessage = document.getElementById("final-message");
const restartButton = document.getElementById("restart-button");
const gameArea = document.getElementById("game-area");

let allQuestions = [
    { question: "Captain Math needs 42 energy bolts. He has 18. How many more does he need?", answer: 24 },
    { question: "Mega Muscles lifts 56 pounds with one hand and 39 with the other. How much in total?", answer: 95 },
    { question: "Lightning Flash ran 73 miles. Thunder Dash ran 24. How far did they run together?", answer: 97 },
    { question: "Dr. Sneaky stole 95 gold coins. Heroes recovered 58. How many are still missing?", answer: 37 },
    { question: "Fireball used 65 heat blasts, then 28 more. How many in total?", answer: 93 },
    { question: "Super Gadget Factory made 84 tools. They sold 47. How many are left?", answer: 37 },
    { question: "Electro-Wizard charged 250 energy cells, but 89 were used. How many are left?", answer: 161 },
    { question: "Hurricane Hero saved 124 people in the first mission and 86 in the second. How many total?", answer: 210 },
    { question: "GigaBot has 300 steel plates. He uses 175 to build armor. How many does he have left?", answer: 125 },
    { question: "Laser Lady zapped 220 villains, but 50 escaped. How many did she capture?", answer: 170 }
];

let questionPool = [];
let correctAnswers = 0;

function shuffleQuestions() {
    questionPool = [...allQuestions]; // Copy the full question list
    questionPool.sort(() => Math.random() - 0.5); // Shuffle them
}

function loadQuestion() {
    if (questionPool.length === 0) {
        shuffleQuestions(); // Reshuffle when we run out of questions
    }
    let newQuestion = questionPool.pop(); // Get a new random question
    document.getElementById("question").innerHTML = `<span class="comic-bubble">💥 ${newQuestion.question}</span>`;
    document.getElementById("question").dataset.answer = newQuestion.answer;

    heroImg.classList.add("hidden");
    villainImg.classList.add("hidden");
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);
    const correctAnswer = parseInt(document.getElementById("question").dataset.answer);

    heroImg.classList.add("hidden");
    villainImg.classList.add("hidden");

    if (userAnswer === correctAnswer) {
        heroImg.classList.remove("hidden");
        heroImg.classList.add("hero-animate");

        correctAnswers++;
        progressBar.value = correctAnswers;

        if (correctAnswers >= 5) {
            gameWin();
        } else {
            setTimeout(() => {
                heroImg.classList.add("hidden");
                loadQuestion();
            }, 1000);
        }
    } else {
        villainImg.classList.remove("hidden");
        villainImg.classList.add("villain-animate");

        setTimeout(() => {
            villainImg.classList.add("hidden");
        }, 1000);
    }
}

// 🎉 Cool Victory Message When Power Bar Fills Up
function gameWin() {
    finalMessage.innerHTML = "🎉 Congratulations! You saved the city! 🏙️ The villain has been defeated! 🔥";
    finalMessage.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    gameArea.style.display = "none"; // Hide game area
}

// 🔄 Restart the Game
function restartGame() {
    correctAnswers = 0;
    progressBar.value = 0;
    finalMessage.classList.add("hidden");
    restartButton.classList.add("hidden");
    gameArea.style.display = "block"; // Show game area
    shuffleQuestions(); // Reset questions
    loadQuestion();
}

// Start the game with shuffled questions
restartGame();

