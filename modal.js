//모달 관련
const modal = document.querySelector(".modal");
const modalBackground = modal.querySelector(".modalBackground");
let isOpen = false;

function displayModal(movie) {
  // 모달 엘리먼트에 접근
  const modal = document.querySelector(".modal");
  const modalContent = modal.querySelector(".modalContent");
  modalContent.id = movie.id;
  let starCount = Math.round(movie.vote_average);
  let star = "";
  if (starCount % 2 === 0) {
    for (let i = 0; i < starCount / 2; i++) {
      star += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>`;
    }
  } else {
    for (let i = 0; i < (starCount - 1) / 2; i++) {
      star += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>`;
    }
    star += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
  </svg>`;
  }

  // 모달 내용을 클릭된 영화의 정보로 업데이트
  modalContent.innerHTML = `
  <div class="modalDetails">
  <h2>${movie.title}</h2>
  <h3>${movie.original_title}</h3>
  <p>개봉 ${movie.release_date}</p>
  <img class="modalPoster" src="https://image.tmdb.org/t/p/original${
    movie.poster_path
  }" alt="${movie} poster">
  <p class = "star">${star}</p>
  <p>평점: ${Math.round(movie.vote_average * 10) / 10}</p>  
  <hr>
  <p>${movie.overview}</p>
  <hr>
  </div>
  <div class = "modalRight">
  <h2>리뷰</h2>
  <div class = "review">
  <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01">별점</label>
            <select class="form-select" id="inputStar">
                <option selected>별점 선택</option>
                <option value="★">★</option>
                <option value="★★">★★</option>
                <option value="★★★">★★★</option>
                <option value="★★★★">★★★★</option>
                <option value="★★★★★">★★★★★</option>
            </select>
        </div>
  <form class="row g-3 userInfoArea">
  <div class="col-md-6">
  <label for="inputName" class="form-label"></label>
  <input type="name" class="form-control" id="inputName" placeholder="작성자">
  </div>
  <div class="col-md-6">
  <label for="inputPassword" class="form-label"></label>
  <input type="password" class="form-control" id="inputPassword" placeholder="비밀번호">
  </div>
  </form>
  <div class="form-floating">
  <textarea class="form-control" placeholder="여러분의 소중한 댓글을 입력해주세요" id="inputComment" style="height: 100px"></textarea>
  <label for="inputComment">여러분의 소중한 댓글을 입력해주세요</label>
  <button id="reviewbtn" type="submit" class="btn btn-outline-dark">등록하기</button>
  </div>
  </div>
  <div id="commentsContainer"></div>  
  </div>  
  <button type="button" class="btn-close" aria-label="Close"></button>
  `;

  // 모달을 보이게 설정
  modal.classList.remove("hidden");
  isOpen = true;

  // 애니메이션을 위해 fadein 클래스 추가
  modalContent.classList.add("fadein");

  // 모달 배경에 닫기 함수를 연결
  modalBackground.addEventListener("click", closeModal);

  // 모달 버튼에 닫기 함수를 연결
  let closeButton = modal.querySelector(".btn-close");
  closeButton.addEventListener("click", closeModal);

  // 작성된 댓글 표시하기
  const commentsContainer = document.getElementById("commentsContainer");
  const retrievedComments = JSON.parse(localStorage.getItem(movie.id));
  if (retrievedComments) {
    for (let i = 0; i < retrievedComments.length; i++) {
      const card = document.createElement("div");
      card.classList.add("reviewCard");
      card.innerHTML = `
   <div class="comment" id=${i} >
     <blockquote class="blockquote mb-0">
       <p>${retrievedComments[i].comment}</p>
       <footer class="blockquote-footer">
         ${retrievedComments[i].name}
         <p>${retrievedComments[i].star}</p>
       </footer>
     </blockquote>
     <button type="button" class="btn btn-outline-light btn-sm editbtn">수정</button>
     <button type="button" class="btn btn-outline-danger btn-sm deletebtn">삭제</button>
   </div>`;
      commentsContainer.appendChild(card);
    }
  }

  // 리뷰 등록 버튼
  const reviewButton = document.getElementById("reviewbtn");
  reviewButton.addEventListener("click", handleReviewButton);

  function handleReviewButton() {
    submitReview(reviewButton);
  }

  // 리뷰 삭제 버튼
  let deleteButtons = document.getElementsByClassName("deletebtn");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", handleDeleteButton);
  }
  function handleDeleteButton(event) {
    deleteReview(event.target);
  }

  // 리뷰 수정 버튼
  let editButtons = document.getElementsByClassName("editbtn");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", handleEditButton);
  }
  function handleEditButton(event) {
    editReview(event.target);
  }
}

// 모달 창을 닫는 함수
function closeModal() {
  const modal = document.querySelector(".modal");
  // 다시 열 때 위에서부터 볼 수 있도록 스크롤
  modal.scrollTo(0, 0);
  modal.classList.add("hidden");
  isOpen = false;
}

// 리뷰 저장 함수
function submitReview(reviewButton) {
  let nameInput = document.getElementById("inputName").value;
  let commentInput = document.getElementById("inputComment").value;
  let passwordInput = document.getElementById("inputPassword").value;
  let starInput = document.getElementById("inputStar").value;

  //유효성 검사
  if (starInput === "별점 선택") {
    alert("별점을 선택해주세요.");
    event.preventDefault();
    return;
  } else if (!nameInput) {
    alert("이름이 입력되지 않았습니다.");
    event.preventDefault();
    return;
  } else if (!passwordInput) {
    alert("비밀번호가 입력되지 않았습니다.");
    event.preventDefault();
    return;
  } else if (!commentInput) {
    alert("리뷰의 내용이 입력되지 않았습니다.");
    event.preventDefault();
    return;
  }

  let movieId = reviewButton.closest(".modalContent").id;
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
    comment: commentInput,
    star: starInput
  };

  movieComments.push(newComment);

  // 작성된 리뷰를 Local Storage에 저장
  localStorage.setItem(movieId, JSON.stringify(movieComments));
  alert("등록되었습니다.");
  closeModal();
}

// 리뷰 삭제 함수
function deleteReview(deleteButton) {
  let commentNow = deleteButton.closest(".comment");
  let movieId = deleteButton.closest(".modalContent").id;
  let movieComments = localStorage.getItem(movieId);
  movieComments = JSON.parse(movieComments);

  let commentId = deleteButton.parentNode.id;
  let commentToDelete = movieComments[commentId];

  let password = commentToDelete["password"];
  let pwCheck = prompt("비밀번호를 입력하세요.");

  if (password === pwCheck) {
    movieComments.splice(commentId, 1);
    commentNow.remove();
    // 삭제 상황을 Local Storage에 저장
    localStorage.setItem(movieId, JSON.stringify(movieComments));
    alert("삭제했습니다.");
  } else {
    alert("비밀번호가 다릅니다.");
  }
}

// 리뷰 수정 함수
function editReview(editButton) {
  let commentNow =
    editButton.closest(".comment").firstElementChild.firstElementChild;
  let movieId = editButton.closest(".modalContent").id;
  let movieComments = localStorage.getItem(movieId);
  movieComments = JSON.parse(movieComments);

  let commentId = editButton.parentNode.id;
  let commentToEdit = movieComments[commentId];

  let password = commentToEdit["password"];
  let pwCheck = prompt("비밀번호를 입력하세요.");

  if (password === pwCheck) {
    let newContent = prompt("수정할 내용을 입력하세요.");
    if (!newContent) {
      alert("내용이 입력되지 않았습니다.");
      event.preventDefault();
      return;
    }
    commentNow.innerHTML = `<p>${newContent}</p>`;
    commentToEdit["comment"] = newContent;
    // 수정 상황을 Local Storage에 저장
    localStorage.setItem(movieId, JSON.stringify(movieComments));
    alert("수정되었습니다.");
  } else {
    alert("비밀번호가 다릅니다.");
  }
}
