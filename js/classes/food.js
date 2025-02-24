import {gameObject} from "./gameObject.js";

export class Food extends gameObject {
  constructor(row, col) {
    super(row, col);
    this.pointsFood=5;
  }
}
