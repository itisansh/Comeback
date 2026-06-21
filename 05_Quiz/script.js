document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choiceList = document.getElementById("choices-list");
  const nextBtn = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  const startBtn = document.getElementById("start-btn");

  let score = 0;
  let currentQuestionIndex = 0;

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  // YOU DONT CALL FN INSIDE EVENT LISTENER ONLY GIVE REFERENCE TO IT AS IT ONLY CALLS FN IF EVENT HAPPENS
  startBtn.addEventListener("click", showQuestions);

  function showQuestions() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden"); // dikkat hogi
    questionContainer.classList.remove("hidden");
    restartBtn.classList.remove("hidden");

    displayQues();
  }
  function displayQues() {
    choiceList.innerHTML = "";
    questionText.textContent = "";

    questionText.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      choiceList.appendChild(li);

      //IMP WE KNOW WE CANT CALL A FN INSDIE A EVENT LISTENER BUT WE WANT TO PASS SOME VALUE AS AN ARGUEMENT SO WE USE CALLBACK FUNCTION
      li.addEventListener("click", (e) => selectChoice(choice, e));

      function selectChoice(choice, e) {
        const closestLi = e.target.closest("li");
        console.log(e);
        console.log(closestLi);

        closestLi.classList.add("selected");
        console.log(closestLi.classList);

        setTimeout(() => {
          const correctChoice = questions[currentQuestionIndex].answer;
          if (choice === correctChoice) {
            score++;
          }
          currentQuestionIndex++;
          if (currentQuestionIndex < questions.length) {
            showQuestions();
          } else {
            showResult();
          }
        }, 200);
      }
    });
  }

  restartBtn.addEventListener("click", () => {
    restartBtn.classList.add("hidden");
    score = 0;
    currentQuestionIndex = 0;
    showQuestions();
  });

  function showResult() {
    resultContainer.classList.remove("hidden");
    questionContainer.classList.add("hidden");
    restartBtn.classList.remove("hidden");

    scoreDisplay.textContent = score;
  }
});
