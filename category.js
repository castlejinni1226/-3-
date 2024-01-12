// Add scrolling functionality
const containerDivs = document.querySelectorAll(".slider");
const nextDivs = document.querySelectorAll(".next");
const prevDivs = document.querySelectorAll(".prev");
let currentIndexs = [0, 0, 0];

for (let i = 0; i < containerDivs.length; i++) {
  nextDivs[i].addEventListener("click", () => {
    const container = containerDivs[i];
    if (currentIndexs[i] < container.children.length - 2) {
      currentIndexs[i] += 1;
      updateSlider(container, currentIndexs[i]);
    }
  });

  prevDivs[i].addEventListener("click", () => {
    const container = containerDivs[i];
    if (currentIndexs[i] > 0) {
      currentIndexs[i] -= 1;
      updateSlider(container, currentIndexs[i]);
    }
  })
}

// 슬라이더가 실행되도록 한다.
function updateSlider(container, currIndex) {
  const slideWidth = container.children[0].offsetWidth;
  const maxTranslateValue = slideWidth * (container.children.length - 2); // 특정 값
  const newTranslateValue = -currIndex * slideWidth * 4.5;
  if (Math.abs(newTranslateValue) < maxTranslateValue) {
    container.style.transform = `translateX(${newTranslateValue}px)`;
  }
}


function disableWheelClick() {
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
disableWheelClick();