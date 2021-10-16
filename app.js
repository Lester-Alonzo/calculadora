const botones = [
  ["C", "^", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["+/-", "0", ".", "="],
];
const calculo = {
  operacion: "",
  memoria: undefined,
  numero: 0,
  resu: false,
  agregarDigito: function (n) {
    if (this.resu) {
      this.resu = false;
      this.numero = parseFloat("".concat(n));
    } else {
      this.numero = parseFloat("".concat(this.numero, n));
    }
  },
  agregarOperacion: function (op) {
    const { memoria, numero, operacion } = this;
    if (numero == 0 && memoria == undefined) return false;

    if (operacion == "") {
      this.operacion = op;
      this.memoria = numero;
      this.numero = 0;
    } else {
      this.numero = this.resolver();
      this.resu = true;
    }
    console.log(this);
  },
  agregarFuncion: function (op) {
    switch (op) {
      case "=":
        const respuesta = this.resolver();
        this.agregarFuncion("C");
        this.numero = respuesta;
        break;
      case "C":
        this.numero = 0;
        this.operacion = "";
        this.memoria = undefined;
        this.resu = true;
        break;
      case ".":
        if (!esFlotante(this.numero)) {
          this.numero = this.numero + ".";
        }
        break;
      case "+/-":
        this.numero = this.numero * -1;
        break;
    }
    console.log(this);
  },
  resolver: function () {
    switch (this.operacion) {
      case "+":
        return this.suma();
        break;
      case "-":
        return this.resta();
        break;
      case "*":
        return this.multipli();
        break;
      case "/":
        return this.divicion();
        break;
      case "/":
        return this.divicion();
        break;
      case "%":
        return this.porcentaje();
        break;
      case "^":
        return this.exponente();
        break;
      default:
        throw new Error("no identificado");
    }
  },
  render: function (elemento) {
    elemento.textContent = this.numero;
  },
  suma: function () {
    return this.numero + this.memoria;
  },
  resta: function () {
    return this.memoria - this.numero;
  },
  multipli: function () {
    return this.numero * this.memoria;
  },
  divicion: function () {
    return this.memoria / this.numero;
  },
  porcentaje: function () {
    return this.numero % this.memoria;
  },
  exponente: function () {
    return this.memoria ** this.numero;
  },
};
const display = $("#display");
const botonesContai = $("#botones-container");

for (const fila of botones) {
  for (let celda of fila) {
    const boton = document.createElement("button");
    boton.textContent = celda;
    boton.addEventListener("click", (e) => {
      if (esNumero(celda)) {
        calculo.agregarDigito(celda);
      } else if (esFuncion(celda)) {
        calculo.agregarFuncion(celda);
      } else {
        calculo.agregarOperacion(celda);
      }
      calculo.render(display);
    });
    botonesContai.appendChild(boton);
  }
}

function esNumero(n) {
  return !isNaN(n);
}
function esFlotante(n) {
  if (n.toString().indexOf(".") > -1) {
    return true;
  } else {
    return false;
  }
}
function esFuncion(n) {
  const funciones = ["C", "=", ".", "+/-"];
  return funciones.some((caracter) => caracter == n);
}
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}
