import ImageManager from "../../javascript/classes/ImageManager.js";


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
    onComplete: function () {
      // Change CSS after animation completes
    },
  });
}

document.querySelector(".moveUp").style.height = "auto";

document.addEventListener("DOMContentLoaded", () => {
  const targetElement = document.getElementById("load-more");

  if (targetElement) {
    setTimeout(function () {
      targetElement.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 500);
  }

  let numberOfImages = localStorage.getItem("numberOfImages");
  let numberOfImagesParsed = parseInt(numberOfImages, 10);
  if (isNaN(numberOfImagesParsed)) {
    console.error("Failed to retrieve a valid integer from localStorage");
    numberOfImagesParsed = 0;
  }

  let imagesDisplayedOnPortfolio = numberOfImagesParsed;
  let imageManager;
  if (numberOfImagesParsed < 4) {
    imageManager = new ImageManager(4);
    imagesDisplayedOnPortfolio = 4;
  } else {
    imageManager = new ImageManager(numberOfImagesParsed);
  }
  imageManager.fetchImages();

  document.getElementById("load-more").addEventListener("click", () => {
    if (imagesDisplayedOnPortfolio % 4 != 0) {
      let temp = ((imagesDisplayedOnPortfolio % 4) - 4) * -1 + 4;
      imagesDisplayedOnPortfolio += temp;
      imageManager.loadMoreImages(temp);
    } else {
      imageManager.loadMoreImages(8);
    }
  });

  document.getElementById("jump-to-top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
