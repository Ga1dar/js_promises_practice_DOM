'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve('First promise was resolved'));
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
  body.addEventListener('click', () => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightCliсk = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
      setTimeout(() => (leftClick = false), 3000);
    }

    if (e.button === 2) {
      e.preventDefault();
      rightCliсk = true;
      setTimeout(() => (rightCliсk = false), 3000);
    }

    if (leftClick && rightCliсk) {
      resolve('Third promise was resolved');
      leftClick = false;
      rightCliсk = false;
    }
  });
});

const creatDiv = (massage, className, dataQA) => {
  const div = document.createElement('div');

  div.classList.add(className);
  div.setAttribute('data-qa', dataQA);
  div.textContent = massage;
  body.appendChild(div);
};

firstPromise
  .then((massage) => creatDiv(massage, 'success', 'notification'))
  .catch((erorr) => creatDiv(erorr, 'error', 'notification'));

secondPromise.then((massage) => creatDiv(massage, 'success', 'notification'));

thirdPromise.then((massage) => creatDiv(massage, 'success', 'notification'));
