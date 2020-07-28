const modalOverlay = document.querySelector('.modal-overlay');
const courses = document.querySelectorAll('.course');
const modal = document.querySelector('.modal')

for (let course of courses) {
  course.addEventListener("click", function() {
    const courseId = course.getAttribute("id");
    
    modalOverlay.classList.add('active');
    modalOverlay.querySelector("iframe").src = `https://rocketseat.com.br/${courseId}`;

    const contain = modal.classList.contains("maximized");

    if (contain) {
      modal.classList.remove("maximized");
    }
  });
}

document.querySelector('.maximize-modal').addEventListener("click", function() {
  if (modal.classList.contains("maximized")) {
    modal.classList.remove("maximized");
  } else {
    modal.classList.add("maximized");
  }
});

document.querySelector('.close-modal').addEventListener("click", function() {
  modalOverlay.classList.remove("active");
  modalOverlay.querySelector("iframe").src = "";
});