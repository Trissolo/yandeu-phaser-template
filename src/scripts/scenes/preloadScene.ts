export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene', active: true })
  }

  preload()
  {
    // this.load.image('whiteFont', '/img/font_bianco.png');
    this.load.bitmapFont('whiteFont', '/bmfonts/font_bianco.png', '/bmfonts/font_bianco.xml');
  }

  create() {
    this.scene.start('sceneOne')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
