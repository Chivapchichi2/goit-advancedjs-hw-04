import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './image-api.js';
import renderTemplate from './image-list.js';
import { Messages } from './messages.js';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

let page = 1;
let query = '';
let totalHits = 0;
let totalPages = 1;

const options = {
  rootMargin: '200px',
  threshold: 0.1,
};

const lightBox = new SimpleLightbox('.gallery a', {});
function onEntry(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await makeRender();
    }
  });
}

const observer = new IntersectionObserver(onEntry, options);

async function querySubmitHandler(e) {
  e.preventDefault();
  if (e.target.elements.searchQuery.value.trim() === '') {
    return Messages.error('Please enter a search query!');
  }
  if (e.target.elements.searchQuery.value.trim() === query) {
    return Messages.warning('Please enter a new search query! Or scroll down');
  }
  await makeRender();
}
function queryChecker() {
  const newQuery = formRef.elements.searchQuery.value.trim();
  if (newQuery !== query) {
    page = 1;
    totalPages = 1;
    query = newQuery;
    return true;
  } else {
    page += 1;
    return false;
  }
}

async function makeRender() {
  const isFirstQuery = queryChecker();
  if (isFirstQuery) {
    galleryRef.innerHTML = '';
  }

  if (page > totalPages) {
    Messages.warning('No more images');
    return;
  }
  let hits;
  try {
    const data = await fetchImages(query, page);
    hits = data.hits;
    totalHits = data.totalHits;
    totalPages = Math.ceil(totalHits / 40);
  } catch (error) {
    Messages.error(error.message);
  }

  if (!hits.length) {
    Messages.error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  if (isFirstQuery) {
    const massage = `"Hooray! We found ${totalHits} images."`;
    Messages.success(massage);
  }
  galleryRef.insertAdjacentHTML('beforeend', renderTemplate(hits));
  observer.observe(galleryRef.lastElementChild);
  lightBox.refresh();
}

formRef.addEventListener('submit', querySubmitHandler);
