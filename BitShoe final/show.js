let id = localStorage.getItem("user");

function fetchData() {
  fetch("https://api.tvmaze.com/shows/" + id)
    .then((res) => res.json())
    .then((res) => showInfo(res));
}

function fetchSeasons() {
  fetch("https://api.tvmaze.com/shows/" + id + "/seasons")
    .then((res) => res.json())
    .then((res) => showSeasons(res));
}

function fetchCast() {
  fetch("https://api.tvmaze.com/shows/" + id + "/cast")
    .then((res) => res.json())
    .then((res) => showCast(res));
}

function showInfo(res) {
  console.log(res);
  const title = document.querySelector("title");
  const movietitle = document.querySelector(".movietitle");
  const image = document.querySelector(".image");
  const img = document.createElement("img");
  const showInfo = document.querySelector(".showinfo");

  title.textContent = res.name;
  movietitle.textContent = res.name;
  showInfo.innerHTML = res.summary;
  img.setAttribute("src", res.image.medium);

  image.appendChild(img);
}

function showSeasons(res) {
  console.log(res);
  const seasonheading = document.createElement("h2");
  const seasons = document.querySelector(".seasons");
  seasonheading.textContent = "Seasons(" + res.length + ")";
  seasons.appendChild(seasonheading);

  res.forEach((e) => {
    const listitem = document.createElement("li");
    listitem.textContent = e.premiereDate + " - " + e.endDate;
    seasons.appendChild(listitem);
  });
  seasons.appendChild(listitem);
  console.log(res);
}

function showCast(res) {
  console.log(res);
  const cast = document.querySelector(".cast");
  const castheading = document.createElement("h2");
  castheading.textContent = "Cast";
  cast.appendChild(castheading);

  res.forEach((e) => {
    const castul = document.createElement("ul");
    const seasoncast = document.createElement("li");

    seasoncast.textContent = e.person.name;

    cast.appendChild(seasoncast);
  });
}

// const watch = document.querySelector("watch");

// watch.addEventListener("click", () => {});

window.addEventListener("load", () => {
  fetchSeasons();
  fetchData();
  fetchCast();
});
