'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const nav = document.querySelector(`.nav`);

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// //////////////////////////////////////////////////////////

// Smooth Scrolling for Learn More // Tabbed Component >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

btnScrollTo.addEventListener('click', function (x) {
  const s1coords = section1.getBoundingClientRect();

  console.log(s1coords);
  console.log(x.target.getBoundingClientRect());

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Smooth Scrolling for Learn More // Tabbed Component >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  END

// Page Navigation Nav Buttons  more Transitions to Secion 1

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // parentElement is used, if we click on number it now directs to clicking the button
  // clostest finds the closest parent with class of operations tab
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Clear All active tabs first and then add it to the clicked one / remove active aclases
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));
  tabsContent.forEach(c => c.classList.remove(`operations__content--active`));
  clicked.classList.add(`operations__tab--active`);

  //  Active the content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

// Tabbed Component >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

// Nav Bar Fade effects

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const navClicked = e.target;
    const siblings = navClicked.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = navClicked.closest(`.nav`).querySelector('img');

    siblings.forEach(el => {
      if (el !== navClicked) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const navClicked = e.target;
    const siblings = navClicked.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = navClicked.closest(`.nav`).querySelector('img');

    siblings.forEach(el => {
      if (el !== navClicked) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

// Revealing Elements as scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replacing src with data src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener(`load`, function () {
    entry.target.classList.remove(`lazy-img`);
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `+200px`,
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const slides = document.querySelectorAll(`.slide`);
const btnLeft = document.querySelector(`.slider__btn--left`);
const btnRight = document.querySelector(`.slider__btn--right`);
const dotContainer = document.querySelector(`.dots`);

const maxSlide = slides.length;

let curSlide = 0;

// const slider = document.querySelector(`.slider`);
// slider.style.transform = `scale(0.2) translateX(-800px)`;
// slider.style.overflow = `visible`;

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class= "dots__dot" data-slide = "${index}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(`.dots__dot`)
    .forEach(dot => dot.classList.remove(`dots__dot--active`));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add(`dots__dot--active`);
};

slides.forEach(
  (s, index) => (s.style.transform = `translateX(${100 * index}%)`)
);

const goToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
  );
};

// Next Slide (right)
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// Prev Slide (Left)
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  createDots();
  goToSlide(0);
  activateDot(0);
};

init();

// Event Handlers
btnRight.addEventListener(`click`, nextSlide);

btnLeft.addEventListener(`click`, prevSlide);

document.addEventListener(`keydown`, function (e) {
  if (e.key === `ArrowLeft`) prevSlide();
  e.key === `ArrowRight` && nextSlide();
});

// Go to X slide with X dot click
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains(`dots__dot`)) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

// You sure you want to leave site?
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault;
//   console.log(e);
//   e.returnValue = ' ';
// });
