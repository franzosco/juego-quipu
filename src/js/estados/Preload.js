import settings from "../settings"

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
    const { imagenes, figuras, cuerdas, audios } = settings

    // Mostramos pantalla de carga
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, "preloadbar");
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    // cargamos los assets del juego
    imagenes.forEach(imagen => 
      this.load.image(imagen.nombre, imagen.recurso)
    )

    Object.keys(figuras).forEach(key => 
      figuras[key].forEach(figura => 
        this.load.image(figura.nombre, figura.recurso)
      )
    )

    cuerdas.forEach(cuerda => 
      this.load.spritesheet(cuerda.nombre, cuerda.recurso, 150, 500)
    )

    audios.forEach(audio =>
      audio.spritemap ?
        this.load.audiosprite(audio.nombre, audio.recurso, null, { spritemap: audio.spritemap })
      :
        this.load.audio(audio.nombre, audio.recurso, .4)
    )
  }

  create() {
    setTimeout(() => this.state.start('MainMenu'), 1000);
  }
}

export default Preload