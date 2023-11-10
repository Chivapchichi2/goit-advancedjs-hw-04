export default function renderTemplate(data) {
  return data
    .map(
      item => `
<li class="photo-card">
  <a href="${item.largeImageURL}" class="photo-card-link">
    <img class="photo-card-image" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <i class="material-icons">thumb_up</i>
      ${item.likes}
    </p>
    <p class="info-item">
      <i class="material-icons">visibility</i>
      ${item.views}
    </p>
    <p class="info-item">
      <i class="material-icons">comment</i>
      ${item.comments}
    </p>
    <p class="info-item">
      <i class="material-icons">cloud_download</i>
      ${item.downloads}
    </p>
  </div>
</li>
`
    )
    .join('');
}
