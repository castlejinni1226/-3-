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
      if (data.total_results > 0) {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
          section.style.display = "none";
        });

        const existingDetailsSection = document.getElementById("details");
        if (existingDetailsSection) {
          existingDetailsSection.remove();
        }
        const targetDiv = document.getElementById("topButton");

        const detailsSection = document.createElement("section");
        detailsSection.id = "details";
        detailsSection.className = "details";
        targetDiv.insertAdjacentElement("beforebegin", detailsSection);

        const titleBox = document.createElement("div");
        titleBox.className = "titleBox";
        detailsSection.appendChild(titleBox);

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

        backButton.addEventListener("click", () => {
          detailsSection.style.display = "none";
          document.getElementById("details-main").remove();

          sections.forEach(section => {
            section.style.display = "block";
          });
        });

        const detailsMainSection = document.createElement("div");
        detailsMainSection.id = "details-main";
        detailsMainSection.className = "details-main";
        detailsSection.appendChild(detailsMainSection);

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
          document.getElementById("details-main").appendChild(movieCard);
        });
      } else {
        alert("검색 결과가 없습니다.");
      }
    })
    .catch(err => console.error(err));
}
