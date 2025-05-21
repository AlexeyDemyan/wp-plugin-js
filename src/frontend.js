import './frontend.scss';

const divsToUpdate = document.querySelectorAll('.paying-attention-update-me');

const Quiz = (question, answers) => {
  return `<div class="paying-attention-frontend"><p>${question}</p><ul>${answers.map(
    (answer) => `<li>${answer}</li>`
  ).join('')}</ul></div>`;
};

divsToUpdate.forEach(function (div) {
  const data = JSON.parse(div.querySelector('pre').innerHTML);
  div.innerHTML = Quiz(data.question, data.answers);
  div.classList.remove('paying-attention-update-me');
});
