import { gameObject } from "./gameObject.js";
import { IMAGE_SIZE, restartGame, WIDTH_CANVAS } from "../sketch.js";
import { HEIGHT_CANVAS } from "../sketch.js";
import { Food } from "./food.js";

/**
 * Clase que representa al personaje Pacman, heredando de `gameObject`.
 */
export class pacman extends gameObject {
  /**
   * Constructor de la clase Pacman.
   * @param {number} row - Fila inicial de Pacman en el mapa.
   * @param {number} col - Columna inicial de Pacman en el mapa.
   */
  constructor(row, col) {
    super(row, col);
    this.direction = 1; // Dirección inicial de Pacman: 1 -> derecha, 2 -> abajo, 3 -> izquierda, 4 -> arriba
    this.scorePacman = 0; // Puntuación inicial de Pacman
    this.speedPacman = 32; // Velocidad de Pacman, igual al tamaño de la imagen (32px)
    this.widthCanvasPacman = 750; // Ancho del canvas del juego
    this.pacmanDiameter = 32; // Diámetro de Pacman, igual al tamaño de la imagen
  }

  /**
   * Mueve a Pacman hacia la derecha.
   * @returns {void}
   */
  moveRight() {
    let temp = this.coordXPixels + this.speedPacman;
    if (temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter) {
      console.log("No puedo moverme a la derecha");
      return;
    } else {
      this.direction = 1;
      this.coordXPixels = temp; // Actualiza la posición horizontal de Pacman
    }
  }

  /**
   * Mueve a Pacman hacia la izquierda.
   * @returns {void}
   */
  moveLeft() {
    let temp = this.coordXPixels - this.speedPacman;
    if (temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter) {
      console.log("No puedo moverme a la izquierda");
      return;
    } else {
      this.direction = 3;
      this.coordXPixels = temp; // Actualiza la posición horizontal de Pacman
    }
  }

  /**
   * Mueve a Pacman hacia arriba.
   * @returns {void}
   */
  moveUp() {
    let temp = this.coordYPixels - this.speedPacman;
    if (temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter) {
      console.log("No puedo moverme arriba");
      return;
    } else {
      this.direction = 4;
      this.coordYPixels = temp; // Actualiza la posición vertical de Pacman
    }
  }

  /**
   * Mueve a Pacman hacia abajo.
   * @returns {void}
   */
  moveDown() {
    let temp = this.coordYPixels + this.speedPacman;
    if (temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter) {
      console.log("No puedo moverme abajo");
      return;
    } else {
      this.direction = 2;
      this.coordYPixels = temp; // Actualiza la posición vertical de Pacman
    }
  }

  /**
   * Detecta si Pacman ha colisionado con un objeto de tipo `Food`.
   * @param {Food} Food - Instancia de un objeto de comida.
   * @returns {boolean} `true` si hay colisión, `false` si no.
   */
  testCollideFood(Food) {
    if (this.coordXPixels == Food.coordXPixels && this.coordYPixels == Food.coordYPixels) {
      console.log("Colisión detectada con la comida");
      return true; // Retorna verdadero si hay colisión con la comida
    }
    return false; // Si no hay colisión, retorna falso
  }

  /**
   * Detecta si Pacman ha colisionado con una roca.
   * @param {gameObject} roca - Instancia de una roca.
   * @returns {void}
   */
  testCollideRock(roca) {
    let distancia = dist(this.coordXPixels, this.coordYPixels, roca.coordXPixels, roca.coordYPixels);
    if (distancia < IMAGE_SIZE) {
      this.pacmanlives--; // Resta una vida si colisiona con una roca
      this.spawnPacman(); // Restaura la posición de Pacman
    }
  }

  /**
   * Detecta si Pacman ha colisionado con un zombie.
   * @param {gameObject} zombie - Instancia de un zombie.
   * @returns {void}
   */
  testCollideZombie(zombie) {
    let distancia = dist(this.coordXPixels, this.coordYPixels, zombie.coordXPixels, zombie.coordYPixels);
    if (distancia < IMAGE_SIZE) {
      alert("Has perdido, te comió el zombie");
      this.pacmanlives--; // Resta una vida si Pacman es atrapado por un zombie
      restartGame(); // Reinicia el juego si Pacman muere
    }
  }

  /**
   * Detecta si Pacman ha colisionado con un Power-Up.
   * @param {PowerUp} powup - Instancia de un Power-Up.
   * @returns {boolean} `true` si hay colisión, `false` si no.
   */
  testCollidePowup(powup) {
    if (this.coordXPixels == powup.coordXPixels && this.coordYPixels == powup.coordYPixels) {
      console.log("Colisión con Power-Up detectada");
      powup.activate(this); // Activa el Power-Up
      return true; // Retorna verdadero si Pacman recoge el Power-Up
    }
    return false; // Si no hay colisión, retorna falso
  }

  /**
   * Detecta si Pacman ha colisionado con Drácula.
   * @param {gameObject} dracula - Instancia de Drácula.
   * @returns {boolean} `true` si hay colisión, `false` si no.
   */
  testCollideDracula(dracula) {
    if (this.coordXPixels == dracula.coordXPixels && this.coordYPixels == dracula.coordYPixels) {
      console.log("Colisión detectada con Drácula");
      return true; // Retorna verdadero si hay colisión con Drácula
    }
    return false; // Si no hay colisión, retorna falso
  }

  /**
   * Restaura la posición de Pacman después de perder una vida.
   * Coloca a Pacman en la posición inicial.
   * @returns {void}
   */
  spawnPacman() {
    this.coordXPixels = 2 * IMAGE_SIZE;
    this.coordYPixels = 5 * IMAGE_SIZE;
  }
}
