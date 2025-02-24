export class ErrorPac extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  toString() {
    console.log(
      "S'ha produit un error: \n ncodi " +
        this.code +
        " missatge error : " +
        this.message +
        " Pila: " +
        this.stack
    );
  }
}
