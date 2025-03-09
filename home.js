let currentIndex = 0; // Index to track the current image

const images = document.querySelectorAll('.hero-image');
const totalImages = images.length;

function changeImage(direction) {
    currentIndex += direction;

    // If currentIndex exceeds the range, reset it to the first or last image
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    } else if (currentIndex >= totalImages) {
        currentIndex = 0;
    }

    // Move the hero images container to the corresponding image
    const heroImagesContainer = document.querySelector('.hero-images');
    const imageWidth = images[0].offsetWidth;
    heroImagesContainer.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Optional: Automatic sliding every 5 seconds
setInterval(() => {
    changeImage(1);
}, 5000);
