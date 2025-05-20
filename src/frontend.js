import React from 'react';
import ReactDOM from 'react-dom';
import './frontend.scss';

const divsToUpdate = document.querySelectorAll('.paying-attention-update-me');

function Quiz() {
  return React.createElement(
    'div',
    { className: 'paying-attention-frontend' },
    'Hello from React'
  );
}

divsToUpdate.forEach(function (div) {
  ReactDOM.render(<Quiz />, div);
  div.classList.remove('paying-attention-update-me');
});
