document.querySelectorAll('.carousel-container').forEach(container => {
  const track = container.querySelector('.carousel-track');
  const slides = Array.from(track.children);

  const prevBtn = container.parentElement.querySelector('.carousel-btn.prev');
  const nextBtn = container.parentElement.querySelector('.carousel-btn.next');

  let index = 0;
  const visibleSlides = parseInt(track.dataset.visibleSlides, 10) || 3;
  track.style.setProperty('--visible-slides', visibleSlides);

  function setSlideHeights() {
    slides.forEach(slide => slide.style.height = 'auto');

    const slideWidth =
      slides[0].getBoundingClientRect().width +
      parseFloat(getComputedStyle(track).columnGap || 0);

    const visible = slides.slice(index, index + visibleSlides);
    const maxHeight = Math.max(...visible.map(slide => slide.offsetHeight));

    visible.forEach(slide => slide.style.height = `${maxHeight}px`);
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    index = index > 0 ? index - 1 : slides.length - visibleSlides;
    setSlideHeights();
  });

  nextBtn.addEventListener('click', () => {
    index = index < slides.length - visibleSlides ? index + 1 : 0;
    setSlideHeights();
  });

  window.addEventListener('resize', setSlideHeights);
  setSlideHeights();
});

