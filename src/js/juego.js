
let configuracion = {
  scale: .3, // mobile: .3 ; tablet: .4; desktop: .6
  width:  window.innerWidth,
  height: window.innerHeight,
  dimension: {
    width: (window.innerWidth / 2) / 4,
    height: window.innerHeight / 5,
  },
  dispositivo: "mobile", // mobile; tablet; desktop
  niveles: {
    1: {
      quipu: [
        { tipo: "naranja" },
        { tipo: "uva" },
        { tipo: "platano" },
        { tipo: "manzana" },
      ]
    },
    2: {
      quipu: [
        { tipo: "circulo" },
        { tipo: "cuadrado" },
        { tipo: "triangulo" },
        { tipo: "rectangulo" },
      ]
    },
    3: {
      quipu: [
        { tipo: "perro" },
        { tipo: "gato" },
        { tipo: "conejo" },
        { tipo: "pato" },
      ]
    }
  }
}

let jugador = {
  nivel: 1,
  quipu: 1,
  pregunta: [0, 0, 0, 0], // número de figuras por cuerda
  respuesta: [0, 0, 0, 0], // número de figuras por cuerda de respuestas
  figuras: [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ],
  nudos: [],
  continuar: true
};

const FRUTAS = [
  { nombre: "durazno", recurso: "assets/sprites/frutas/durazno.png" },
  { nombre: "freza", recurso: "assets/sprites/frutas/freza.png" },
  { nombre: "manzana", recurso: "assets/sprites/frutas/manzana.png" },
  { nombre: "naranja", recurso: "assets/sprites/frutas/naranja.png" },
  { nombre: "pera", recurso: "assets/sprites/frutas/pera.png" },
  { nombre: "platano", recurso: "assets/sprites/frutas/platano.png" },
  { nombre: "uva", recurso: "assets/sprites/frutas/uva.png" },
  { nombre: "zandia", recurso: "assets/sprites/frutas/zandia.png" },
];

const GEOMETRICAS = [
  { nombre: "circulo", recurso: "assets/sprites/figuras/circulo.png" },
  { nombre: "cuadrado", recurso: "assets/sprites/figuras/cuadrado.png" },
  { nombre: "rectangulo", recurso: "assets/sprites/figuras/rectangulo.png" },
  { nombre: "rombo", recurso: "assets/sprites/figuras/rombo.png" },
  { nombre: "trapecio", recurso: "assets/sprites/figuras/trapecio.png" },
  { nombre: "triangulo", recurso: "assets/sprites/figuras/triangulo.png" },
];

const ANIMALES = [
  { nombre: "cerdo", recurso: "assets/sprites/animales/cerdo.png" },
  { nombre: "conejo", recurso: "assets/sprites/animales/conejo.png" },
  { nombre: "cuy", recurso: "assets/sprites/animales/cuy.png" },
  { nombre: "gallina", recurso: "assets/sprites/animales/gallina.png" },
  { nombre: "gato", recurso: "assets/sprites/animales/gato.png" },
  { nombre: "pato", recurso: "assets/sprites/animales/pato.png" },
  { nombre: "perro", recurso: "assets/sprites/animales/perro.png" },
  { nombre: "vaca", recurso: "assets/sprites/animales/vaca.png" },
];

const MANOS = [
  { nombre: "cero", recurso: "assets/sprites/manos/0.png" },
  { nombre: "uno", recurso: "assets/sprites/manos/1.png" },
  { nombre: "dos", recurso: "assets/sprites/manos/2.png" },
  { nombre: "tres", recurso: "assets/sprites/manos/3.png" },
  { nombre: "cuatro", recurso: "assets/sprites/manos/4.png" },
  { nombre: "cinco", recurso: "assets/sprites/manos/5.png" },
];

const CUERDAS = [
  { nombre: "cuerda_naranja", recurso: "assets/sprites/cuerdas/cuerda_naranja.png" },
  { nombre: "cuerda_azul", recurso: "assets/sprites/cuerdas/cuerda_azul.png" },
  { nombre: "cuerda_amarillo", recurso: "assets/sprites/cuerdas/cuerda_amarillo.png" },
  { nombre: "cuerda_verde", recurso: "assets/sprites/cuerdas/cuerda_verde.png" },
];

