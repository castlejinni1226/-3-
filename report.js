const options = config.options;

// API 호출 함수
function MovieFetch(url, containerId) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        data.results.forEach((movie, index) => {
          const movieCard = createMovieCard(
            index,
            movie.title,
            movie.original_title,
            movie.poster_path,
            movie.vote_average,
            movie.overview,
            movie
          );

          document.getElementById(containerId).appendChild(movieCard);
        });

        // 성공적으로 데이터를 처리한 후에 프로미스를 해결(resolve)합니다.
        resolve(data);
      })
      .catch(err => {
        // 에러 발생 시 프로미스를 거부(reject)합니다.
        reject(err);
      });
  });
}

// 사용 예시
MovieFetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=1&region=KR&sort_by=popularity.desc&with_original_language=ko",
  "main"
);

MovieFetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
  "main2"
);

MovieFetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc",
  "main3"
);

function createMovieCard(
  index,
  title,
  otitle,
  poster_path,
  vote_average,
  overview,
  movie
) {
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

  imageElement.src = "https://image.tmdb.org/t/p/original" + poster_path;

  //search 결과 데이터의 poster_path가 null 인경우, 이미지 빈값에 대해 디폴트 이미지로 처리
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
  // plusContainer.appendChild(otitleElement);
  // plusContainer.appendChild(starElement);
  plusContainer.appendChild(hrElement);
  // plusContainer.appendChild(overviewElement);
  movieContainer.appendChild(imageElement);
  movieContainer.appendChild(plusContainer);

  // function handlePosterClick() {
  //   alert(`해당 영화의 ID : ${id}`);
  // }
  // imageElement.addEventListener("click", handlePosterClick);
  imageElement.addEventListener("click", () => displayModal(movie));

  return movieContainer;
}

{
  /* <form class="search-form" onsubmit="search_movie(event)">
    <input class="search-box" /> */
}

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
      movie.id,
      movie
    );
    lcContainer.appendChild(movieCard);
  });
}

//검색기능 추가
const sbtn = document.querySelector("#sbtn");
const sinput = document.querySelector("#sinput");
const sform = document.querySelector("#search");

sform.addEventListener("submit", event => {
  event.preventDefault();
  handleSearch(sinput.value);
});

//스파르타로고 클릭 시, 메인화면 새로고침
function goMainPage() {
  location.reload();
}
