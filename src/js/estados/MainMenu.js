
class MainMenu {
  constructor() {
    this.init = this.init.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  init(score) {

  }

  create() {
    // Imagen de bienvenida
    let background = this.game.add.image(0, 0, 'bienvenida');
    background.height = this.game.height;
    background.width = this.game.width;

    this.game.add.image(5, 5, 'logoUnamba');
    this.game.add.image(700, 5, 'logoEducacion');

    this.menu = this.game.add.sprite(230, 150, 'marco');

    let btnNivel0 = this.game.make.button(
        100,
        60,
        'btnNivel0',
        () => {
          this.game.state.start('Nivel 0');
        }
      ),
      btnNivel1 = this.game.make.button(
        100,
        120,
        'btnNivel1',
        () => {
          this.game.state.start('Nivel 1');
        }
      ),
      btnNivel2 = this.game.make.button(
        100,
        180,
        'btnNivel2',
        () => {
          this.game.state.start('Nivel 2');
        }
      ),
      btnNivel3 = this.game.make.button(
        100,
        240,
        'btnNivel3',
        () => {
          this.game.state.start('Nivel 3');
        }
      );


    this.menu.addChild(btnNivel0);
    this.menu.addChild(btnNivel1);
    this.menu.addChild(btnNivel2);
    this.menu.addChild(btnNivel3);

    localStorage.clear();
  }

  update() {

  }
}


export default MainMenu;
