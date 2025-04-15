const questions = [
  { country: "France", capital: "Paris" },
  { country: "Japan", capital: "Tokyo" },
  { country: "Brazil", capital: "Brasília" },
  { country: "Canada", capital: "Ottawa" },
  { country: "Egypt", capital: "Cairo" },
  { country: "Australia", capital: "Canberra" },
  { country: "India", capital: "New Delhi" },
  { country: "Germany", capital: "Berlin" },
  { country: "Russia", capital: "Moscow" },
  { country: "Kenya", capital: "Nairobi" },
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const startScreen = document.getElementById("start-screen");
const quiz = document.getElementById("quiz");
const endScreen = document.getElementById("end-screen");
const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const resultDiv = document.getElementById("result");
const timerDiv = document.getElementById("timer");
const scoreDiv = document.getElementById("score");
const themeToggle = document.getElementById("theme-toggle");

document.getElementById("start-btn").addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quiz.classList.remove("hidden");
  shuffle(questions);
  loadQuestion();
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
  timeLeft = 30;
  timerDiv.textContent = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult("Time's up!");
      setTimeout(loadNextQuestion, 2000);
    }
  }, 1000);
}

function showResult(msg) {
  resultDiv.textContent = msg;
}

function loadNextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    quiz.classList.add("hidden");
    endScreen.classList.remove("hidden");
    document.getElementById("final-score").textContent = `Your final score: ${score}/${questions.length}`;
    return;
  }
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  showResult("");
  startTimer();

  const question = questions[currentIndex];
  questionDiv.textContent = `What is the capital of ${question.country}?`;

  let choices = shuffle([
    question.capital,
    ...shuffle(questions)
      .filter((q) => q.capital !== question.capital)
      .slice(0, 3)
      .map((q) => q.capital),
  ]);

  optionsDiv.innerHTML = "";
  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      clearInterval(timer);
      if (choice === question.capital) {
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        showResult("Correct!");
      } else {
        showResult(`Wrong! Correct answer: ${question.capital}`);
      }
      setTimeout(loadNextQuestion, 2000);
    };
    optionsDiv.appendChild(btn);
  });
}

// Theme toggle logic
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
};
