const container = document.querySelector("#questionContent");
const button = document.querySelector("#checkAnswerButton");
let parentDiv = button.parentNode;

async function getQeustions() {
  const url = "./data/questions.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

async function displayQeustions() {
  let json = await getQeustions();
  json.forEach((question, questionIndex) => {
    const div = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = question.question;
    div.append(title);
    div.classList.add(
      "p-4",
      "mt-3",
      "bg-dark",
      "rounded",
      "mb-4",
      "text-center"
    );
    question.answers.forEach((answer, index) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      const text = document.createTextNode(answer);
      radio.type = "radio";
      radio.name = questionIndex;
      radio.value = index;
      radio.classList.add("me-2");
      label.classList.add("me-4", "fs-5", "fw-light", "mt-1");
      label.appendChild(radio);
      label.appendChild(text);

      div.appendChild(label);

      parentDiv.insertBefore(div, button);
    });
  });
}

displayQeustions();

button.addEventListener("click", async (event) => {
  let userAnswers = {};
  let inputs = document.querySelectorAll('input[type="radio"]');

  inputs.forEach((radio) => {
    if (radio.checked) {
      userAnswers[radio.name] = radio.value;
    } else {
      if (!userAnswers[radio.name]) {
        userAnswers[radio.name] = null;
      }
    }
  });

  let question = await getQeustions();
  let correctAnswer = [];
  let result = 0;
  question.forEach((q, index) => {
    correctAnswer.push(q.correct);
  });

  correctAnswer.forEach((answer, index) => {
    if (answer == userAnswers[index]) {
      result++;
    }
  });

  inputs.forEach((input) => {
    input.disabled = true;
  });

  container.innerHTML = `<h1 class='mb-3'>
  <i class="bi bi-braces me-2 text-warning "></i>Good job you did:
  ${result}/10!</h1>

  <button onclick='resetQuestion()' type='btn' class='btn btn-warning p-2 me-2'><i class="fa-solid fa-play me-2"></i>Try again</button>
  <a href="index.html">
    <button type='btn' class='btn btn-outline-warning p-2 text-white'>Return to menu </button></a>`;
  window.scrollTo(0, 0);
  container.classList.add("animated");
});

function resetQuestion() {
  window.location.reload();
}
