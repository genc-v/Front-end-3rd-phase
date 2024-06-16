class ImageManager {
  constructor(imageCount = 10) {
    this.imageCount = imageCount;
    this.images = [];
  }

  async fetchImages() {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?limit=${this.imageCount}`
      );
      const data = await response.json();
      this.images = data.map((image) => ({
        imageUrl: `https://picsum.photos/id/${image.id}/2000/2000`,
        creator: image.author,
      }));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }
  async fetchCards() {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?limit=${this.imageCount}`
      );
      const data = await response.json();
      this.images = data.map((image) => ({
        imageUrl: `https://picsum.photos/id/${image.id}/2000/2000`,
        creator: image.author,
      }));
      this.displayImages();
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  displayImages() {
    const portfolioImages = document.getElementById("porfolioImages");

    portfolioImages.innerHTML = "";

    this.images.forEach((image) => {
      const imageHtml = `
                <div class="imageShowcase" style="background: url('${
                  image.imageUrl
                }') center; background-size: cover;">
                    <i class="fa-solid fa-link"></i>
                    <p class="nameImage">${
                      image.creator ? image.creator : "Unknown"
                    }</p>
                </div>`;
      portfolioImages.innerHTML += imageHtml;
    });
  }

  loadMoreImages(addMore) {
    this.imageCount += addMore;
    this.fetchImages();
  }
  loadLessImages(addLess) {
    this.imageCount -= addLess;
    this.fetchImages();
  }
  loadMoreCards(addMore) {
    this.imageCount += addMore;
    this.fetchCards();
  }
  loadLessCards(addLess) {
    this.imageCount -= addLess;
    this.fetchCards();
  }
}

export default ImageManager;
