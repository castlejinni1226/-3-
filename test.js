const apiKey = 'YOUR_API_KEY'; // 여기에 실제 API 키를 입력해주세요
const searchInput = document.getElementById('sinput');
const searchButton = document.getElementById('sbtn');
const movieContainer = document.getElementById('main');
const modalMovieDetails = document.getElementById('modalMovieDetails');

function fetchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function renderMovies(movies) {
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    // ... 카드 내용 작성

    // 클릭 시 모달 보이기
    movieCard.addEventListener('click', () => {
        showModal(movie);
    });

    return movieCard;
}

function showModal(movie) {
    modalMovieDetails.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="modal-poster">
        <h2>${movie.title}</h2>
        <p>원제: ${movie.original_title}</p>
        <p>평점: ${movie.vote_average}</p>
        <p>${movie.overview}</p>
    `;
    modal.style.display = 'block';
}

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        fetchMovies(searchTerm);
    } else {
        // 검색어가 없을 때의 처리
    }
});

searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            fetchMovies(searchTerm);
        } else {
            // 검색어가 없을 때의 처리
        }
    }
});

window.addEventListener('load', () => {
    // 초기화할 내용
});
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementsByClassName("default-ltr-cache-ve3cf8")[0];
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");
img.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};