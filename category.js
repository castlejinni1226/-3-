// Add scrolling functionality
const container = document.querySelector(".slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let currentIndex = 0;

prev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

next.addEventListener("click", () => {
  if (currentIndex < container.children.length - 2) {
    currentIndex++;
    updateSlider();
  }
});

function updateSlider() {
  const slideWidth = container.children[0].offsetWidth;
  const maxTranslateValue = slideWidth * (container.children.length - 2); // 특정 값

  const newTranslateValue = -currentIndex * slideWidth * 2;

  if (Math.abs(newTranslateValue) < maxTranslateValue) {
    container.style.transform = `translateX(${newTranslateValue}px)`;
  } else {
    // 특정 조건을 만족하면 더 이상 슬라이딩을 진행하지 않도록 할 수 있습니다.
    console.log("Sliding stopped!");
  }
}
