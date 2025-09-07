

import { podcasts, genres, seasons } from "./data.js";

// ---- Podcast Model ----
class Podcast {
  constructor({
    id,
    title,
    description,
    seasons: seasonCount,
    image,
    genres,
    updated,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.seasonCount = seasonCount;
    this.image = image;
    this.genres = genres;
    this.updated = updated;

    // attach matching seasons from external seasons data
    const match = seasons.find((s) => String(s.id) === String(this.id));
    this.seasonDetails = match ? match.seasonDetails : [];
  }

  getGenreNames() {
    return this.genres
      .map((genreId) => {
        const g = genres.find((genre) => genre.id === genreId);
        return g ? g.title : "";
      })
      .join(", ");
  }
}

// ---- UI Class ----
class PodcastUI {
  constructor(containerId, modalId) {
    this.container = document.getElementById(containerId);
    this.modal = document.getElementById(modalId);

    // Modal content references
    this.modalImage = this.modal.querySelector("#modal-image");
    this.modalTitle = this.modal.querySelector("#modal-title");
    this.modalDescription = this.modal.querySelector("#modal-description");
    this.modalSeasons = this.modal.querySelector("#modal-seasons");
    this.modalGenres = this.modal.querySelector("#modal-genres");
    this.modalUpdated = this.modal.querySelector("#modal-updated");
    this.modalSeasonList = this.modal.querySelector("#modal-season-list");
    this.closeBtn = this.modal.querySelector(".close");

    // Event: close modal
    this.closeBtn.addEventListener("click", () => this.closeModal());
    window.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });
  }

  renderPodcasts(podcastList) {
    this.container.innerHTML = "";

    podcastList.forEach((p) => {
      const card = document.createElement("div");
      card.className = "podcast-card";

      card.innerHTML = `
        <button id="${p.id}">
          <img src="${p.image}" alt="${p.title}" width="100">
          <div class="podcast-content">
            <h2>${p.title}</h2>
            <p class="meta"> ${p.seasonCount} seasons</p>
            <p class="genre"> ${p.getGenreNames()}</p>
            <p class="meta"><strong>Updated:</strong> ${new Date(
              p.updated
            ).toDateString()}</p>
          </div>
        </button>
      `;

      this.container.appendChild(card);

      // Event listener for modal
      card.querySelector("button").addEventListener("click", () => {
        this.openModal(p);
      });
    });
  }

  openModal(podcast) {
    this.modalImage.src = podcast.image;
    this.modalTitle.textContent = podcast.title;
    this.modalDescription.textContent = podcast.description;
    this.modalSeasons.textContent = podcast.seasonCount;
    this.modalGenres.textContent = podcast.getGenreNames();
    this.modalUpdated.textContent = new Date(podcast.updated).toDateString();

    // render seasons details list
    this.modalSeasonList.innerHTML = "";
    podcast.seasonDetails.forEach((season) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h4>${season.title}</h4>
        <p>${season.subtitle? season.subtitle : ""}</p>
        <p> ${season.episodes} episodes</p>
      `;
      this.modalSeasonList.appendChild(li);
    });

    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }
}

// ---- Init ----
const podcastInstances = podcasts.map((p) => new Podcast(p));
const ui = new PodcastUI("podcasts", "modal");
ui.renderPodcasts(podcastInstances);
