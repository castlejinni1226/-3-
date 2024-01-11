// 가져온 글: https://shin1303.tistory.com/entry/Vanilla-JS-Modal-%EC%B0%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0

const openButton = document.querySelector("button");
const modal = document.querySelector(".modal");
const closeButton = modal.querySelector("button");
const modalBackground = modal.querySelector(".modal__background");

function displayModal() {
  modal.classList.toggle("hidden");
}

openButton.addEventListener("click", displayModal);
closeButton.addEventListener("click", displayModal);
modalBackground.addEventListener("click", displayModal);
