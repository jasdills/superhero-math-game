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
];

let questionPool = [];
let correctAnswers = 0;

function shuffleQuestions() {
    questionPool = [...allQuestions];
    questionPool.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    if (questionPool.length === 0) {
        shuffleQuestions();
    }
    let newQuestion = questionPool.pop();
    document.getElementById("question").innerHTML = `<span class="comic-bubble">💥 ${newQuestion.question}</span>`;
    document.getElementById("question").dataset.answer = newQuestion.answer;

    heroImg.classList.add("hidden");
    villainImg.classList.add("hidden");
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);
    const correctAnswer = parseInt(document.getElementById("question").dataset.answer);

    if (userAnswer === correctAnswer) {
        heroImg.classList.remove("hidden");
        correctAnswers++;
        progressBar.value = correctAnswers;
        if (correctAnswers >= 5) gameWin();
        else setTimeout(loadQuestion, 1000);
    } else {
        villainImg.classList.remove("hidden");
        setTimeout(() => villainImg.classList.add("hidden"), 1000);
    }
}

function gameWin() {
    finalMessage.innerHTML = "🎉 Congratulations! You saved the city!";
    finalMessage.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    gameArea.style.display = "none";
}

function restartGame() {
    correctAnswers = 0;
    progressBar.value = 0;
    finalMessage.classList.add("hidden");
    restartButton.classList.add("hidden");
    gameArea.style.display = "block";
    shuffleQuestions();
    loadQuestion();
}

restartGame();


