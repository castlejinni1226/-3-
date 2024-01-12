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
        movie
      );
      lcContainer.appendChild(movieCard);
    });
  })
  .catch((err) => console.error(err));

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

  // function handlePosterClick() {
  //   alert(`해당 영화의 ID : ${id}`);
  // }

  //movie 정보 전달
  imageElement.addEventListener("click", () => displayModal(movie));
  return movieContainer;
}

// const sbtn = document.getElementById("sbtn");
// sbtn.addEventListener("click", handleSearch);

// const sinput = document.getElementById("sinput");
// sinput.addEventListener("keyup", function (event) {
//   if (event.key === "Enter") {
//     handleSearch();
//   }
// });

{
  /* <form class="search-form" onsubmit="search_movie(event)">
      <input class="search-box" /> */
}

// const search_box = document.getElementsByClassName("search-box")[0];
// const search_keyword = search_box.value.toUpperCase();

// const search_movie_list = all_movie_list.filter(({ title }) =>
//   title.toUpperCase().includes(search_keyword)
// );

// search_movie_list.length > 0
//   ? draw_movie_list(search_movie_list)
//   : alert("검색결과가 없어용");

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

//모달 관련
const modal = document.querySelector(".modal");
const modalBackground = modal.querySelector(".modalBackground");
let isOpen = false;

function displayModal(movie) {
  // 모달 엘리먼트에 접근
  const modal = document.querySelector(".modal");
  const modalContent = modal.querySelector(".modalContent");

  // 모달 내용을 클릭된 영화의 정보로 업데이트
  modalContent.innerHTML = `
      <div class="modalDetails">
        <h2>${movie.title}</h2>
        <h3>${movie.original_title}</h3>
        <p>${movie.release_date}</p>
        <img class="modalPoster" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie} poster">
        <hr>
        <p>${movie.overview}</p>
        <hr>
        <h2>리뷰</h2>
        <div class = "review">
        <form class="row g-3">
        <div class="col-md-6">
        <label for="inputEmail4" class="form-label"></label>
        <input type="email" class="form-control" id="inputEmail4" placeholder="작성자">
        </div>
        <div class="col-md-6">
        <label for="inputPassword4" class="form-label"></label>
        <input type="password" class="form-control" id="inputPassword4" placeholder="비밀번호">
        </div>
        <div class="col-12">
        <label for="inputAddress" class="form-label"></label>
        <input type="text" class="form-control" id="inputAddress" placeholder="여러분의 소중한 댓글을 입력해주세용">
        </div>
        <button id="reviewbtn" type="submit" class="btn btn-primary">등록하기</button>
        <div class="input-group input-group-lg">
        </div>
        </div>
        </div>
    `;

  // 모달을 보이게 설정
  modal.classList.remove("hidden");
  isOpen = true;
  console.log(isOpen);
  // 애니메이션을 위해 fadein 클래스 추가
  modalContent.classList.add("fadein");
}

// 모달 창을 닫는 함수
function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("hidden");
  isOpen = false;
}

// 모달 배경에 닫기 함수를 연결
modalBackground.addEventListener("click", closeModal);

// 모달 창이 열리면 뒷 내용 스크롤 방지
if (isOpen) {
  document.main.style.overflowY = "hidden";
} else {
  document.main.style.overflowY = "auto";
}
