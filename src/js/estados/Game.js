import settings from '../settings'

class Game {
  constructor(nivel=1) {
    this.nivel = nivel
    this.figuras = nivel === 1 ?
                  settings.figuras.frutas : nivel === 2 ?
                  settings.figuras.geometricas : settings.figuras.animales

    this.pregunta = new Array(nivel).fill({})
    this.respuesta = new Array(nivel).fill({})

    this.cuerdas = []
    this.figuras_soltadas = []
    this.figuras_array = new Array(4).fill(new Array(4))

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

    this.pregunta.forEach(item => {
      if (contador <= 9) {
        aleatorio = this.getRandomInt(0, 9)

        if (aleatorio + contador > 9) {
          item.total = 0

        } else {
          item.total = aleatorio
        }

        contador += aleatorio

      } else {
        item.total = 0
      }
    })

    // llenamos al azar las figuras de respuesta en la matriz de figuras
    let randi, randj
    this.pregunta.forEach(item => {
      item.nombre = this.figuras[this.getRandomInt(0, this.figuras.length - 1)].nombre

      for (let j = 0; j < item.total; j++) {
        // forzamos llenado
        while (true) {
          randi = this.getRandomInt(0, 3)
          randj = this.getRandomInt(0, 3)

          if (!this.figuras_array[randi][randj]) {
            this.figuras_array[randi][randj] = item.nombre
            break
          }
        }
      }
    })

    console.log(this.figuras_array)

    // llenamos los espacios de la matriz de figuras que no tienen
    // una figura asignada
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        while(true) {
          if (!this.figuras_array[i][j]) {
            aleatorio = this.getRandomInt(0, this.figuras.length - 1)

            if (this.pregunta.findIndex(item => 
              item.nombre === this.figuras[aleatorio].nombre) === -1
            ) {
              this.figuras_array[i][j] = this.figuras[aleatorio].nombre
              break
            } else {
              break
            }
          } else {
            break
          }
        }
      }
    }
  }

  crearQuipu() {
    let sprite

    this.game.add.sprite(0, 120, "cuerda_principal")

    this.incremento = this.pregunta.length === 1 ?
                210 : this.pregunta.length === 2 ?
                150 : this.pregunta.length === 3 ?
                110 : 90

    for (let i = 1; i <= this.pregunta.length; i++) {
      sprite = this.game.add.sprite(400 - this.incremento * i, 50, this.pregunta[i - 1].nombre)
      sprite.scale.setTo(.6, .6)

      this.cuerdas[i - 1] = this.game.add.sprite(360 - this.incremento * i, 130, "cuerda_amarillo")
      this.cuerdas[i - 1].frame = 0
    }
  }

  crearFiguras() {
    let sprite, x, y

    for (let i = 0; i < 4; i++)
    {
      for (let j = 0; j < 4; j++)
      {
        x = 400 + 100 * j
        y = 140 + 120 * i

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

  crearPopup() {
    let sprite, anterior, incremento = 0

    this.popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "popup")


    let btnContinuar = this.game.make.button(-20, 80, "siguiente", this.onContinuar)
    btnContinuar.input.priorityID = 1
    btnContinuar.scale.setTo(.4, .4)

    this.popup.addChild(btnContinuar)

    this.popup.anchor.set(0.5)
    this.popup.scale.set(0.1)
    this.popup.visible = false

    // audio de error
    this.audio_error = this.game.add.audio("error")
    this.audio_correcto = this.game.add.audio("correcto")
  }

  soltarFigura() {
    for (let i = 0; i < this.pregunta.length; i++) {
      if (
        390 - this.incremento * (i + 1) <= arguments[0].position.x &&
        410 - this.incremento * (i + 1) >= arguments[0].position.x &&
        arguments[0].key === this.pregunta[i].nombre
      ) {
        arguments[0].visible = false
        this.figuras_soltadas.push(arguments[0])
        
        this.respuesta[i] += 1
        this.cuerdas[i].frame = this.respuesta[i]

        this.numeros.play(this.respuesta[i].toString())
      }
    }

    arguments[0].position.x = arguments[0].initPosition.x;
    arguments[0].position.y = arguments[0].initPosition.y;
  }

  onCalcular() {
    if (this.popup.visible) {
      return
    }

    this.popup.visible = true
    this.game.world.bringToTop(this.popup)

    this.game.add.tween(this.popup.scale)
      .to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true)

    this.continuar = true
    for (let i = 0; i < this.pregunta.length; i++) {
      if (this.pregunta[i].total !== this.respuesta[i]) {
        this.continuar = false
        break;
      }
    }

    if (this.continuar) {
      this.audio_correcto.play()
    } else {
      this.audio_error.play()
    }
  }

  onContinuar() {
    if (this.continuar) {
      if (this.nivel === 1) {
        this.pregunta = [0]
        this.respuesta = [0]

      } else if (this.nivel === 2) {
        this.pregunta = [0, 0]
        this.respuesta = [0, 0]

      } else {
        this.pregunta = [0, 0, 0]
        this.respuesta = [0, 0, 0]
      }

      this.figuras_array = [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
      ]

      this.game.state.start(`Nivel ${this.nivel}`, true, false)

    } else {
      this.respuesta = new Array(this.nivel).fill(0)

      this.popup.anchor.set(0.5)
      this.popup.scale.set(0.1)
      this.popup.visible = false

      this.cuerdas.forEach(cuerda => {
        cuerda.frame = 0
      })

      this.figuras_soltadas.forEach(figura => {
        figura.visible = true
      })
    }
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
    this.crearPopup()
  }

  update() {

  }
}

export default Game