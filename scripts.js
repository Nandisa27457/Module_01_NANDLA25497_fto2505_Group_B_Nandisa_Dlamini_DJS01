import { podcasts, genres } from "./data.js";

const container = document.getElementById("podcasts");

podcasts.forEach((podcast) => {
  const card = document.createElement("div");
  card.className = "podcast-card";

  // new genre title array, 
  var genreArray=[];
  podcast.genres.forEach(genreId => {
    genres.filter(genre =>{
      if (genre.id==genreId) {
        // push items into the genre title array
        genreArray.push(`<strong>${genre.title}</strong>`)
      }
    })
  })

  card.innerHTML = `
    <img src="${podcast.image}" alt="${podcast.title}" width="50">
    <div class="podcast-content">
      <h2>${podcast.title}</h2>
      <p class="meta"><strong>Seasons:</strong> ${podcast.seasons}</p>
      <p class="meta"> ${genreArray}</p>
      <p class="meta"><strong>Updated:</strong> ${new Date(
        podcast.updated
      ).toDateString()}</p>
    </div>
  `;

  container.appendChild(card);
});
