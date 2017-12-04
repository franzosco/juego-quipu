
class MainMenu {
  constructor() {
    this.init = this.init.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
  }

  init(score) {

  }

  create() {
    // Imagen de bienvenida
    let background = this.game.add.image(0, 0, "bienvenida")
    background.height = this.game.height
    background.width = this.game.width

    this.game.add.image(5, 5, "logo-unamba")
    this.game.add.image(700, 5, "logo-educacion")

    this.menu = this.game.add.sprite(250, 150, "marco")
    this.menu.scale.setTo(.8, .8)

    let btn_nivel_1 = this.game.make.button(100, 80, "btn_nivel_1", () => {this.game.state.start('Nivel 1')})
    let btn_nivel_2 = this.game.make.button(100, 170, "btn_nivel_2", () => {this.game.state.start('Nivel 2')})
    let btn_nivel_3 = this.game.make.button(100, 260, "btn_nivel_3", () => {this.game.state.start('Nivel 3')})
    btn_nivel_1.scale.setTo(1.2, 1.2)
    btn_nivel_2.scale.setTo(1.2, 1.2)
    btn_nivel_3.scale.setTo(1.2, 1.2)

    this.menu.addChild(btn_nivel_1)
    this.menu.addChild(btn_nivel_2)
    this.menu.addChild(btn_nivel_3)

    localStorage.clear()
  }

  update() {

  }
}


export default MainMenu