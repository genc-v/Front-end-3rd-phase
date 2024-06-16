import ImageManager from "../../javascript/classes/ImageManager.js";

if (document.referrer == "") {
  gsap.from(".navBar", {
    duration: 1.5,
    y: -300,
    ease: "Power2.easeInOut",
  });
  gsap.from(".headerInfoBar", {
    duration: 1.4,
    y: -100,
    ease: "Power2.easeInOut",
  });
  gsap.from(".moveUp", {
    duration: 1.5,
    y: "100vh",
    ease: "Power2.easeInOut",
    onComplete: function () {},
  });
}

let mobileMenuOpened = false;

var rightSideOfNavBar = document.getElementById("rightSideOfNavBar");

if (rightSideOfNavBar.style.transform === "translateX(0%)") {
  mobileMenuOpened = true;
} else {
  mobileMenuOpened = false;
}

document.getElementById("menuToggle").addEventListener("click", function () {
  if (mobileMenuOpened) {
    rightSideOfNavBar.style.transform = "translateX(300%)";
    document.querySelector(".menuLines").style.transform =
      "translateY(0) rotate(0)";
    document.querySelector(".menuLinesBottom").style.transform =
      "translateY(0) rotate(0)";
    mobileMenuOpened = false;
  } else {
    rightSideOfNavBar.style.transform = "translateX(0%)";
    document.querySelector(".menuLines").style.transform =
      "translateY(6px) rotate(35deg)";
    document.querySelector(".menuLinesBottom").style.transform =
      "translateY(-6px) rotate(-35deg)";
    mobileMenuOpened = true;
  }
});

window.addEventListener("resize", function () {
  var width = window.innerWidth;
  if (width > 1077) {
    rightSideOfNavBar.style.transform = "translateX(0%)";
    mobileMenuOpened = false;
  } else {
    rightSideOfNavBar.style.transform = "translateX(300%)";
    mobileMenuOpened = false;
    document.querySelector(".menuLines").style.transform =
      "translateY(0) rotate(0)";
    document.querySelector(".menuLinesBottom").style.transform =
      "translateY(0) rotate(0)";
  }
});

document.querySelector(".moveUp").style.height = "auto";
const container = document.getElementById("porfolioImages");

document.addEventListener("DOMContentLoaded", async () => {
  let last = 1;
  let numberOfImages = parseInt(localStorage.getItem("numberOfImages"), 10);

  if (isNaN(numberOfImages)) {
    numberOfImages = 3;
  }

  const container = document.getElementById("porfolioImages");
  const imageManager = new ImageManager(numberOfImages);
  await imageManager.fetchImages();

  imageManager.images.forEach((image) => {
    addCard(image.imageUrl);
  });

  document
    .querySelector(".image-container__moving-icon--right")
    .addEventListener("click", async () => {
      if (last > 1) {
        last--;
      }
      console.log(last);

      await imageManager.loadMoreImages(1);
      addCard(imageManager.images[numberOfImages].imageUrl, 1);
      localStorage.setItem("numberOfImages", numberOfImages++);
    });

  document
    .querySelector(".image-container__moving-icon--left")
    .addEventListener("click", async () => {
      if (numberOfImages > 1) {
        if (last < numberOfImages - 1) {
          removeCard();
        }
        removeCard();
        last++;
        console.log(last);
        console.log(imageManager.images);
        localStorage.setItem("numberOfImages", numberOfImages--);
      }
    });

  async function addCard(url, time = 0) {
    const imageCard = document.createElement("div");
    imageCard.classList.add("image-cotainer__item-show");

    imageCard.style.background = `url(${url})`;
    imageCard.style.backgroundSize = "cover";
    imageCard.style.backgroundPosition = "center";
    container.appendChild(imageCard);

    imageCard.innerHTML =
      '<a href="../portfolio/portfolio.html" style="width:70%; height: 100%;display: block;margin: auto"></a>';
    setTimeout(() => {
      imageCard.style.height = "100%";
    }, time);
  }

  async function removeCard() {
    if (container.children.length > 0) {
      const lastChild = container.children[container.children.length - last];
      lastChild.style.height = "0%";
    }
  }
});
