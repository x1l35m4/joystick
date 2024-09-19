import entityDefaultVars from "./entityDefaultVars.js";

export default class Entity {
  static id = 0;
  static group = [];
  constructor(name, px, py, w, h) {
    this.id = 0;
    this.name = name;
    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;
    this.vx=0;
    this.vy=0;
    this.velMax= entityDefaultVars.maxSpeedClassA;
    this.load();
  }
  
  load(){
    
  }
  
  update(){
    this.px+=this.vx;
    this.py+=this.vy;
  }

  static idGenereted() {
    if (!this.id) this.id = 0;
    return this.id++;
  }

  static addNew(name, px, py, w, h) {
    this.group.push(new this(name, px, py, w, h))
  }

}