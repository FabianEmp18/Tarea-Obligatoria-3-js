// Nombre: Héctor Fabián
// Apellido: Rodríguez
// DNI: 42097752

const readline = require('node:readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function preguntar(mensaje) {
  return new Promise((resolve) => rl.question(mensaje, resolve));
}

const calculadora = {
  numero1: 0,
  numero2: 0,

  sumar() { return this.numero1 + this.numero2; },
  restar() { return this.numero1 - this.numero2; },
  multiplicar() { return this.numero1 * this.numero2; },
  dividir() {
    if (this.numero2 === 0) return 'Error: no se puede dividir por cero.';
    return this.numero1 / this.numero2;
  },
  potencia() { return this.numero1 ** 2; },
  raiz() {
    if (this.numero1 < 0) return 'Error: no se puede calcular la raiz cuadrada de un numero negativo.';
    return Math.sqrt(this.numero1);
  },

  async pedirNumero(mensaje) {
    while (true) {
      const entrada = (await preguntar(mensaje)).trim();
      const numero = Number(entrada);
      if (entrada !== '' && Number.isFinite(numero)) return numero;
      console.log('Ingresa un numero valido.');
    }
  },

  async mostrarMenu() {
    while (true) {
      console.log('\n===== CALCULADORA =====');
      console.log('1. Sumar');
      console.log('2. Restar');
      console.log('3. Multiplicar');
      console.log('4. Dividir');
      console.log('5. Potencia al cuadrado');
      console.log('6. Raiz cuadrada');
      console.log('7. Salir');

      const opcion = (await preguntar('Elegi una opcion: ')).trim();
      if (opcion === '7') {
        console.log('Programa finalizado.');
        break;
      }
      if (!['1', '2', '3', '4', '5', '6'].includes(opcion)) {
        console.log('Opcion incorrecta. Intenta nuevamente.');
        continue;
      }

      this.numero1 = await this.pedirNumero('Ingresa el primer numero: ');
      if (['1', '2', '3', '4'].includes(opcion)) {
        this.numero2 = await this.pedirNumero('Ingresa el segundo numero: ');
      }

      let resultado;
      switch (opcion) {
        case '1': resultado = this.sumar(); break;
        case '2': resultado = this.restar(); break;
        case '3': resultado = this.multiplicar(); break;
        case '4': resultado = this.dividir(); break;
        case '5': resultado = this.potencia(); break;
        case '6': resultado = this.raiz(); break;
      }
      console.log('Resultado:', resultado);
    }
    rl.close();
  }
};

calculadora.mostrarMenu();
