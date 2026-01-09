const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;
const visibleSlides = 3;

function setSlideHeights() {
  // Reset heights first
  slides.forEach(slide => slide.style.height = 'auto');

  // Calculate max height among visible slides
  const slideWidth = slides[0].getBoundingClientRect().width + 16; // include gap
  const visible = slides.slice(index, index + visibleSlides);
  const maxHeight = Math.max(...visible.map(slide => slide.offsetHeight));

  // Set all visible slides to the max height
  visible.forEach(slide => slide.style.height = maxHeight + 'px');

  // Keep track moving
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  if (index > 0) index--;
  else index = slides.length - visibleSlides; // loop
  setSlideHeights();
});

nextBtn.addEventListener('click', () => {
  if (index < slides.length - visibleSlides) index++;
  else index = 0; // loop
  setSlideHeights();
});

// initialize on load and on window resize
window.addEventListener('resize', setSlideHeights);
setSlideHeights();


