function handleSearch(val) {
  const searchKey = sinput.value;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjNhYWVlNWYxYWUyZWUwMjViZjAzYjYzZGM2M2Y1ZCIsInN1YiI6IjY1OTc2N2YxMGU2NGFmMzE5YThjMThlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WFpcy72hzLFJG-KeQGphAp9eFXTwipQJRsQmfd19Gxg",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      `${searchKey}` +
      "&include_adult=false&language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const lcContainer = document.getElementById("main");

      if (data.total_results > 0) {
        const movieCards = document.querySelectorAll(".card");
        const parent = document.getElementById("main");
        parent.replaceChildren();

        data.results.forEach((movie, index) => {
          const title = movie.title;
          const original_title = movie.original_title;
          const poster_path = movie.poster_path;
          const vote_average = movie.vote_average;
          const overview = movie.overview;
          const id = movie.id;

          console.log("title : " + title);
          console.log("original_title : " + original_title);
          console.log("poster_path : " + poster_path);
          console.log("vote_average : " + vote_average);
          console.log("overview : " + overview);
          console.log("id : " + id);

          const movieCard = createMovieCard(
            index,
            title,
            original_title,
            poster_path,
            vote_average,
            overview,
            id
          );

          lcContainer.appendChild(movieCard);
        });
      } else {
        alert("검색 결과가 없습니다.");
      }
    })
    .catch((err) => console.error(err));
}
