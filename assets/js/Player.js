import Entity from "./Entity.js"

export default class Player extends Entity {
  static id = 0;
  static group = [];
  constructor(name, px, py, w, h, joy) {
    super( name, px, py, w, h)
    this.joy = joy;
  }
  
  update(){
    this.vx = this.joy.btnLeft.active ? -1 : this.joy.btnRight.active ? 1 : 0;
    this.vy = this.joy.btnUp.active ? -1 : this.joy.btnDown.active ? 1 : 0;
    
    this.px += this.velMax * this.vx;
    this.py += this.velMax * this.vy;
  }
  
  static addNew(name, px, py, w, h, joy) {
    this.group.push(new this(name, px, py, w, h, joy))
  }
}