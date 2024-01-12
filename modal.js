//모달 관련
const modal = document.querySelector(".modal");
const modalBackground = modal.querySelector(".modalBackground");

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
  // 애니메이션을 위해 fadein 클래스 추가
  modalContent.classList.add("fadein");
  document.body.style.overflowY = "hidden";
}

// 모달 창을 닫는 함수
function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("hidden");
  isOpen = false;
  console.log(isOpen);
  document.body.style.overflowY = "auto";
}

// 모달 배경에 닫기 함수를 연결
modalBackground.addEventListener("click", closeModal);

// // 모달 창이 열리면 뒷 내용 스크롤 방지
// if (isOpen) {
//   document.body.style.overflow = "hidden";
// } else {
//   document.body.style.overflowY = "auto";
// }
