import 'css/main.scss';
import {Boot, Preload, MainMenu, Game} from './estados';

/*global Phaser*/

window.addEventListener('DOMContentLoaded',  () => {
  let game = new Phaser.Game(800, 600, Phaser.AUTO, 'app');

  game.state.add('Boot', new Boot());
  game.state.add('Preload', new Preload());
  game.state.add('MainMenu', new MainMenu());
  game.state.add('Nivel 0', new Game(0));
  game.state.add('Nivel 1', new Game(1));
  game.state.add('Nivel 2', new Game(2));
  game.state.add('Nivel 3', new Game(3));

  game.state.start('Boot');
});
