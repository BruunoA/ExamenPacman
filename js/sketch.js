import { gameObject } from "./classes/gameObject.js";
import { pacman } from "./classes/pacman.js";
import { Food } from "./classes/food.js";
import { PowerUp } from "./classes/powerup.js";

/**
 * Mapa del juego representado como una matriz. 
 * Cada número representa un tipo de objeto:
 * 1: roca, 2: comida, 3: power-up, 4: zombie, 5: drácula, 0: pacman.
 */
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 4, 4, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 1, 2, 1, 5, 1],
  [1, 0, 2, 2, 3, 2, 2, 1, 1, 1],
  [1, 3, 2, 1, 1, 1, 3, 2, 2, 1], 
  [1, 4, 2, 1, 4, 4, 3, 1, 4, 1],
  [1, 1, 4, 1, 1, 4, 1, 4, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const ROWS = 10;  // Número de filas del mapa
const COLS = 10;  // Número de columnas del mapa
const extra_size = 300;  // Espacio extra en el canvas para el marcador
export const IMAGE_SIZE = 32;  // Tamaño de cada imagen del objeto
export const WIDTH_CANVAS = COLS * IMAGE_SIZE;  // Ancho total del canvas
export const HEIGHT_CANVAS = ROWS * IMAGE_SIZE;  // Alto total del canvas

// Declaración de las imágenes y arrays para los objetos del juego
let imgRock;
const arrRocks = [];
let imgFood;
const arrFood = [];
let imgZombie;
const arrZombies = [];
let imgDracula;
let dracula = null; 
let imgPowup;
let powerUp = null; 
let imgPacmanUP, imgPacmanDOWN, imgPacmanLEFT, imgPacmanRIGHT;
let myPacman;

let numberImageLoaded = 0;  // Contador de imágenes cargadas
let startTimeGame = 0;  // Tiempo de inicio del juego
let timer = 0;  // Temporizador del juego

/**
 * Precarga las imágenes necesarias para los objetos del juego.
 */
function preload() {
  imgRock = loadImage("img/roca.png", handleImage, handleError);
  imgFood = loadImage("img/ajo.png", handleImage, handleError);
  imgZombie = loadImage("img/zombie.png", handleImage, handleError);
  imgDracula = loadImage("img/dracula.png", handleImage, handleError);
  imgPacmanRIGHT = loadImage("img/prota_right.png", handleImage, handleError);
  imgPacmanDOWN = loadImage("img/prota_down.png", handleImage, handleError);
  imgPacmanLEFT = loadImage("img/prota_left.png", handleImage, handleError);
  imgPacmanUP = loadImage("img/prota_up.png", handleImage, handleError);
  imgPowup = loadImage("img/agua.png", handleImage, handleError);
}

/**
 * Función que maneja los errores al cargar una imagen.
 */
function handleError() {
  console.log("Error loading image");
}

/**
 * Función que se llama al cargar una imagen correctamente.
 */
function handleImage() {
  console.log("Image loaded");
  numberImageLoaded++;  // Incrementa el contador de imágenes cargadas
}

/**
 * Configuración inicial del juego: crea los objetos en el mapa.
 */
function setup() {
  createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS + extra_size).parent("sketch-pacman");

  // Carga los objetos en el mapa según su tipo (rocas, comida, zombies, etc.)
  for (let rowActual = 0; rowActual < ROWS; rowActual++) {
    for (let colActual = 0; colActual < COLS; colActual++) {
      const x = colActual;
      const y = rowActual;

      if (map[rowActual][colActual] === 1) {
        const rock = new gameObject(x, y);
        arrRocks.push(rock);
      } else if (map[rowActual][colActual] === 2) {
        const food = new Food(x, y);
        arrFood.push(food);
      } else if (map[rowActual][colActual] === 0) {
        myPacman = new pacman(x, y);
      } else if (map[rowActual][colActual] === 3) {
        powerUp = new PowerUp(x, y);
      } else if (map[rowActual][colActual] === 4) {
        const zombie = new gameObject(x, y);
        arrZombies.push(zombie);
      } else if (map[rowActual][colActual] === 5) {
        dracula = new gameObject(x, y);
      }
    }
  }
}

