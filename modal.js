//모달 관련
const modal = document.querySelector(".modal");
const modalBackground = modal.querySelector(".modalBackground");
let isOpen = false;

function displayModal(movie) {
  // 모달 엘리먼트에 접근
  const modal = document.querySelector(".modal");
  const modalContent = modal.querySelector(".modalContent");
  document.body.style.overflow = "hidden";

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
  </div>
  <div>
  <h2>리뷰</h2>
  <div class = "review">
  <form class="row g-3">
  <div class="col-md-6">
  <label for="inputName" class="form-label"></label>
  <input type="name" class="form-control" id="inputName" placeholder="작성자">
  </div>
  <div class="col-md-6">
  <label for="inputPassword" class="form-label"></label>
  <input type="password" class="form-control" id="inputPassword" placeholder="비밀번호">
  </div>
  <div class="form-floating">
  <textarea class="form-control" placeholder="여러분의 소중한 댓글을 입력해주세요" id="inputComment" style="height: 100px"></textarea>
  <label for="inputComment">여러분의 소중한 댓글을 입력해주세요</label>
  <div id="${movie.id}" class="reviewButton">
  <button id="reviewbtn" type="submit" class="btn btn-primary">등록하기</button>
  </div>
  <div id="commentsContainer">
        </div>
  </div>
  </div>`;

  // 모달을 보이게 설정
  modal.classList.remove("hidden");
  isOpen = true;
  console.log(isOpen);
  // 애니메이션을 위해 fadein 클래스 추가
  modalContent.classList.add("fadein");

  // 리뷰 버튼
  const reviewButton = document.getElementById("reviewbtn");
  reviewButton.addEventListener("click", handleReviewButton);

  function handleReviewButton() {
    submitReview(reviewButton);
  }

  const commentsContainer = document.getElementById("commentsContainer");
  const retrievedComments = JSON.parse(localStorage.getItem(movie.id));

  for (let i = 0; i < retrievedComments.length; i++) {
    const card = document.createElement("div");
    card.classList.add("reviewCard");
    card.id = retrievedComments[i].password;
    card.innerHTML = `
   <div class="card-body">
     <blockquote class="blockquote mb-0">
       <p>${retrievedComments[i].comment}</p>
       <footer class="blockquote-footer">
         ${retrievedComments[i].name}
       </footer>
     </blockquote>
   </div>`;
    commentsContainer.appendChild(card);
  }
}

// 모달 창을 닫는 함수
function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
  isOpen = false;
}

// 모달 배경에 닫기 함수를 연결
modalBackground.addEventListener("click", closeModal);

function submitReview(reviewButton) {
  let nameInput = document.getElementById("inputName").value;
  let commentInput = document.getElementById("inputComment").value;
  let passwordInput = document.getElementById("inputPassword").value;

  //유효성 검사
  if (!nameInput) {
    alert("이름이 입력되지 않았습니다.");
    event.preventDefault();
  } else if (!passwordInput) {
    alert("비밀번호가 입력되지 않았습니다.");
    event.preventDefault();
  } else if (!commentInput) {
    alert("리뷰의 내용이 입력되지 않았습니다.");
    event.preventDefault();
  } else {
    const movieId = reviewButton.parentNode.id;
    let movieComments = localStorage.getItem(movieId);

    // 저장된 댓글이 없다면 빈 배열로 초기화
    if (!movieComments) {
      movieComments = [];
    } else {
      // 저장된 댓글이 있다면 JSON 문자열을 파싱하여 배열로 변환
      movieComments = JSON.parse(movieComments);
    }

    const newComment = {
      name: nameInput,
      password: passwordInput,
      comment: commentInput
    };

    movieComments.push(newComment);

    // 작성된 리뷰를 Local Storage에 저장
    localStorage.setItem(movieId, JSON.stringify(movieComments));
  }
}

// // 모달 창이 열리면 뒷 내용 스크롤 방지
// if (isOpen) {
//   document.body.style.overflow = "hidden";
// } else {
//   document.body.style.overflowY = "auto";
// }
