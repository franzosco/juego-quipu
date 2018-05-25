import bienvenida from 'assets/images/bienvenida.jpeg';
import btnAtras from 'assets/sprites/buttons/btn_atras.png';
import btnNivel1 from 'assets/sprites/buttons/btn_nivel1.png';
import btnNivel2 from 'assets/sprites/buttons/btn_nivel2.png';
import btnNivel3 from 'assets/sprites/buttons/btn_nivel3.png';
import btnCalcular from 'assets/sprites/buttons/btn_calcular.png';
import btnTutorial from 'assets/sprites/buttons/btn_tutorial.png';
import cerdo from 'assets/sprites/animales/cerdo.png';
import circulo from 'assets/sprites/geometricas/circulo.png';
import conejo from 'assets/sprites/animales/conejo.png';
import cuadrado from 'assets/sprites/geometricas/cuadrado.png';
import cuerdaAmarillo from 'assets/sprites/cuerdas/cuerda_amarillo.png';
import cuerdaAzul from 'assets/sprites/cuerdas/cuerda_azul.png';
import cuerdaNaranja from 'assets/sprites/cuerdas/cuerda_naranja.png';
import cuerdaPrincipal from 'assets/sprites/cuerdas/cuerda_principal.png';
import cuerdaVerde from 'assets/sprites/cuerdas/cuerda_verde.png';
import cuy from 'assets/sprites/animales/cuy.png';
import ecenario0 from 'assets/images/ecenario0.jpg';
import ecenario1 from 'assets/images/ecenario1.jpg';
import ecenario2 from 'assets/images/ecenario2.jpg';
import ecenario3 from 'assets/images/ecenario3.jpg';
import freza from 'assets/sprites/frutas/freza.png';
import gallina from 'assets/sprites/animales/gallina.png';
import gato from 'assets/sprites/animales/gato.png';
import igual from 'assets/images/igual.png';
import logoUnamba from 'assets/images/logo-unamba.png';
import logoEducacion from 'assets/images/logo-educacion.png';
import manzana from 'assets/sprites/frutas/manzana.png';
import marco from 'assets/images/marco.png';
import mas from 'assets/images/mas.png';
import naranja from 'assets/sprites/frutas/naranja.png';
import pato from 'assets/sprites/animales/pato.png';
import pera from 'assets/sprites/frutas/pera.png';
import perro from 'assets/sprites/animales/perro.png';
import platano from 'assets/sprites/frutas/platano.png';
import popup from 'assets/images/popup.png';
import rectangulo from 'assets/sprites/geometricas/rectangulo.png';
import rombo from 'assets/sprites/geometricas/rombo.png';
import trapecio from 'assets/sprites/geometricas/trapecio.png';
import triangulo from 'assets/sprites/geometricas/triangulo.png';
import uva from 'assets/sprites/frutas/uva.png';
import vaca from 'assets/sprites/animales/vaca.png';
import zandia from 'assets/sprites/frutas/zandia.png';
// Importando audio
import correcto from 'assets/audio/correcto.ogg';
import error from 'assets/audio/error.ogg';
import bub from 'assets/audio/bub.ogg';
import numeros from 'assets/audio/numeros.ogg';

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
    this.splash = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY, 'logo'
    );
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY + 128, 'preloadBar'
    );
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    // cargamos los assets del juego
    this.load.image('bienvenida', bienvenida);
    this.load.image('btnAtras', btnAtras);
    this.load.image('btnNivel0', btnTutorial);
    this.load.image('btnNivel1', btnNivel1);
    this.load.image('btnNivel2', btnNivel2);
    this.load.image('btnNivel3', btnNivel3);
    this.load.image('btnCalcular', btnCalcular);
    this.load.image('cerdo', cerdo);
    this.load.image('circulo', circulo);
    this.load.image('conejo', conejo);
    this.load.image('cuadrado', cuadrado);
    this.load.image('cuerdaPrincipal', cuerdaPrincipal);
    this.load.image('cuy', cuy);
    this.load.image('ecenario0', ecenario0);
    this.load.image('ecenario1', ecenario1);
    this.load.image('ecenario2', ecenario2);
    this.load.image('ecenario3', ecenario3);
    this.load.image('freza', freza);
    this.load.image('gallina', gallina);
    this.load.image('gato', gato);
    this.load.image('igual', igual);
    this.load.image('logoUnamba', logoUnamba);
    this.load.image('logoEducacion', logoEducacion);
    this.load.image('manzana', manzana);
    this.load.image('marco', marco);
    this.load.image('mas', mas);
    this.load.image('naranja', naranja);
    this.load.image('pato', pato);
    this.load.image('pera', pera);
    this.load.image('perro', perro);
    this.load.image('platano', platano);
    this.load.image('popup', popup);
    this.load.image('rectangulo', rectangulo);
    this.load.image('rombo', rombo);
    this.load.image('trapecio', trapecio);
    this.load.image('triangulo', triangulo);
    this.load.image('uva', uva);
    this.load.image('vaca', vaca);
    this.load.image('zandia', zandia);

    this.load.spritesheet('cuerdaAmarillo', cuerdaAmarillo, 150, 500);
    this.load.spritesheet('cuerdaAzul', cuerdaAzul, 150, 500);
    this.load.spritesheet('cuerdaNaranja', cuerdaNaranja, 150, 500);
    this.load.spritesheet('cuerdaVerde', cuerdaVerde, 150, 500);

    this.load.audio('bub', bub, .4);
    this.load.audio('correcto', correcto, .4);
    this.load.audio('error', error, .4);

    this.load.audiosprite(
      'numeros',
      numeros,
      null,
      {
        spritemap: {
          '1': {start: 2, end: 3, loop: false},
          '2': {start: 4, end: 5.5, loop: false},
          '3': {start: 6.5, end: 7.5, loop: false},
          '4': {start: 8.5, end: 10, loop: false},
          '5': {start: 11, end: 12.5, loop: false},
          '6': {start: 13, end: 14.5, loop: false},
          '7': {start: 16, end: 17, loop: false},
          '8': {start: 18.5, end: 20, loop: false},
          '9': {start: 21, end: 22, loop: false},
          '10': {start: 23, end: 24, loop: false}
        }
      }
    );
  }

  create() {
    setTimeout(() => this.state.start('MainMenu'), 1000);
  }
}

export default Preload;
