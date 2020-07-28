// Active menu
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .menu a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

// Show or Hide topic
const showHides = document.getElementsByClassName('topic');

for (let showHide of showHides) {
  const buttonSpan = showHide.querySelector('span');

  buttonSpan.addEventListener('click', () => {
    if (buttonSpan.innerHTML == "ESCONDER") {
      showHide.querySelector('.topic-content').classList.add('hidden');
      buttonSpan.innerHTML = "MOSTRAR"   
    } else {
      showHide.querySelector('.topic-content').classList.remove('hidden');
      buttonSpan.innerHTML = "ESCONDER"
    }
  });
}