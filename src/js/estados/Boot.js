
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
    this.load.image('logo', 'assets/images/logo.png')
    this.load.image('preloadbar', 'assets/images/preloader-bar.png')
  }

  create() {
    //Agregamos un color de fondo a la pantalla de carga
    this.game.stage.backgroundColor = '#CDDC39'

    //Iniciamos la pantalla de 'Preload'
    this.state.start("Preload")
  }
}

export default Boot