const NUDOS = [
  { nombre: "nudo_naranja", recurso: "assets/sprites/cuerdas/nudo_naranja.png" },
  { nombre: "nudo_azul", recurso: "assets/sprites/cuerdas/nudo_azul.png" },
  { nombre: "nudo_amarillo", recurso: "assets/sprites/cuerdas/nudo_amarillo.png" },
  { nombre: "nudo_verde", recurso: "assets/sprites/cuerdas/nudo_verde.png" },
];

const AUDIOS = {
  error: { recurso: "assets/audio/error.ogg" },
  correcto: { recurso: "assets/audio/correcto.ogg" },
  bub: { recurso: "assets/audio/bub.ogg" },
};

var numerosJSON = {
  spritemap: {
    "1": { start: 2, end: 3, loop: false },
    "2": { start: 4, end: 5.5, loop: false },
    "3": { start: 6.5, end: 7.5, loop: false },
    "4": { start: 8.5, end: 10, loop: false },
    "5": { start: 11, end: 12.5, loop: false },
    "6": { start: 13, end: 14.5, loop: false },
    "7": { start: 16, end: 17, loop: false },
    "8": { start: 18.5, end: 20, loop: false },
    "9": { start: 21, end: 22, loop: false },
    "10": { start: 23, end: 24, loop: false },
  }
};

const CUERDA_PRINCIPAL = {
  nombre: "cuerda_principal",
  recurso: "assets/sprites/cuerdas/cuerda_principal.png"
};

const ECENARIO = {
  nombre: "ecenario",
  recurso: "assets/images/ecenario.jpg"
};

const POPUP = {
  nombre: "popup",
  recurso: "assets/images/popup.png"
};

/*
 * Pantalla de 'Boot' esta se muestra cuando el juego es iniciado,
 * se utiliza para hacer algunas configuraciones del juego.
 */
class Boot {
  constructor() {
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
  }

  preload() {
    //Cargamos los assets que se mostrarán en la pantalla de 'Boot'
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  }

  create() {
    const { dispositivo } = configuracion;

    //Agregamos un color de fondo a la pantalla de carga
    this.game.stage.backgroundColor = '#CDDC39';

    if (dispositivo !== "desktop") {
      //Configuración de pantalla para tablet y mobile
      this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      this.scale.pageAlignHorizontally = true;
    } else {
      document.getElementById("app").style.marginTop = "8px";
    }

    //Iniciamos la pantalla de 'Preload'
    this.state.start("Preload");
  }
}


/*
 * Pantalla de 'Preload' esta se muestra después de la pantalla de 'Boot',
 * se utiliza para cargar las assets de el juego, etc.
 */
class Preload {
  constructor() {
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
  }

  preload() {
    // Mostramos pantalla de carga
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, "preloadbar");
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    // cargamos los assets del juego
    this.load.image("welcome", "assets/images/welcome.jpeg");
    this.load.image("logo-unamba", "assets/images/logo-unamba.png");
    this.load.spritesheet("button", "assets/buttons/button_sprite_sheet.png", 193, 71);
    this.load.image("calcular", "assets/buttons/calcular.png");
    this.load.image("iniciar", "assets/buttons/iniciar.png");
    this.load.image("siguiente", "assets/buttons/siguiente.png");

    FRUTAS.forEach(figura => {
      this.load.image(figura.nombre, figura.recurso);
    });

    GEOMETRICAS.forEach(figura => {
      this.load.image(figura.nombre, figura.recurso);
    });

    ANIMALES.forEach(figura => {
      this.load.image(figura.nombre, figura.recurso);
    });

    CUERDAS.forEach(cuerda => {
      this.load.image(cuerda.nombre, cuerda.recurso);
    });

    MANOS.forEach(mano => {
      this.load.image(mano.nombre, mano.recurso);
    });

    NUDOS.forEach(nudo => {
      this.load.image(nudo.nombre, nudo.recurso);
    });

    Object.keys(AUDIOS).forEach(audio => {
      this.load.audio(audio, AUDIOS[audio].recurso, .4);
    });

    this.load.audiosprite("numeros", "assets/audio/numeros.ogg", null, numerosJSON);

    this.load.image(CUERDA_PRINCIPAL.nombre, CUERDA_PRINCIPAL.recurso);
    this.load.image(ECENARIO.nombre, ECENARIO.recurso);
    this.load.image(POPUP.nombre, POPUP.recurso);
    this.load.image("mas", "assets/sprites/operacion/mas.png");
    this.load.image("igual", "assets/sprites/operacion/igual.png");
    this.load.image("incognita", "assets/sprites/operacion/incognita.png");
    this.load.image("controles", "assets/images/controles.png");

  }

  create() {
    setTimeout(() => this.state.start('MainMenu'), 1000);
  }
}


