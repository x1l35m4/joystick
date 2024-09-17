class Button {
  constructor(id, nome, dataKey, htmlElement) {
    this.id = id;
    this.nome = nome;
    this.active = false;
    this.htmlElement = htmlElement;
    this.dataKey = dataKey;
  }
}

class Buttons {
  constructor() {
    this.btnCenter = new Button(1, "btnCenter", "center", null);
    this.btnLeft = new Button(2, "btnLeft", "left", null);
    this.btnRight = new Button(3, "btnRigth", "right", null);
    this.btnUp = new Button(4, "btnUp", "up", null);
    this.btnDown = new Button(5, "btnDown", "down", null);
    this.btnA = new Button(6, "btnA", "a", null);
    this.btnB = new Button(7, "btnB", "b", null);
  }
}

export default class Joy extends Buttons {
  static id = 0;
  static group = [];
  constructor(px = 0, py = 0) {
    super();
    this.container = null;
    this.htmlElementJoy = null;
    this.htmlElementButtons = [];
    this.id = Joy.idGenereted();
    this.px = px;
    this.py = py;

    this.load();
  }

  load() {
    Joy.configTouchInTheStart();
    this.createJoyElement();
  }

  createJoyElement() {
    const joy = document.createElement("div");
    joy.id = `joy${this.id}`;
    joy.classList.add(`joy`);
    this.container = document.querySelector('#area');
    joy.innerHTML = this.htmlGenerated();

    this.container.appendChild(joy)

    this.htmlElementJoy = document.querySelector(`#joy${this.id}`);
    this.htmlElementButtons = this.htmlElementJoy.querySelectorAll("[data-key]");
    //this.bindJoyEvents();
    this.positionJoy();
    this.mapearBotaoComHTML()
  }

  bindJoyEvents() {
    this.htmlElementButtons.forEach((button) => {

      button.addEventListener("touchmove", (evt) => {
        evt.preventDefault();
        evt.target.classList.add("active")
      });

      button.addEventListener("touchend", (evt) => {
        evt.preventDefault();
        evt.target.classList.remove("active")
      });

    })
  }

  movePositionJoy(px = 0, py = 0) {
    this.px = px;
    this.py = py;
    this.positionJoy();
  }

  positionJoy() {
    this.htmlElementJoy.style.left = this.px + "px";
    this.htmlElementJoy.style.bottom = this.py + "px";
  }

  htmlGenerated() {
    return /*HTML*/ `
      <div class="dpad">
        <input class="btn btnD key-up key-img-config" type="button" value="" data-key="up">
        <div class="left-right-key">
         <input class="btn btnD key-left key-img-config" type="button" value="" data-key="left">
         <input class="btn btnD key-center key-img-config" type="button" value="" data-key="center">
         <input class="btn btnD key-right key-img-config" type="button" value="" data-key="right">
        </div>
        <input class="btn btnD key-down key-img-config" type="button" value="" data-key="down">
      </div>
      <div class="btns">
        <input class="btn btnD key-a key-img-config" type="button" value="" data-key="a">
        <input class="btn btnD key-b key-img-config" type="button" value="" data-key="b">
      </div>
    `;
  }

  mapearBotaoComHTML() {
    const objButtons = [
      this.btnCenter,
      this.btnLeft,
      this.btnRight,
      this.btnUp,
      this.btnDown,
      this.btnA,
      this.btnB,
    ];

    objButtons.forEach((btn) => {
      for (let htmlBtn of this.htmlElementButtons) {
        const inputDataKey = htmlBtn.getAttribute("data-key");
        if (btn.dataKey === inputDataKey) {
          btn.htmlElement = htmlBtn;
          if (btn.htmlElement !== null) {
            btn.htmlElement.addEventListener("touchstart", (evt) => {
              btn.active = true;
              evt.target.classList.add("active");
            })

            btn.htmlElement.addEventListener("touchend", (evt) => {
              btn.active = false;
              evt.target.classList.remove("active");
            })
          }
        }
      }
    })

  }

  static configTouchInTheStart() {
    if (this.isTouchListenerConfigured === undefined) {
      this.isTouchListenerConfigured = false;
    }
    const preventDefault = (event) => event.preventDefault();

    const preventDefaultIf = (event) => {
      if (event.touches.length > 1) event.preventDefault()
    };

    if (!this.isTouchListenerConfigured) {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("touchstart", preventDefaultIf, { passive: false });

      // Impede o menu de contexto ao segurar toque
      document.addEventListener("contextmenu", preventDefault);
      // Para dispositivos móveis, impede o toque prolongado
      document.addEventListener("touchstart", preventDefaultIf, { passive: false });
      
      this.isTouchListenerConfigured = true;
    }
  }

  static idGenereted() {
    if (!this.id) this.id = 0;
    return this.id++;
  }

  static addNew(px, py) {
    Joy.group.push(new this(px, py))
  }
}





// // Impede o menu de contexto ao segurar toque
// document.addEventListener('contextmenu', (event) => {
//   event.preventDefault();
// });

// // Para dispositivos móveis, impede o toque prolongado
// document.addEventListener('touchstart', (event) => {
//   if (event.touches.length > 1) {
//     event.preventDefault();
//   }
// }, { passive: false });