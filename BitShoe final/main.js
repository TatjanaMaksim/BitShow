const container = document.querySelector(".container");
const input = document.querySelector("input");
const movies = document.querySelector(".movies");
const ulSearch = document.querySelector(".search");
const watchlist = document.querySelector(".watchlist");
const watchlistButton = document.querySelector(".watchlist-btn");
function fetchData() {
  fetch("https://api.tvmaze.com/shows")
    .then((res) => res.json())
    .then((res) => showShows(res));
}

function fetchSearch() {
  fetch("https://api.tvmaze.com/search/shows?q=" + input.value)
    .then((res) => res.json())
    .then((res) => showDropdown(res));
}

function showShows(res) {
  console.log(res);
  const response = res.slice(0, 50);

  response.map((e) => {
    const card = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const addWl = document.createElement("button");

    addWl.textContent = "ADD";

    image.setAttribute("src", e.image.medium);
    name.textContent = e.name;

    image.className = "image";
    name.className = "name";
    card.className = "card";
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(addWl);

    movies.appendChild(card);

    addWl.addEventListener("click", () => {
      const liItem = document.createElement("li");
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";

      liItem.textContent = e.name;

      watchlist.appendChild(liItem);
      watchlist.appendChild(removeBtn);

      removeBtn.addEventListener("click", () => {
        liItem.remove();
        removeBtn.remove();
      });
    });

    image.addEventListener("click", () => {
      localStorage.setItem("user", e.id);
      window.open("./ShowInfo.html");
    });
  });
}

// FUNCTION FOR INPUT SEARCH

function showDropdown(data) {
  console.log(data);
  const deleteLi = document.querySelectorAll("li");
  deleteLi.forEach((el) => {
    el.remove();
  });
  // function for each element of the search api object
  data.forEach((el) => {
    const li = document.createElement("li");
    li.textContent = el.show.name;
    ulSearch.appendChild(li);

    li.addEventListener("click", () => {
      localStorage.setItem("user", el.show.id);
      window.open("./showinfo.html");
    });
  });
}

input.addEventListener("keyup", fetchSearch);

window.addEventListener("load", () => {
  fetchData();
});

watchlistButton.addEventListener("click", () => {
  watchlist.classList.toggle("show");
});
