const animales = [
    'cerdo',
    'conejo',
    'cuy',
    'gallina',
    'gato',
    'pato',
    'perro',
    'vaca'
  ],
  frutas = [
    'freza',
    'manzana',
    'naranja',
    'pera',
    'platano',
    'uva',
    'zandia'
  ],
  geometricas = [
    'circulo',
    'cuadrado',
    'rectangulo',
    'rombo',
    'trapecio',
    'triangulo'
  ],
  niveles = {
    '1': [
      {'nombre': 'manzana', 'color': 'Naranja'},
      {'nombre': 'naranja', 'color': 'Naranja'},
      {'nombre': 'platano', 'color': 'Amarillo'},
      {'nombre': 'pera', 'color': 'Verde'}
    ],
    '2': [
      {'nombre': 'cuadrado', 'color': 'Naranja'},
      {'nombre': 'triangulo', 'color': 'Amarillo'},
      {'nombre': 'circulo', 'color': 'Azul'},
      {'nombre': 'rectangulo', 'color': 'Verde'}
    ],
    '3': [
      {'nombre': 'conejo', 'color': 'Naranja'},
      {'nombre': 'gato', 'color': 'Azul'},
      {'nombre': 'perro', 'color': 'Verde'},
      {'nombre': 'pato', 'color': 'Amarillo'}
    ]
  };

/*global Phaser*/

class Game {
  constructor(nivel=1) {
    this.pregunta_nro = 1;
    this.nivel = nivel;
    this.figuras = (nivel === 1) ?
      frutas : (nivel === 2) ?
        geometricas : animales;

    this.preguntas = new Array(nivel).fill({});
    this.respuestas = new Array(nivel).fill(0);

    this.cuerdas = [];
    this.figuras_invisibles  = [];

    this.figuras_matriz = [
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1]
    ];

    this.crearCabecera = this.crearCabecera.bind(this);
    this.crearPregunta = this.crearPregunta.bind(this);
    this.crearQuipu = this.crearQuipu.bind(this);
    this.crearFiguras = this.crearFiguras.bind(this);
    this.onCalcular = this.onCalcular.bind(this);
    this.onContinuar = this.onContinuar.bind(this);
    this.soltarFigura = this.soltarFigura.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  crearCabecera() {
    // boton calcular
    let button = this.game.add.button(
      600, 30, 'btnCalcular', this.onCalcular, 2, 1, 0
    );
    button.scale.setTo(.6, .6);
  }

