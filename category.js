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

function DisableWheelClick() {
  // 특정 컨테이너 요소를 선택합니다. 아래는 ID가 'yourContainerId'인 경우입니다.
  const container = document.querySelector(".slider");

  // mousedown 이벤트를 추가하여 마우스 휠 클릭을 막습니다.
  container.addEventListener("mousedown", function (event) {
    if (event.button === 1) {
      // 마우스 휠 클릭 버튼은 1입니다.
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

// 함수 호출
DisableWheelClick();

// topButton
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  ScrollFunction();
};

function ScrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
