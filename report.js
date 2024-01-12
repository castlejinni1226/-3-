const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjNhYWVlNWYxYWUyZWUwMjViZjAzYjYzZGM2M2Y1ZCIsInN1YiI6IjY1OTc2N2YxMGU2NGFmMzE5YThjMThlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WFpcy72hzLFJG-KeQGphAp9eFXTwipQJRsQmfd19Gxg"
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=1&region=KR&sort_by=popularity.desc&with_original_language=ko'
  , options)

  .then(response => response.json())
  .then(data => {
    // const lcContainer = document.getElementById("main");
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
      document.getElementById("main").appendChild(movieCard);
    });
  })
  .catch(err => console.error(err));

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
  options
)

  .then(response => response.json())
  .then(data => {
    // const lcContainer = document.getElementById("main");
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
      document.getElementById("main2").appendChild(movieCard);
    });
  })
  .catch(err => console.error(err));


fetch(
  'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc',
  options)


  .then(response => response.json())
  .then(data => {
    // const lcContainer = document.getElementById("main");
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
      document.getElementById("main3").appendChild(movieCard);
    });
  })
  .catch(err => console.error(err));



function createMovieCard(
  index,
  title,
  otitle,
  poster_path,
  vote_average,
  overview,
  id
) {
  const movieContainer = document.createElement("div");
  const imageElement = document.createElement("img");
  const plusContainer = document.createElement("div");
  const titleElement = document.createElement("div");
  const hrElement = document.createElement("hr");


  movieContainer.className = "card";
  imageElement.className = "poster";
  plusContainer.className = "plus";
  titleElement.className = "p_title";


  let round = Math.round(vote_average * 10) / 10;

  imageElement.src = "https://image.tmdb.org/t/p/original" + poster_path;

  titleElement.textContent = title;

  plusContainer.appendChild(titleElement);
  ;
  plusContainer.appendChild(hrElement);

  movieContainer.appendChild(imageElement);
  movieContainer.appendChild(plusContainer);

  function handlePosterClick() {
    alert(`해당 영화의 ID : ${id}`);
  }
  imageElement.addEventListener("click", handlePosterClick);
  return movieContainer;
}

const sbtn = document.getElementById("sbtn");
sbtn.addEventListener("click", handleSearch);

const sinput = document.getElementById("sinput");
sbtn.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

{
  /* <form class="search-form" onsubmit="search_movie(event)">
    <input class="search-box" /> */
}

const search_box = document.getElementsByClassName("search-box")[0];
const search_keyword = search_box.value.toUpperCase();

const search_movie_list = all_movie_list.filter(({ title }) =>
  title.toUpperCase().includes(search_keyword)
);

search_movie_list.length > 0
  ? draw_movie_list(search_movie_list)
  : alert("검색결과가 없어용");

function renderMovies(movies) {
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


}
