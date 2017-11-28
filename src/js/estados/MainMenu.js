
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
    let background = this.game.add.image(0, 0, "welcome")
    background.height = this.game.height
    background.width = this.game.width

    this.game.add.image(5, 5, "logo-unamba")
  }

  update() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Nivel 1')
    }
  }
}


export default MainMenu