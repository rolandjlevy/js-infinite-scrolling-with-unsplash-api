const content = document.querySelector('.scroll-content');
const wrapper = document.querySelector(".wrapper");
const data = document.querySelector(".data");
const baseUrl = 'https://source.unsplash.com/random';
const tolerance = 10;
let counter = 1;

if (wrapper.addEventListener) { 
  wrapper.addEventListener("scroll", scroller, false);
} else if (wrapper.attachEvent) {
  wrapper.attachEvent("onscroll", scroller);
}

function scroller() {
  data.innerHTML = `When scrollTop (${wrapper.scrollTop}) + frame height (${wrapper.offsetHeight}) + tolerance (${tolerance}) > inner content (${content.offsetHeight}) then load next image`;
  if (wrapper.scrollTop + wrapper.offsetHeight + tolerance > content.offsetHeight) {
    fetchRandomImage().then(randomImg => {
      generateImage(randomImg.url);
    }).catch(err => {
      console.log('Error', err);
    });
  }
}

function fetchRandomImage() {
  const randomNum = Math.floor(Math.random() * 10000);
  const url = `${baseUrl}/${randomNum}`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}

function generateImage(src) {
  const img = document.createElement('img');
  img.src = `${src}&w=400&q=50&dpr=1`;
  const div = document.createElement('div');
  div.classList.add('img-wrapper');
  div.appendChild(img);
  content.appendChild(div);
}

fetchRandomImage().then(randomImg => {
  generateImage(randomImg.url);
}).catch(err => {
  console.log('Error', err);
});
