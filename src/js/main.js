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
  await makeRender();
}
function queryChecker() {
  if (formRef.elements.searchQuery.value !== query) {
    page = 1;
    totalPages = 1;
    query = formRef.elements.searchQuery.value;
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
  const hits = await fetchImages(query, page)
    .then(data => {
      totalHits = data.totalHits;
      totalPages = Math.ceil(totalHits / 40);
      return data.hits;
    })
    .catch(error => Messages.error(error.message));
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
