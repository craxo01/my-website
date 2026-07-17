'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav_link = document.querySelectorAll('.nav__link');
const nav__links = document.querySelector('.nav__links');
const nav_tab = document.querySelector('.operations');
const nav = document.querySelector('.nav');
const operations__tab = document.querySelectorAll('.operations__tab');
const operations__content = document.querySelectorAll('.operations__content');
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
////////////////////////////////////////
btnscrollto.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////scroll-header-site-Method-1////////////////////
/*nav_link.forEach(function(el){
  el.addEventListener('click',function(e){
    e.preventDefault();
    const id=el.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior : 'smooth'})
  })
})*/
//////////////////scroll-header-site-Method-2////////////////////

nav__links.addEventListener('click', function (e) {
  if (!link.classList.contains('nav__link')) return;

  const href = link.getAttribute('href');
  if (href.startsWith('#')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
////////////////// nav_tab /////////////////////
nav_tab.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  operations__tab.forEach(function (el) {
    el.classList.remove('operations__tab--active');
  });
  operations__content.forEach(function (el) {
    el.classList.remove('operations__content--active');
  });
  if (clicked.classList.contains('operations__tab')) {
    clicked.classList.add('operations__tab--active');
    const x = document.querySelector(
      `.operations__content--${clicked.dataset.tab}`,
    );
    x.classList.add('operations__content--active');
  }
});
//////////////// hover-nav-header //////////////

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibil = link.closest('.nav').querySelectorAll('.nav__link');
    sibil.forEach(element => {
      element.style.opacity = 0.5;
    });
    e.target.style.opacity = 1;
  }
});
///////////////
nav.addEventListener('mouseout', function (e) {
  nav_link.forEach(element => {
    element.style.opacity = 1;
  });
});
//////////////////fixed-nav///////////////////////
const header = document.querySelector('.header');
const navhight = nav.getBoundingClientRect().height;
const sticky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headeroberve = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navhight}px`,
});
headeroberve.observe(header);

///////////////// effect-section ////////////////
const sections = document.querySelectorAll('.section');
const secop = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const secobserve = new IntersectionObserver(secop, {
  root: null,
  threshold: 0.15,
});
sections.forEach(function (el) {
  secobserve.observe(el);
  ///el.classList.add('section--hidden');
});
//////////////// img-op //////////////////////
const imgorg = document.querySelectorAll('.features img');
const imgop = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('lazy-img');
  const id = entry.target.dataset.src;
  entry.target.setAttribute('src', id);
  observer.unobserve(entry.target);
};
const imgobserve = new IntersectionObserver(imgop, {
  root: null,
  threshold: 0.15,
});
imgorg.forEach(function (el) {
  imgobserve.observe(el);
});
/////////////////// slider //////////////////////
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');
const containerdots = document.querySelector('.dots');

let currentslide = 0;
const maxslide = slides.length;
///////////
const creatdot = function () {
  slides.forEach(function (_, i) {
    containerdots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`,
    );
  });
};
creatdot();
containerdots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    currentslide = Number(e.target.dataset.slide);
    slidecalc(currentslide);
    activateDot(currentslide);
  }
});
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
//////slide/////////
let timer;
function shima() {
  timer = setTimeout(function (e) {
    slideright(currentslide);
    shima();
  }, 4000);
}
const slidecalc = function (params) {
  slides.forEach(function (mov, i) {
    mov.style.transform = `translateX(${100 * (i - params)}%)`;
  });
  activateDot(params);
};
shima();
slidecalc(0);

const slideright = function () {
  if (currentslide === maxslide - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }
  slidecalc(currentslide);
};
const slideleft = function () {
  if (currentslide === 0) {
    currentslide = maxslide - 1;
  } else {
    currentslide--;
  }
  slidecalc(currentslide);
};
btnright.addEventListener('click', function () {
  slideright();
  clearTimeout(timer);
  shima();
});
btnleft.addEventListener('click', function () {
  slideleft()
   clearTimeout(timer);
  shima();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    slideright();
    clearTimeout(timer);
    shima();
  }
  if (e.key === 'ArrowLeft') {
    slideleft();
    clearTimeout(timer);
    shima();
  }
});
////////////////