  crearPregunta() {
    // calculamos el array de preguntas
    let contador = 0;

    this.preguntas = this.preguntas.map((pregunta, index) => {
      let total = 0;

      if (contador < 9) {
        if (contador >= 5) {
          total = this.getRandomInt(1, 9 - contador);
        } else {
          total = this.getRandomInt(1, 5);
        }
        contador += total;
      }

      return {
        total: total
      };
    });

    // llenamos al azar las figuras de respuesta en la matriz de figuras
    let agregados = [], figura_temporal;

    this.preguntas = this.preguntas.map((pregunta, index) => {
      if  (this.nivel === 1) {
        if (index === 0) {
          figura_temporal = niveles[this.nivel][this.getRandomInt(0, 3)];
        }

      } else {
        figura_temporal = niveles[this.nivel][this.getRandomInt(0, 3)];

        while (true) {
          if (agregados.findIndex(nombre => nombre === figura_temporal.nombre) === -1) {
            agregados.push(figura_temporal.nombre);
            break;
          }
          else {
            figura_temporal = niveles[this.nivel][this.getRandomInt(0, 3)];
          }
        }
      }

      return {
        ...pregunta,
        ...figura_temporal
      };
    });

    let randi, randj;
    for (let i = 0; i < this.preguntas.length; i++) {
      for (let j = 0; j < this.preguntas[i]['total']; j++) {
        // forzamos llenado
        while (true) {
          randi = this.getRandomInt(0, 3);
          randj = this.getRandomInt(0, 3);

          if (this.figuras_matriz[randi][randj] === -1) {
            this.figuras_matriz[randi][randj] = this.preguntas[i].nombre;
            break;
          }
        }
      }
    }

    // llenamos los espacios de la matriz de figuras que no tienen
    // una figura asignada
    let aleatorio;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        while(true) {
          aleatorio = this.getRandomInt(0, this.figuras.length - 1);

          if (this.figuras_matriz[i][j] === -1) {
            if (this.preguntas.findIndex(pregunta =>
              pregunta.nombre === this.figuras[aleatorio].nombre
            ) === -1) {
              this.figuras_matriz[i][j] = this.figuras[aleatorio];
              break;
            }
          }
          else {
            break;
          }
        }
      }
    }

  }

  crearQuipu() {
    let sprite, text;

    const style = {
      font: '50px Arial',
      fill: '#004caa'
    };

    this.game.add.sprite(0, 190, 'cuerdaPrincipal');

    this.incremento = this.preguntas.length === 1 ?
      210 : this.preguntas.length === 2 ?
        150 : this.preguntas.length === 3 ?
          110 : 90;

    for (let i = 1; i <= this.preguntas.length; i++) {
      // Agregamos los conjuntos de las frutas
      switch(this.preguntas[i - 1].total) {
      case 1: {
        sprite = this.game.add.sprite(
          390 - this.incremento * i + 25,
          150,
          this.preguntas[i - 1].nombre
        );
        sprite.scale.setTo(.6, .6);

        text = this.game.add.text(
          400 - this.incremento * i + 25,
          100,
          this.preguntas[i - 1].total, style
        );
        break;
      }
      case 2: {
        sprite = this.game.add.sprite(
          390 - this.incremento * i,
          150,
          this.preguntas[i - 1].nombre
        );
        sprite.scale.setTo(.6, .6);

        sprite = this.game.add.sprite(
          390 - this.incremento * i + 50,
          150,
          this.preguntas[i - 1].nombre
        );
        sprite.scale.setTo(.6, .6);

        text = this.game.add.text(
          400 - this.incremento * i + 25,
          100,
          this.preguntas[i - 1].total, style
        );
        break;
      }
      case 3: {
        sprite = this.game.add.sprite(
          390 - this.incremento * i,
          150,
          this.preguntas[i - 1].nombre
        );
        sprite.scale.setTo(.6, .6);

        sprite = this.game.add.sprite(
          390 - this.incremento * i + 50,
          150,
          this.preguntas[i - 1].nombre
        );
        sprite.scale.setTo(.6, .6);

        sprite = this.game.add.sprite(
          390 - this.incremento * i + 25,
          100,
          this.preguntas[i - 1].nombre
        );
        sprite.scale.setTo(.6, .6);

        text = this.game.add.text(
          400 - this.incremento * i + 25,
          50,
          this.preguntas[i - 1].total,
          style
        );
        break;
      }
      case 4: {
        sprite = this.game.add.sprite(390 - this.incremento * i , 150, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i + 50, 150, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i , 100, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i + 50, 100, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);

        text = this.game.add.text(400 - this.incremento * i + 25, 50, this.preguntas[i - 1].total, style)
        break;
      }
      case 5: {
        sprite = this.game.add.sprite(390 - this.incremento * i , 150, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i + 50, 150, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i , 100, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i + 50, 100, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i + 25, 50, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);

        text = this.game.add.text(400 - this.incremento * i + 25, 0, this.preguntas[i - 1].total, style)
        break;
      }
      case 6: {
        sprite = this.game.add.sprite(390 - this.incremento * i , 150, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i + 50, 150, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i , 100, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i + 50, 100, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i , 50, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);
        sprite = this.game.add.sprite(390 - this.incremento * i + 50, 50, this.preguntas[i - 1].nombre)
        sprite.scale.setTo(.6, .6);

        text = this.game.add.text(400 - this.incremento * i + 25, 0, this.preguntas[i - 1].total, style)
        break;
      }
      default: {
        break;
      }
      }

      // iniciamos la cuerda del quipu
      this.cuerdas[i - 1] = this.game.add.sprite(
        360 - this.incremento * i,
        200,
        `cuerda${this.preguntas[i - 1].color}`
      );
      this.cuerdas[i - 1].frame = 0;
      this.cuerdas[i - 1].scale.setTo(1, .8);
    }
  }

  crearFiguras() {
    let sprite, x, y;

    for (let i = 0; i < 4; i++)
    {
      for (let j = 0; j < 4; j++)
      {
        x = 400 + 100 * j;
        y = 140 + 120 * i;

        sprite = this.game.add.sprite(x, y, this.figuras_matriz[i][j]);
        sprite.initPosition = {x: x, y: y};
        sprite.inputEnabled = true;
        sprite.input.enableDrag(true);
        sprite.events.onInputDown.add(() => { this.bub.play(); }, this);
        sprite.events.onInputUp.add(this.soltarFigura, this);
      }
    }
  }

  crearPopup() {
    const style = {
      font: '40px Arial',
      fill: '#004caa'
    };

    this.popup = this.game.add.sprite(100, 100, 'popup');

    let total = 0;
    this.preguntas.forEach((pregunta, index) => {
      let sprite = this.game.add.sprite(60 + 50 * index, 80, pregunta.nombre);
      sprite.scale.setTo(.3, .4);

      let text = this.game.add.text(
        65 + 50 * index,
        140,
        `${pregunta.total}`,
        style
      );

      this.popup.addChild(sprite);
      this.popup.addChild(text);

      if (index < (this.preguntas.length - 1)) {
        let operacion = this.game.add.sprite(90 + (50 * index), 150, 'mas');
        operacion.scale.setTo(.2, .2);
        this.popup.addChild(operacion);
      }

      total += pregunta.total;
    });

    let igual = this.game.add.sprite(
      60 + 50 * this.preguntas.length,
      85,
      'igual'
    );
    igual.scale.setTo(.4, .4);
    this.popup.addChild(igual);

    let sprite_correcto = this.game.add.text(
      60 + 50 * this.preguntas.length + 50,
      85,
      '?',
      style
    );
    this.popup.addChild(sprite_correcto);

    this.popup.scale.set(.1);
    this.popup.visible = false;

    // audio de error
    this.audio_error = this.game.add.audio('error');
    this.audio_correcto = this.game.add.audio('correcto');

    //Agregamos alternativas
    let alternativa_correcta = this.getRandomInt(0, 2),
      alternativas_random = [0, 0, 0],
      rand;

    for (let i = 0; i < 3; i++) {
      if (alternativa_correcta === i) {
        alternativas_random[alternativa_correcta] = total;
      }
      else {
        rand = this.getRandomInt(1, 9);
        while(alternativas_random.indexOf(rand) !== -1) {
          rand = this.getRandomInt(1, 9);
        }
        alternativas_random[i] = rand;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (alternativa_correcta === i) {
        alternativas_random[alternativa_correcta] = total;
      } else {
        rand = this.getRandomInt(1, 9);
        while(alternativas_random.indexOf(rand) !== -1) {
          rand = this.getRandomInt(1, 9);
        }
        alternativas_random[i] = rand;
      }
    }

    let alternativaA = this.game.add.text(
        80,
        220,
        `a)${alternativas_random[0]}`,
        style
      ),
      alternativaB = this.game.add.text(
        180,
        220,
        `b)${alternativas_random[1]}`,
        style
      ),
      alternativaC = this.game.add.text(
        280,
        220,
        `c)${alternativas_random[2]}`,
        style
      );

    this.popup.addChild(alternativaA);
    this.popup.addChild(alternativaB);
    this.popup.addChild(alternativaC);

    let alternativas_array = [
      alternativaA,
      alternativaB,
      alternativaC
    ];

    for (let i = 0; i < alternativas_array.length; i++) {
      alternativas_array[i].inputEnabled = true;

      if (i === alternativa_correcta) {
        alternativas_array[i].events.onInputDown.add(
          () => {
            this.audio_correcto.play();
            sprite_correcto.setText(total.toString());

            setTimeout(
              () => {
                sprite_correcto.setText('?');
                this.onContinuar();
              },
              1500
            );
          },
          this
        );
      }
      else {
        alternativas_array[i].events.onInputDown.add(
          () => {
            this.audio_error.play();
            sprite_correcto.setText(total.toString());

            setTimeout(
              () => {
                sprite_correcto.setText('?');
                this.onContinuar();
              },
              1500
            );
          },
          this
        );
      }
    }

  }

  soltarFigura() {
    for (let i = 0; i < this.preguntas.length; i++) {
      if (
        380 - this.incremento * (i + 1) <= arguments[0].position.x &&
        420 - this.incremento * (i + 1) >= arguments[0].position.x &&
        arguments[0].key === this.preguntas[i].nombre
      ) {
        arguments[0].visible = false;
        this.figuras_invisibles.push(arguments[0]);

        this.respuestas[i] += 1;
        this.cuerdas[i].frame = this.respuestas[i];

        this.numeros.play(
          this.respuestas.reduce((a, b) => a + b, 0).toString()
        );
      }
    }

    arguments[0].position.x = arguments[0].initPosition.x;
    arguments[0].position.y = arguments[0].initPosition.y;
  }

  onCalcular() {
    if (this.popup.visible) {
      return;
    }

    this.popup.visible = true;
    this.game.world.bringToTop(this.popup);

    this.game.add.tween(this.popup.scale)
      .to( { x: 1.4, y: 1.2 }, 1000, Phaser.Easing.Elastic.Out, true);

    this.continuar = true;
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].total !== this.respuestas[i]) {
        this.continuar = false;
        break;
      }
    }

    if (this.continuar) {
      this.audio_correcto.play();
    } else {
      this.audio_error.play();
    }
  }

  onContinuar() {
    if (this.pregunta_nro < 5) {
      if (this.continuar) {
        this.pregunta_nro++;

        this.preguntas = new Array(
          this.nivel + (this.pregunta_nro > 2 ? 1 : 0)
        ).fill({});

        this.respuestas = new Array(
          this.nivel + (this.pregunta_nro > 2 ? 1 : 0)
        ).fill(0);

        this.figuras_matriz = [
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
          [-1, -1, -1, -1]
        ];

        this.game.state.start(`Nivel ${this.nivel}`, true, false);

      }
      else {
        this.respuestas = new Array(
          this.nivel + (this.pregunta_nro > 2 ? 1 : 0)
        ).fill(0);

        this.popup.scale.set(0.1);
        this.popup.visible = false;

        this.cuerdas.forEach(cuerda => {
          cuerda.frame = 0;
        });

        this.figuras_invisibles.forEach(figura => {
          figura.visible = true;
        });

        this.figuras_invisibles = [];
      }
    }
    else {
      this.pregunta_nro = 1;
      this.preguntas = new Array(this.nivel).fill({});
      this.respuestas = new Array(this.nivel).fill(0);
      this.cuerdas = [];
      this.figuras_invisibles  = [];
      this.figuras_matriz = [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1]
      ];

      this.game.state.start('MainMenu');
    }
  }

  create() {
    let background = this.game.add.image(0, 0, `ecenario${this.nivel}`);

    background.height = this.game.height;
    background.width = this.game.width;

    // Agregamos el audio de los números
    this.numeros = this.game.add.audioSprite('numeros');

    // sonido bub
    this.bub = this.game.add.audio('bub');

    this.crearPregunta();
    this.crearCabecera();
    this.crearQuipu();
    this.crearFiguras();
    this.crearPopup();
  }

  update() {

  }
}

export default Game;
