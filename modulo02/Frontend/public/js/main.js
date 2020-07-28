const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener("click", function() {
    const videoId = card.getAttribute("id");
    modalOverlay.classList.add('active');
    modalOverlay.querySelector("iframe").src = `https://www.youtube.com/embed/${videoId}`;
  });
}

function closeModal(attribute) {
  document.querySelector(attribute).addEventListener("click", function() {
    modalOverlay.classList.remove('active');
    modalOverlay.querySelector("iframe").src = "";
  });
}

closeModal(".modal-overlay");
closeModal(".close-modal");