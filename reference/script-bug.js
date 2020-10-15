const content = document.querySelector('.scroll-content');
const display = document.querySelector('.display');
const baseUrl = 'https://source.unsplash.com/random';
let counter = 1;

if (content.addEventListener) {
  content.addEventListener('scroll', scroller, false);
} else if (content.attachEvent) {     
  content.attachEvent('onscroll', scroller);
}

function scroller() {
  const scrollHeight = content.scrollHeight;
  const scrollTop = content.scrollTop;
  const clientHeight = content.clientHeight;
  if (scrollHeight - scrollTop == clientHeight) {
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