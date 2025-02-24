import {IMAGE_SIZE} from '../sketch.js';

export class gameObject{
  constructor(row, col) {
    this.rowNumber = row;
    this.columnNumber = col;
    this.coordXPixels = row * IMAGE_SIZE;
    this.coordYPixels = col * IMAGE_SIZE;
  }

  showObject(img){
    if(this.coordXPixels == null || this.coordYPixels == null){
      this.coordYPixels = this.rowNumber * IMAGE_SIZE;
      this.coordXPixels = this.columnNumber * IMAGE_SIZE;
    }
    image(img, this.coordXPixels, this.coordYPixels);
  }
}
