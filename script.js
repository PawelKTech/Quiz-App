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
  console.log(json);
  json.forEach((question, questionIndex) => {
    const div = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = question.question;
    div.append(title);

    question.answers.forEach((answer, index) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      const text = document.createTextNode(answer);
      radio.type = "radio";
      radio.name = questionIndex;
      radio.value = index;

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
      console.log(radio);
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

  container.innerHTML = `<h1>
  Good job you did:
  ${result}</h1>

  <button onclick='resetQuestion()'>Again</button>
  <a href="index.html">
    <button>Wróc do strony głowen </button></a>`;
  console.log(result);
});

function resetQuestion() {
  window.location.reload();
}
