const question_title = document.getElementById("question");
const answer_list = document.querySelector(".choice-list");
const next_button = document.querySelector("#next-button");
const score = document.querySelector("#score");
let question_list = [
  {
    question: "What is the baby of a Moth  known as?",
    option: ["Baby", "Infant", "Kid", "Larva"],
    correct_answer: 3,
  },
  {
    question: "What is the adult of a kid called?",
    option: ["Calf", "Doe", "Goat", "Chick"],
    correct_answer: 2,
  },
  {
    question: "What is the young of buffalo called?",
    option: ["Calf", "Baby", "Pup", "Cow"],
    correct_answer: 0,
  },
  {
    question: "What is the baby alligator called?",
    option: ["Baby", "Gator", "Hatchling", "Calf"],
    correct_answer: 1,
  },
  {
    question: "What is a Goose called?",
    option: ["Gooser", "Gosling", "Gup", "Pup"],
    correct_answer: 1,
  },
];
let current_question = 0;
let correct_answer = 0;
let quiz_over = false;

document.addEventListener("DOMContentLoaded", display_answer());
next_button.addEventListener("click", (event) => {
  event.preventDefault();
  if (!quiz_over) {
    let radio_btn_checked = document.querySelector("input[type=radio]:checked");
    if (radio_btn_checked === null) {
      score.innerHTML = "Please select an answer";
      setTimeout(() => {
        score.innerHTML = "";
      }, 3000);
    } else {
      //if user choose a choice
      score.innerHTML = "";
      if (
        parseInt(radio_btn_checked.value) ===
        question_list[current_question].correct_answer
      ) {
        correct_answer++;
      }
      current_question++;
      if (current_question < question_list.length) {
        display_answer();
      } else {
        display_score();
        next_button.innerText = "Play Again?";
        quiz_over = true;
      }
    }
    console.log(radio_btn_checked);
  } else {
    reset_quiz();
    display_answer();
  }
  console.log(correct_answer, current_question, question_list.length);
});

function display_score() {
  score.innerHTML = `Your scored: ${correct_answer} out of ${question_list.length}`;
}

function reset_quiz() {
  correct_answer = 0;
  current_question = 0;
  score.innerHTML = "";
  quiz_over = false;
}

function display_answer() {
  answer_list.innerHTML = "";
  let answer_num = question_list[current_question].option.length;
  let question = question_list[current_question].question;
  let choice;

  for (let i = 0; i < answer_num; i++) {
    choice = question_list[current_question].option[i];

    let div = document.createElement("div");
    div.classList.add("custom-control", "custom-radio", "my-3");
    div.innerHTML = `<input type="radio" id="choice-${i}" name="answer" value="${i}" class="custom-control-input">
        <label for="choice-${i}" class="custom-control-label">${choice}</label>`;
    answer_list.appendChild(div);
    console.log(question, choice);
  }
  question_title.innerHTML = question;
}
