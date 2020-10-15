const content = document.querySelector('.scroll-content');
const wrapper = document.querySelector(".wrapper");
const data = document.querySelector(".data");
const count = document.querySelector(".count");
const baseUrl = 'https://source.unsplash.com/random';
const tolerance = 10;
let counter = 0;

if (wrapper.addEventListener) { 
  wrapper.addEventListener("scroll", scroller, false);
} else if (wrapper.attachEvent) {
  wrapper.attachEvent("onscroll", scroller);
}

function scroller() {
  getMessages();
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
  counter++;
  const img = document.createElement('img');
  img.src = `${src}&w=400&q=50&dpr=1`;
  const div = document.createElement('div');
  div.classList.add('img-wrapper');
  div.appendChild(img);
  content.appendChild(div);
}

fetchRandomImage().then(randomImg => {
  generateImage(randomImg.url);
  getMessages();
}).catch(err => {
  console.log('Error', err);
});

function getMessages() {
  const scrollTop = Math.round(wrapper.scrollTop).toLocaleString();
  const offsetHeight = Math.round(content.offsetHeight).toLocaleString();
  data.innerHTML = `If scrollTop (${scrollTop}px) + frame height (${wrapper.offsetHeight}px) + tolerance (${tolerance}px) > inner content (${offsetHeight}px) then load next image`;
  count.innerHTML = `Image count: ${counter}`
}
