const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjNhYWVlNWYxYWUyZWUwMjViZjAzYjYzZGM2M2Y1ZCIsInN1YiI6IjY1OTc2N2YxMGU2NGFmMzE5YThjMThlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WFpcy72hzLFJG-KeQGphAp9eFXTwipQJRsQmfd19Gxg",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    const lcContainer = document.getElementById("main");

    data.results.forEach((movie, index) => {
      const movieCard = createMovieCard(
        index,
        movie.title,
        movie.original_title,
        movie.poster_path,
        movie.vote_average,
        movie.overview,
        movie.id
      );
      lcContainer.appendChild(movieCard);
    });
  })
  .catch((err) => console.error(err));

function goMainPage() {
  location.reload();
}
function createMovieCard(
  index,
  title,
  otitle,
  poster_path,
  vote_average,
  overview,
  id
) {
  console.log("크리에이트무비카드 스타트");

  const movieContainer = document.createElement("div");
  const imageElement = document.createElement("img");
  const plusContainer = document.createElement("div");
  const titleElement = document.createElement("div");
  const otitleElement = document.createElement("div");
  const starElement = document.createElement("div");
  const hrElement = document.createElement("hr");
  const overviewElement = document.createElement("div");

  movieContainer.className = "card";
  imageElement.className = "poster";
  plusContainer.className = "plus";
  titleElement.className = "p_title";
  otitleElement.className = "p-otitle";
  starElement.className = "p_star";
  overviewElement.className = "p_over";

  let round = Math.round(vote_average * 10) / 10;

  if (poster_path != null) {
    imageElement.src = "https://image.tmdb.org/t/p/original" + poster_path;
  } else {
    imageElement.src = "https://critics.io/img/movies/poster-placeholder.png";
  }

  titleElement.textContent = title;
  otitleElement.textContent = `(${otitle})`;
  starElement.textContent = `평점 : ${round}`;
  overviewElement.textContent = overview;
  plusContainer.appendChild(titleElement);
  plusContainer.appendChild(otitleElement);
  plusContainer.appendChild(starElement);
  plusContainer.appendChild(hrElement);
  plusContainer.appendChild(overviewElement);
  movieContainer.appendChild(imageElement);
  movieContainer.appendChild(plusContainer);

  function handlePosterClick() {
    alert(`해당 영화의 ID : ${id}`);
  }
  imageElement.addEventListener("click", handlePosterClick);
  return movieContainer;
  console.log("크리에이트무비카드 엔드");
}

/*검색기능*/

const sbtn = document.querySelector("#sbtn");
const sinput = document.querySelector("#sinput");
const sform = document.querySelector("#search");

sform.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(sinput.value);
});

/*
  const searchKey = sinput.value;
  const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  if (check.test(searchKey)) {
    searchKey.trim();
  } else {
    searchKey.trim().toUpperCase();
  }

  const movieCards = document.querySelectorAll(".card");

  movieCards.forEach((card) => {
    const title_1 = card.querySelector(".p_title").textContent.trim();
    const title_2 = card.querySelector(".p-otitle").textContent.trim();

    if (check.test(title_1)) {
    } else {
      title_1.toUpperCase();
    }

    if (check.test(title_2)) {
    } else {
      title_2.toUpperCase();
    }

    const searchedValue = searchKey;

    if (title_1.includes(searchedValue) || title_2.includes(searchedValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
  */

function renderMovies(movies) {
  console.log("renderMovies 스타트");
  const lcContainer = document.getElementById("main");
  lcContainer.innerHTML = "";

  movies.forEach((movie, index) => {
    const movieCard = createMovieCard(
      index + 1,
      movie.title,
      movie.original_title,
      movie.poster_path,
      movie.vote_average,
      movie.overview,
      movie.id
    );
    lcContainer.appendChild(movieCard);
  });
  console.log("renderMovies 엔드");
}
