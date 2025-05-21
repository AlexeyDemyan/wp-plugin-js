import './frontend.scss';

const divsToUpdate = document.querySelectorAll('.paying-attention-update-me');

const handleAnswer = (
  index,
  correctAnswer,
  correctAnswerMessageElement,
  incorrectAnswerMessageElement
) => {
  if (index == correctAnswer) {
    console.log('Correct Answer!');
    correctAnswerMessageElement.classList.add('correct-message--visible');
  } else {
    console.log('Answer incorrect :<');
    incorrectAnswerMessageElement.classList.add('correct-message--visible');
  }

  setTimeout(() => {
    correctAnswerMessageElement.classList.remove('correct-message--visible');
    incorrectAnswerMessageElement.classList.remove('correct-message--visible');
  }, 2000);
};

const Quiz = (question, answers, bgColor, textAlignment) => {
  return `<div class="paying-attention-frontend" style="background-color:${bgColor}; text-align:${textAlignment}"><p>${question}</p><ul>${answers
    .map(
      (answer, index) => `<li class="answer" data-index=${index}>${answer}</li>`
    )
    .join(
      ''
    )}</ul><div class="correct-message"><p>That is correct</p></div><div class="incorrect-message"><p>That is incorrect :(</p></div></div>`;
};

divsToUpdate.forEach(function (div) {
  const data = JSON.parse(div.querySelector('pre').innerHTML);
  div.innerHTML = Quiz(data.question, data.answers, data.bgColor, data.textAlignment);
  const answersElements = div.querySelectorAll('.answer');
  const correctAnswerMessageElement = div.querySelector('.correct-message');
  const incorrectAnswerMessageElement = div.querySelector('.incorrect-message');
  answersElements.forEach((elt) =>
    elt.addEventListener('click', () => {
      handleAnswer(
        elt.dataset.index,
        data.correctAnswer,
        correctAnswerMessageElement,
        incorrectAnswerMessageElement
      );
    })
  );
  div.classList.remove('paying-attention-update-me');
});