class MainMenu {
  constructor() {
    this.init = this.init.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  init(score) {

  }

  create() {
    // reiniciamos el nivel del jugador
    jugador.nivel = 1;

    // Imagen de bienvenida
    this.background = this.game.add.image(0, 0, "welcome");
    this.background.height = this.game.height;
    this.background.width = this.game.width;

    let unamba = this.game.add.image(5, 5, "logo-unamba");
    unamba.scale.setTo(.15, .15);
  }

  update() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
}


class Game {
  constructor() {
    this.tween = null;

    this.crearCabecera = this.crearCabecera.bind(this);
    this.crearContenido = this.crearContenido.bind(this);
    this.crearPregunta = this.crearPregunta.bind(this);
    this.crearQuipu = this.crearQuipu.bind(this);
    this.crearFiguras = this.crearFiguras.bind(this);
    this.crearPopup = this.crearPopup.bind(this);
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
    let sprite, anterior, mas, igual, incognita;
    const { scale, width, dimension } = configuracion;

    for (let i = 0; i < 4; i++) {
      if (jugador.pregunta[i] > 0) {
        if (anterior) {
          mas = this.game.add.sprite(
            dimension.width * i - (dimension.width / 8),
            dimension.height / 4,
            "mas"
          );
          mas.scale.setTo(scale - .2, scale - .2);
        }

        sprite = this.game.add.sprite(
          (dimension.width / 4) + dimension.width * i,
          (dimension.height / 8),
          MANOS[jugador.pregunta[i]].nombre
        );
        sprite.scale.setTo(scale, scale);

        anterior = sprite;
      }
    }

    incognita = this.game.add.sprite(dimension.width * 4, 0, "igual");
    incognita.scale.setTo(scale + .2, scale + .4);

    incognita = this.game.add.sprite(dimension.width * 5, dimension.height / 6, "incognita");
    incognita.scale.setTo(scale, scale);

    // boton calcular
    let button = this.game.add.button(
      width - (dimension.width * 2) ,
      dimension.height / 4, "calcular",
      this.onCalcular, 2, 1, 0
    );
    button.scale.setTo(scale + .1, scale + .1);
  }

  onCalcular() {
    if ((this.tween !== null && this.tween.isRunning ) || this.popup.scale.x === 1) {
      return;
    }

    this.popup.visible = true;
    this.game.world.bringToTop(this.popup);

    this.tween = this.game.add.tween(this.popup.scale)
      .to( { x: .9, y: .8 }, 1000, Phaser.Easing.Elastic.Out, true);

    for (let i = 0; i < 4; i++) {
      if (jugador.pregunta[i] !== jugador.respuesta[i]) {
        jugador.continuar = false;
        break;
      }
    }

    this.numeros.play(this.total.toString());

    if (jugador.continuar) {
      this.audio_correcto.play();
    } else {
      this.audio_error.play();
    }
  }

  crearContenido() {
    const { nivel } = jugador;

    if (nivel === 1) {
      jugador.quipu = 1;
      this.crearPregunta(FRUTAS);;

    } else if (nivel === 2) {
      jugador.quipu = 2;
      this.crearPregunta(GEOMETRICAS);

    } else if (nivel === 3) {
      jugador.quipu = 3;
      this.crearPregunta(ANIMALES);

    } else {
      const rand = this.getRandomInt(1, 3);
      jugador.quipu = rand;

      if (rand === 1) {
        this.crearPregunta(FRUTAS);
      } else if (rand === 2) {
        this.crearPregunta(GEOMETRICAS);
      } else {
        this.crearPregunta(ANIMALES);
      }
    }

    // creamos el quipu
    this.crearQuipu();
  }