/**
 * Lógica del juego que se ejecuta repetidamente.
 */
function draw() {
  background(135, 206, 235);

  // Muestra los objetos en el mapa (rocas, comida, zombies, etc.)
  arrRocks.forEach((rock) => rock.showObject(imgRock));
  arrFood.forEach((food) => food.showObject(imgFood));

  // Detecta colisiones entre Pacman y los objetos
  for (let i = 0; i < arrRocks.length; i++) {
    myPacman.testCollideRock(arrRocks[i]);
  }

  for (let i = 0; i < arrZombies.length; i++) {
    myPacman.testCollideZombie(arrZombies[i]);
  }

  for (let i = 0; i < arrFood.length; i++) {
    let resultTest = myPacman.testCollideFood(arrFood[i]);
    if (resultTest) {
      myPacman.scorePacman += arrFood[i].pointsFood;
      arrFood.splice(i, 1);  // Elimina la comida recogida
    }
  }

  // Verifica si Pacman recoge el Power-Up
  if (powerUp && myPacman.testCollidePowup(powerUp)) {
    powerUp.activate(myPacman);
    powerUp = null;  // Elimina el Power-Up una vez activado
  }

  if (powerUp) {
    powerUp.showObject(imgPowup);
  }

  arrZombies.forEach((zombie) => zombie.showObject(imgZombie));

  if (dracula) {
    dracula.showObject(imgDracula);
  }

  // Verifica si Pacman tiene el Power-Up y toca a Drácula
  if (dracula && myPacman.testCollideDracula(dracula)) {
    if (powerUp && powerUp.active) {
      noLoop();  // Detiene el juego
      alert("¡Has derrotado a Drácula! 🎉");
      restartGame();
    }
  }

  // Muestra el marcador de puntuación y el tiempo
  textSize(20);
  textAlign(CENTER, CENTER);
  timer = parseInt(millis() - startTimeGame);
  text("Score: " + myPacman.scorePacman, 150, HEIGHT_CANVAS + 50);
  text("Time: " + timer, 150, HEIGHT_CANVAS + 100);

  // Muestra Pacman en función de su dirección
  switch (myPacman.direction) {
    case 1:
      myPacman.showObject(imgPacmanRIGHT);
      break;
    case 2:
      myPacman.showObject(imgPacmanDOWN);
      break;
    case 3:
      myPacman.showObject(imgPacmanLEFT);
      break;
    case 4:
      myPacman.showObject(imgPacmanUP);
      break;
    default:
      myPacman.showObject(imgPacmanRIGHT);
  }
}

/**
 * Maneja la entrada del teclado para mover a Pacman.
 */
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    myPacman.moveRight();
  } else if (keyCode === LEFT_ARROW) {
    myPacman.moveLeft();
  } else if (keyCode === UP_ARROW) {
    myPacman.moveUp();
  } else if (keyCode === DOWN_ARROW) {
    myPacman.moveDown();
  }
  testFinishGame();
}

/**
 * Verifica si el juego ha terminado.
 */
function testFinishGame() {
  // Si no hay comida o se ha alcanzado el límite de tiempo, el juego termina.
  if (arrFood.length === 0 || timer >= 90000) {
    noLoop();  // Detiene el juego
    let theconfirm = confirm("Has ganado, ¿quieres jugar de nuevo?");
    if (theconfirm) {
      restartGame();  // Reinicia el juego
    }
  }
}

/**
 * Reinicia el juego, eliminando los objetos y configurando todo de nuevo.
 */
export function restartGame() {
  arrFood.length = 0;
  arrRocks.length = 0;
  arrZombies.length = 0;
  setup();
  loop();  // Vuelve a empezar el ciclo del juego
  startTimeGame = millis();
}

// Configura las funciones globales para que el entorno las reconozca.
globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed = keyPressed;
