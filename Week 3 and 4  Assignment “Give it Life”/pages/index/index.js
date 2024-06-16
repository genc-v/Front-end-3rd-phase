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

document.addEventListener("DOMContentLoaded", async () => {
  let numberOfImages = parseInt(localStorage.getItem("numberOfImages"), 10);

  if (isNaN(numberOfImages)) {
    numberOfImages = 3;
  }

  const imageManager = new ImageManager(numberOfImages);
  await imageManager.fetchImages();

  const overlay = document.querySelector(".image-container__overlay-of-images");
  const wrapper = document.querySelector(".image-container__image-wrapper");
  const images = document.querySelectorAll(".imageShowcase");
  const length = 60;

  // Apply width to all images initially
  images.forEach((image) => {
    image.style.width = `${length}px`;
  });

  let position = numberOfImages;
  wrapper.style.transform = `translateX(-${length * position}rem)`;

  document
    .querySelector(".image-container__moving-icon--right")
    .addEventListener("click", async () => {
      await imageManager.loadMoreImages(1);
      localStorage.setItem("numberOfImages", ++numberOfImages);
      wrapper.style.transform = `translateX(-${length * ++position}rem)`;
      // Reapply width in case styles are altered during loading
      images.forEach((image) => {
        image.style.width = `${length}rem`;
      });
    });

  document
    .querySelector(".image-container__moving-icon--left")
    .addEventListener("click", () => {
      if (position > 0) {
        localStorage.setItem("numberOfImages", --numberOfImages);
        wrapper.style.transform = `translateX(-${length * --position}rem)`;
        // Reapply width in case styles are altered during loading
        images.forEach((image) => {
          image.style.width = `${length}rem`;
        });
      }
    });
});
