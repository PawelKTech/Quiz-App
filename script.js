const container = document.querySelector("#questionContent");
const button = document.querySelector("#checkAnswerButton");
console.log(button);
let parentDiv = button.parentNode;

async function getQeustions() {
  const url = "./data/questions.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    displayQeustions(json);
  } catch (e) {
    console.error(e);
  }
}

getQeustions();

function displayQeustions(json) {
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
