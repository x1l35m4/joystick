import Joy from './Joy.js';
import Player from './Player.js';


// Impede o menu de contexto ao segurar toque
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// Para dispositivos móveis, impede o toque prolongado
document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')


console.log(ctx)
Joy.addNew(0, 0);

Player.addNew("hero", 100, 100, 16, 16, Joy.group[0])



function loop() {
  update();

  window.requestAnimationFrame(loop)
}

function update() {
  ctxClear();
  Player.group.forEach(player => {
    player.update();
    draw(player);
  })
}

function draw(obj) {
  ctx.fillRect(obj.px, obj.py, obj.w, obj.h)
}

function ctxClear() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
}

loop();