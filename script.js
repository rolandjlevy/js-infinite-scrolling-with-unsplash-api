const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  return element;
}

const $ = (selector) => document.querySelector(selector);
const tolerance = 10;
let counter = 0;
$('#year').textContent = new Date().getFullYear();

if ($(".wrapper").addEventListener) { 
  $(".wrapper").addEventListener("scroll", scroller, false);
} else if ($(".wrapper").attachEvent) {
  $(".wrapper").attachEvent("onscroll", scroller);
}

function scroller() {
  if ($(".wrapper").scrollTop + $(".wrapper").offsetHeight + tolerance > $('.scroll-content').offsetHeight) {
    $(".loading").textContent = `Loading...`;
    fetchRandomImage().then(randomImg => {
      generateImage(randomImg.url);
      getMessages();
    }).catch(err => {
      console.log('Error', err);
    });
  }
}

function fetchRandomImage() {
  const baseUrl = 'https://source.unsplash.com/random';
  const randomNum = Math.floor(Math.random() * 10000);
  const url = `${baseUrl}/${randomNum}`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}

function generateImage(src) {
  counter++;
  const img = createElement('img');
  img.src = `${src}&w=450&h=600&q=50&dpr=1`;
  img.setAttribute('data-src', src);
  const div = createElement('div');
  div.classList.add('img-wrapper');
  div.appendChild(img);
  div.addEventListener('click', (e) => {
    open(e.target.dataset.src, '_blank');
  });
  $('.scroll-content').appendChild(div);
}

function getMessages() {
  const scrollTop = Math.round($(".wrapper").scrollTop).toLocaleString();
  const offsetHeight = Math.round($('.scroll-content').offsetHeight).toLocaleString();
  $(".data").innerHTML = `If scrollTop (${scrollTop}px) + frame height (${$(".wrapper").offsetHeight}px) + tolerance (${tolerance}px) > inner content (${offsetHeight}px) then load next image`;
  $(".count").textContent = `Image count: ${counter}`;
  $(".loading").textContent = `All loaded`;
}

document.addEventListener('DOMContentLoaded', (e) => {
  fetchRandomImage().then(randomImg => {
    generateImage(randomImg.url);
    getMessages();
  }).catch(err => {
    console.log('Error', err);
  });
});