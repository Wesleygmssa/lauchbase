// Active menu
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .menu a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

// Hide search input
const searchField = document.querySelector('.home form');

if (searchField) {
  if (currentPage.includes('about') || currentPage.includes('chefs')) {
    searchField.classList.add('hide');
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

// Pagination
function paginate(selectedPage, totalPages) {
  let pages = [],
      oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
      if (oldPage && currentPage - oldPage > 2) pages.push("...");
      if (oldPage && currentPage - oldPage == 2) pages.push(currentPage - 1);

      pages.push(currentPage);
      oldPage = currentPage;
    }
  }

  return pages;
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total);

  let elements = "";

  for (let page of pages) {
    if (String(page).includes("...")) {
      elements += `<span>${page}</span>`;
    } else {

      if (filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
      } else {
        elements += `<a href="?page=${page}">${page}</a>`;
      }
    }
  }

  pagination.innerHTML = elements;
}

const pagination = document.querySelector('.pagination');
if (pagination) createPagination(pagination);

// Photos
const PhotoSelected = {
  mainPhoto: document.querySelector('.img img'),
  highlights: document.querySelectorAll('.highlights img'),

  highlightPhoto(e) {
    const selected = e.target;

    for (image of PhotoSelected.highlights) {
      image.classList.remove('selected');
    }

    selected.classList.add('selected');

    PhotoSelected.mainPhoto.src = selected.src;
    PhotoSelected.mainPhoto.alt = selected.alt;
  }
}