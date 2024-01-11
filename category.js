// Add scrolling functionality
const container = document.querySelector(".slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let currentIndex = 0;
// 이전으로 가는 버튼 설정
prev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});
// 다음으로 가는 버튼 설정
next.addEventListener("click", () => {
  if (currentIndex < container.children.length - 2) {
    currentIndex++;
    updateSlider();
  }
});

// 슬라이더가 실행되도록 한다.
function updateSlider() {
  const slideWidth = container.children[0].offsetWidth;
  const maxTranslateValue = slideWidth * (container.children.length - 2); // 특정 값

  const newTranslateValue = -currentIndex * slideWidth * 2;

  if (Math.abs(newTranslateValue) < maxTranslateValue) {
    container.style.transform = `translateX(${newTranslateValue}px)`;
  } else {
    // 슬라이딩 진행하지 않게 하는 코드
    console.log("Sliding stopped!");
  }
}
