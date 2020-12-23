const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const moveAmount = 10;

const { width, height } = canvas;

// create random staring points x and y
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = moveAmount;

let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
ctx.beginPath(); // start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// drawing function
function draw({ key }) {
  // increment the hue (color)
  hue += 5;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  console.log(key);
  // start path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x y values
  switch (key) {
    case 'ArrowUp':
      y -= moveAmount;
      break;
    case 'ArrowRight':
      x += moveAmount;
      break;
    case 'ArrowDown':
      y += moveAmount;
      break;
    case 'ArrowLeft':
      x -= moveAmount;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function () {
      console.log('shake finished!');
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
