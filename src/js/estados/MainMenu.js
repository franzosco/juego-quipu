
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

    this.menu = this.game.add.sprite(250, 150, 'marco');
    this.menu.scale.setTo(.8, .8);

    let btnNivel1 = this.game.make.button(
        100,
        80,
        'btnNivel1',
        () => {
          this.game.state.start('Nivel 1');
        }
      ),
      btnNivel2 = this.game.make.button(
        100,
        170,
        'btnNivel2',
        () => {
          this.game.state.start('Nivel 2');
        }
      ),
      btnNivel3 = this.game.make.button(
        100,
        260,
        'btnNivel3',
        () => {
          this.game.state.start('Nivel 3');
        }
      );

    btnNivel1.scale.setTo(1.2, 1.2);
    btnNivel2.scale.setTo(1.2, 1.2);
    btnNivel3.scale.setTo(1.2, 1.2);

    this.menu.addChild(btnNivel1);
    this.menu.addChild(btnNivel2);
    this.menu.addChild(btnNivel3);

    localStorage.clear();
  }

  update() {

  }
}


export default MainMenu;
