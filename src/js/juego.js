import { Boot, Preload, MainMenu, Game } from './estados'
import 'css/main.scss'


window.onload = () => {
  let game = new Phaser.Game(800, 600, Phaser.AUTO, 'app')

  game.state.add('Boot', new Boot())
  game.state.add('Preload', new Preload())
  game.state.add('MainMenu', new MainMenu())
  game.state.add('Nivel 1', new Game(1))
  game.state.add('Nivel 2', new Game(2))
  game.state.add('Nivel 3', new Game(3))

  game.state.start('Boot')
}
