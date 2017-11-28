import settings from '../settings'

class Game {
  constructor(nivel=1) {

    if (nivel === 1) {
      this.figuras = settings.figuras.frutas
      this.pregunta = [0]
      this.nudos = [[]]

    } else if (nivel === 2) {
      this.figuras = settings.figuras.geometricas
      this.pregunta = [0, 0]
      this.nudos = [[], []]

    } else {
      this.figuras = settings.figuras.animales
      this.pregunta = [0, 0, 0]
      this.nudos = [[], [], []]

    }

    this.figuras_array = [
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
    ]
    this.nivel = nivel
    this.tween = null

    this.crearCabecera = this.crearCabecera.bind(this)
    this.crearPregunta = this.crearPregunta.bind(this)
    this.crearQuipu = this.crearQuipu.bind(this)
    this.crearFiguras = this.crearFiguras.bind(this)
    this.onCalcular = this.onCalcular.bind(this)
    this.onContinuar = this.onContinuar.bind(this)
    this.soltarFigura = this.soltarFigura.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  crearCabecera() {
    // boton calcular
    let button = this.game.add.button(600, 30, "calcular", this.onCalcular, 2, 1, 0)
    button.scale.setTo(.6, .6)
  }

  crearPregunta() {
    // calculamos el array de preguntas
    let aleatorio, contador = 0
    for (let i = 0; i < this.pregunta.length; i++) {
      if (contador <= 9) {
        aleatorio = this.getRandomInt(0, 9)

        if (aleatorio + contador > 9) {
          break
        } else {
          this.pregunta[i] = { total: aleatorio }
        }
        contador += aleatorio
      } else {
        break
      }
    }

    // llenamos al azar las figuras de respuesta en la matriz de figuras
    let randi, randj
    for (let i = 0; i < this.pregunta.length; i++) {
      this.pregunta[i] = {
        total: this.pregunta[i].total,
        nombre: this.figuras[this.getRandomInt(0, this.figuras.length - 1)].nombre
      }

      for (let j = 0; j < this.pregunta[i].total ; j++) {
        // forzamos llenado
        while (true) {
          randi = this.getRandomInt(0, 3)
          randj = this.getRandomInt(0, 3)

          if (this.figuras_array[randi][randj] === -1) {
            this.figuras_array[randi][randj] = this.pregunta[i].nombre
            break
          }
        }
      }
    }

    // llenamos los espacios de la matriz de figuras que no tienen
    // una figura asignada
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.figuras_array[i][j] === -1) {
          this.figuras_array[i][j] = this.figuras[this.getRandomInt(0, this.figuras.length - 1)].nombre
        }
      }
    }
  }

  crearQuipu() {
    let sprite

    this.game.add.sprite(0, 120, "cuerda_principal")

    for (let i = 0; i < this.pregunta.length; i++) {
      sprite = this.game.add.sprite(400 / (this.pregunta.length + 1), 60, this.pregunta[i].nombre)
      sprite.scale.setTo(.6, .6)

      sprite = this.game.add.sprite(0, 120, "cuerda_amarillo")
      sprite.frame = 2
    }
  }

  crearFiguras() {
    let sprite, x, y

    for (let i = 0; i < 4; i++)
    {
      for (let j = 0; j < 4; j++)
      {
        x = 400 + 100 * j;
        y = 140 + 120 * i;

        sprite = this.game.add.sprite(x, y, this.figuras_array[i][j])
        sprite.scale.setTo(.6, .6)

        sprite.initPosition = { x: x, y: y }

        sprite.inputEnabled = true
        sprite.input.enableDrag(true)
        sprite.events.onInputDown.add(() => { this.bub.play() }, this)
        sprite.events.onInputUp.add(this.soltarFigura, this)
      }
    }
  }

  soltarFigura() {
    let nudo

    for (let i = 0; i < this.pregunta.length; i++) {
      
    }

    arguments[0].position.x = arguments[0].initPosition.x;
    arguments[0].position.y = arguments[0].initPosition.y;
  }

  onCalcular() {
    if ((this.tween !== null && this.tween.isRunning ) || this.popup.scale.x === 1) {
      return
    }

    this.popup.visible = true
    this.game.world.bringToTop(this.popup)

    this.tween = this.game.add.tween(this.popup.scale)
      .to( { x: .9, y: .8 }, 1000, Phaser.Easing.Elastic.Out, true)
  }

  onContinuar() {
    if (this.nivel === 1) {
      this.pregunta = [0]
      this.nudos = [[]]

    } else if (this.nivel === 2) {
      this.pregunta = [0, 0]
      this.nudos = [[], []]

    } else {
      this.pregunta = [0, 0, 0]
      this.nudos = [[], [], []]
    }

    this.figuras_array = [
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
    ]

    this.game.state.start('Game', true, false)
  }

  create() {
    let background = this.game.add.image(0, 0, "ecenario1")
    background.height = this.game.height
    background.width = this.game.width

    // Agregamos el audio de los números
    this.numeros = this.game.add.audioSprite("numeros")

    // sonido bub
    this.bub = this.game.add.audio("bub")

    this.crearPregunta()
    this.crearCabecera()
    this.crearQuipu()
    this.crearFiguras()
  }

  update() {

  }
}

export default Game