  crearPregunta(figuras) {
    let rand, contador;

    // calculamos el array de preguntas
    contador = 0;
    for (let i = 0; i < 4; i++) {
      if (contador <= 9) {
        rand = this.getRandomInt(0, 5);
        if (rand + contador > 9) {
          break;
        } else {
          jugador.pregunta[i] = rand;
        }
        contador += rand;
      } else {
        break;
      }
    }

    // llenamos al azar las figuras de respuesta en la matriz de figuras
    let randi, randj, figura_index;
    for (let i = 0; i < 4; i++) {
      figura_index = figuras.findIndex(
        figura => figura.nombre === configuracion.niveles[jugador.quipu].quipu[i].tipo
      );

      for (let j = 0; j < jugador.pregunta[i] ; j++) {
        // forzamos llenado
        while (true) {
          randi = this.getRandomInt(0, 3);
          randj = this.getRandomInt(0, 3);
          if (jugador.figuras[randi][randj] === -1) {
            jugador.figuras[randi][randj] = figura_index;
            break;
          }
        }
      }
    }

    // llenamos los espacios de la matriz de figuras que no tienen
    // una figura asignada
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (jugador.figuras[i][j] === -1) {
          rand = this.getRandomInt(0, figuras.length - 1);
          jugador.figuras[i][j] = rand;
        }
      }
    }

