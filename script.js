const bgMusic = document.getElementById("bg-music");
const heroImg = document.getElementById("hero-img");
const villainImg = document.getElementById("villain-img");
const progressBar = document.getElementById("progress-bar");

const allQuestions = [
    { question: "Captain Math needs 42 energy bolts. He has 18. How many more does he need?", answer: 24 },
    { question: "Mega Muscles lifts 56 pounds with one hand and 39 with the other. How much in total?", answer: 95 },
    { question: "Lightning Flash ran 73 miles. Thunder Dash ran 24. How far did they run together?", answer: 97 },
    { question: "Dr. Sneaky stole 95 gold coins. Heroes recovered 58. How many are still missing?", answer: 37 },
    { question: "Fireball used 65 heat blasts, then 28 more. How many in total?", answer: 93 },
    { question: "Super Gadget Factory made 84 tools. They sold 47. How many are left?", answer: 37 }
];

let correctAnswers = 0;

function getRandomQuestion() {
    return allQuestions[Math.floor(Math.random() * allQuestions.length)];
}

function loadQuestion() {
    let newQuestion = getRandomQuestion();
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
        setTimeout(() => {
            heroImg.classList.add("hidden");
            loadQuestion();
        }, 1000);
    } else {
        villainImg.classList.remove("hidden");
        villainImg.classList.add("villain-animate");
        setTimeout(() => {
            villainImg.classList.add("hidden");
        }, 1000);
    }
}

function restartGame() {
    correctAnswers = 0;
    progressBar.value = 0;
    bgMusic.play();
    loadQuestion();
}

restartGame();
