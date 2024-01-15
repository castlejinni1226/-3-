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
      "&include_adult=false&language=ko-KR",
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
        const targetDiv = document.getElementById("topButton");

        // "details" 섹션을 생성
        const detailsSection = document.createElement("section");
        detailsSection.id = "details";
        detailsSection.className = "details";
        targetDiv.insertAdjacentElement("beforebegin", detailsSection);

        const titleBox = document.createElement("div");
        titleBox.className = "titleBox";
        detailsSection.appendChild(titleBox);

        // 제목과 뒤로가기 버튼
        const backButton = document.createElement("button");
        backButton.textContent = "메인으로";
        backButton.id = "back-to-main";
        backButton.type = "button";
        backButton.className = "btn-btn-dark";
        titleBox.appendChild(backButton);

        const detailsTitle = document.createElement("h1");
        detailsTitle.textContent = "검색결과!";
        titleBox.appendChild(detailsTitle);

        const blankBox2 = document.createElement("div");
        blankBox2.style = "width : 110px";
        titleBox.appendChild(blankBox2);

        // 뒤로가기 버튼에 이벤트 리스너 추가
        backButton.addEventListener("click", () => {
          detailsSection.style.display = "none";
          document.getElementById("details-main").remove();

          // 초기에 보여질 섹션들을 다시 보여줍니다.
          sections.forEach(section => {
            section.style.display = "block";
          });
        });

        // "details-main" div를 생성하고 보여줍니다.
        const detailsMainSection = document.createElement("div");
        detailsMainSection.id = "details-main";
        detailsMainSection.className = "details-main";
        detailsSection.appendChild(detailsMainSection);

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
            movie
          );

          //lcContainer.appendChild(movieCard);
          document.getElementById("details-main").appendChild(movieCard);
        });
      } else {
        alert("검색 결과가 없습니다.");
      }
    })
    .catch(err => console.error(err));
}