    this.crearFiguras(figuras);
    this.crearCabecera();
  }

  crearQuipu() {
    const { height, width,  dimension, scale } = configuracion;
    let quipu, cuerda_principal, cuerda, nudo, sprite;

    for (let i = 1; i <= ((width / 2) / (120 * (scale))) + 2; i++) {
      cuerda_principal = this.game.add.sprite(
        (dimension.width / 2.5) * i,
        dimension.height + dimension.height / 5,
        CUERDA_PRINCIPAL.nombre
      );

      cuerda_principal.scale.setTo(scale, scale - .1);
    }

    quipu = configuracion.niveles[jugador.quipu].quipu;

    for (let i = 0; i < 4; i++) {
      jugador.nudos.push([]);

      sprite = this.game.add.sprite(
        (dimension.width / 4) + dimension.width * i,
        dimension.height - (dimension.height / 4.5),
        quipu[i].tipo
      );
      sprite.scale.setTo(scale - .1, scale - .1);

      for (let j = 1; j <= 10; j++) {
        cuerda = this.game.add.sprite(
          (dimension.width / 4) + dimension.width * i,
          dimension.height + (dimension.height / 3) * j,
          CUERDAS[i].nombre
        );
        cuerda.scale.setTo(scale - .1, scale - .1);

        if (j % 2 === 0) {
          nudo = this.game.add.sprite(
            (dimension.width / 4) + dimension.width * i,
            dimension.height + (dimension.height / 3) * j,
            NUDOS[i].nombre
          );
          nudo.scale.setTo(scale - .1, scale - .1);
          nudo.visible = false;

          jugador.nudos[i].push(nudo);
        }
      }
    }
  }

  crearFiguras(figuras) {
    const { width, height, dimension, scale } = configuracion;
    let sprite, rand, x, y;

    // Es el punto donde inicia el contenido de las figuras
    const A = {
      x: (width / 2) + (dimension.width / 4),
      y: dimension.height + (dimension.height / 4)
    };

    for (let i = 0; i < 4; i++)
    {
      for (let j = 0; j < 4; j++)
      {
        x = A.x + dimension.width * j;
        y = A.y + dimension.height * i;

        sprite = this.game.add.sprite(x, y, figuras[jugador.figuras[i][j]].nombre);
        sprite.scale.setTo(scale, scale);

        sprite.initPosition = { x: x, y: y };

        sprite.inputEnabled = true;
        sprite.input.enableDrag(true);
        sprite.events.onInputDown.add(() => { this.bub.play() }, this);
        sprite.events.onInputUp.add(this.soltarFigura, this);
      }
    }
  }

  soltarFigura() {
    let nudo;
    const { width, height, dimension } = configuracion;

    for (let i = 0; i < 4; i++) {
      if (
        (dimension.width / 8) + dimension.width * i <= arguments[0].position.x &&
        (dimension.width / 3) + dimension.width * i >= arguments[0].position.x &&
        arguments[0].key === configuracion.niveles[jugador.quipu].quipu[i].tipo
      ) {
        jugador.respuesta[i] = jugador.respuesta[i] + 1;
        arguments[0].visible = false;

        for (let j = 0; j < jugador.respuesta[i]; j++) {
          nudo = jugador.nudos[i][j];
          nudo.visible = true;
        }

        this.numeros.play(jugador.respuesta[i].toString());
      }
    }

    arguments[0].position.x = arguments[0].initPosition.x;
    arguments[0].position.y = arguments[0].initPosition.y;
  }

  crearPopup() {
    let sprite, anterior, incremento = 0;
    const { scale } = configuracion;

    this.popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "popup");

    for (let i = 0; i < 4; i++) {
      if (jugador.pregunta[i] > 0) {
        if (anterior) {
          sprite = this.game.add.sprite(
            (this.popup.width / 9) - (this.popup.width / 6) * incremento,
            -this.popup.height / 3.5,
            "mas"
          );
          sprite.scale.setTo(scale - .35, scale - .3);
          this.popup.addChild(sprite);
        }

        sprite = this.game.add.sprite(
          (-this.popup.width / 6) * incremento,
          -this.popup.height / 3,
          configuracion.niveles[jugador.quipu].quipu[i].tipo
        );
        sprite.scale.setTo(scale - .1, scale);
        this.popup.addChild(sprite);

        sprite = this.game.add.sprite(
          (-this.popup.width / 6) * incremento,
          (-this.popup.height / 10),
          MANOS[jugador.pregunta[i]].nombre
        );
        sprite.scale.setTo(scale - .1, scale);
        this.popup.addChild(sprite);

        anterior = sprite;
        incremento++;
      }
    }

    sprite = this.game.add.sprite(
      (this.popup.width / 10),
      (-this.popup.height / 4.5),
      "igual"
    );
    sprite.scale.setTo(scale, scale + .2);
    this.popup.addChild(sprite);

    this.total = 0;
    for (let i = 0; i < 4; i++) {
      this.total += jugador.pregunta[i];
    }

    if (this.total <= 5) {
      sprite = this.game.add.sprite(
        (this.popup.width / 10) + 60,
        (-this.popup.height / 4.5),
        MANOS[this.total].nombre
      );
      sprite.scale.setTo(scale, scale + .2);
      this.popup.addChild(sprite);

    } else {
      sprite = this.game.add.sprite(
        (this.popup.width / 10) + 60,
        (-this.popup.height / 4.5),
        MANOS[5].nombre
      );
      sprite.scale.setTo(scale, scale + .2);
      this.popup.addChild(sprite);

      sprite = this.game.add.sprite(
        (this.popup.width / 10) + 120,
        (-this.popup.height / 4.5),
        MANOS[this.total - 5].nombre
      );
      sprite.scale.setTo(scale, scale + .2);
      this.popup.addChild(sprite);
    }


    const btnContinuar = this.game.make.button(
      (this.popup.width * .4) - 300,
      (this.popup.height * .4) - 100,
      "siguiente",
      this.onContinuar, 2, 1, 0
    );
    btnContinuar.input.priorityID = 1;
    btnContinuar.scale.setTo(scale, scale - .1);
    this.popup.addChild(btnContinuar);

    this.popup.anchor.set(0.5);
    this.popup.scale.set(0.1);
    this.popup.visible = false;

    // audio de error
    this.audio_error = this.game.add.audio("error");
    this.audio_correcto = this.game.add.audio("correcto");
  }

  onContinuar() {
    // reiniciamos todos los datos del estado del juego
    jugador.pregunta = [0, 0, 0, 0];
    jugador.respuesta = [0, 0, 0, 0];
    jugador.nudos = [];
    jugador.figuras = [
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
    ];

    if (jugador.continuar) {
      jugador.nivel = jugador.nivel + 1;
      this.game.state.start('Game', true, false);
    } else {
      jugador.nivel = 1;
      jugador.continuar = true;
      this.game.state.start('MainMenu', true, false);
    }
  }

  create() {
    this.background = this.game.add.image(0, 0, "ecenario");
    this.background.height = this.game.height;
    this.background.width = this.game.width;

    // Agregamos el audio de los números
    this.numeros = this.game.add.audioSprite("numeros");

    // sonido bub
    this.bub = this.game.add.audio("bub");

    this.crearContenido();
    this.crearPopup();
  }

  update() {

  }
}


class Juego {
  constructor() {
    configuracion.width = 800;
    configuracion.height = 600;
    configuracion.scale = .6;
    configuracion.dispositivo = "desktop";
    configuracion.dimension = {
      width: (configuracion.width / 2) / 4,
      height: configuracion.height / 5,
    };
    this.game = new Phaser.Game(configuracion.width, configuracion.height, Phaser.AUTO, 'app');
    this.game.state.add('Boot', new Boot());
    this.game.state.add('Preload', new Preload());
    this.game.state.add('MainMenu', new MainMenu());
    this.game.state.add('Game', new Game());

    this.game.state.start('Boot');
  }
}

new Juego()
