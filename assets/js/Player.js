import Entity from "./Entity.js"
  

export default class Player extends Entity {
  static id = 0;
  static group = [];
  constructor(name, px, py, w, h, joy) {
    super( name, px, py, w, h)
    this.joy = joy;
    
  }
  
  update(){
    if(this.joy.btnLeft.active){
      this.vx = -0.5;
    } else if(this.joy.btnRight.active) {
      this.vx = 0.5;
    }else{
      this.vx = 0;
    }
    
    if(this.joy.btnUp.active){
      this.vy = -0.5;
    } else if(this.joy.btnDown.active) {
      this.vy = 0.5;
    }else{
      this.vy = 0;
    }
    
    this.px += this.vx;
    this.py += this.vy;
  }
  
  static addNew(name, px, py, w, h, joy) {
    this.group.push(new this(name, px, py, w, h, joy))
  }
}