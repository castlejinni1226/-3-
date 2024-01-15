function handleSearch(val) {
  const searchKey = sinput.value;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjNhYWVlNWYxYWUyZWUwMjViZjAzYjYzZGM2M2Y1ZCIsInN1YiI6IjY1OTc2N2YxMGU2NGFmMzE5YThjMThlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WFpcy72hzLFJG-KeQGphAp9eFXTwipQJRsQmfd19Gxg"
    }
  };

  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      `${searchKey}` +
      "&include_adult=false&language=en-US&page=1",
    options
  )
    .then(response => response.json())
    .then(data => {
      //const lcContainer = document.getElementById("main4");

      if (data.total_results > 0) {
        //const movieCards = document.querySelectorAll(".card");
        //const parent = document.getElementById("main");
        //parent.replaceChildren();

        // 모든 섹션을 제거
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
          section.style.display = "none";
        });

        // "details" 섹션이 이미 존재한다면 제거
        const existingDetailsSection = document.getElementById("details");
        if (existingDetailsSection) {
          existingDetailsSection.remove();
        }

        //기존 검색결과 섹션을 제거
        const existingSearchSection = document.getElementById("searchResult");
        if (existingSearchSection) {
          existingSearchSection.remove();
        }

        // 검색결과 섹션을 생성
        const searchSection = document.createElement("section");
        searchSection.id = "searchResult";
        searchSection.className = "searchResult";

        const targetDiv = document.getElementById("topButton");
        targetDiv.insertAdjacentElement("beforebegin", searchSection);

        const searchIn = document.createElement("div");
        searchIn.className = "searchDetail";
        searchIn.id = "searchDetail";
        searchSection.appendChild(searchIn);

        // 검색 개별데이터 카드생성
        data.results.forEach((movie, index) => {
          const title = movie.title;
          const original_title = movie.original_title;
          const poster_path = movie.poster_path;
          const vote_average = movie.vote_average;
          const overview = movie.overview;
          const id = movie.id;

          const movieCard = createMovieCard(
            index,
            title,
            original_title,
            poster_path,
            vote_average,
            overview,
            id
          );

          //lcContainer.appendChild(movieCard);
          document.getElementById("searchDetail").appendChild(movieCard);
        });
      } else {
        alert("검색 결과가 없습니다.");
      }
    })
    .catch(err => console.error(err));
}
