const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.recipes');

for (let card of cards) {
  card.addEventListener('click', () => {
    const srcImg = card.querySelector('img').src;
    const cardTitle = card.querySelector('.title p').innerHTML;
    const cardAuthor = card.querySelector('.author p').innerHTML;
    modalOverlay.classList.add('active');

    modalOverlay.querySelector('.img img').src = `${srcImg}`;
    modalOverlay.querySelector('.title p').innerHTML = `${cardTitle}`;
    modalOverlay.querySelector('.author p').innerHTML = `${cardAuthor}`;
  });
}

document.querySelector('.close').addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});