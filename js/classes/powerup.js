import { gameObject } from "./gameObject.js";

/**
 * Clase que representa un Power-Up en el juego, heredada de `gameObject`.
 */
export class PowerUp extends gameObject {
  /**
   * Constructor de la clase PowerUp.
   * @param {number} row - Fila inicial del Power-Up en el mapa.
   * @param {number} col - Columna inicial del Power-Up en el mapa.
   */
  constructor(row, col) {
    super(row, col);
    this.active = false; // El Power-Up no está activo por defecto.
  }

  /**
   * Activa el Power-Up y le da al Pacman el poder especial.
   * @param {pacman} pacman - El personaje Pacman que recoge el Power-Up.
   */
  activate(pacman) {
    if (!this.active) { // Si el Power-Up no está activo
      console.log("Power-Up activado: 10 segundos para vencer a Drácula");
      this.active = true; // Se activa el Power-Up
      pacman.hasPowerUp = true; // Se agrega la propiedad `hasPowerUp` en Pacman para indicar que tiene el poder

      // Después de 10 segundos, desactiva el Power-Up y la propiedad `hasPowerUp` de Pacman.
      setTimeout(() => {
        this.active = false; // Desactiva el Power-Up
        pacman.hasPowerUp = false; // Desactiva el poder de Pacman después de 10 segundos
      }, 10000); // 10 segundos en milisegundos
    }
  }
}
