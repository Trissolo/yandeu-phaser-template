import 'phaser';
import SceneOne from './scenes/sceneOne';
import PreloadScene from './scenes/preloadScene'

const config = {
  type: Phaser.WEBGL,
  pixelArt: true,
  backgroundColor: '#320822',
  disableContextMenu: true,
  scale:
  {
    mode: Phaser.Scale.NONE,
    width: 256,
    height: 128,
    zoom: 3
    // autoCenter: Phaser.Scale.CENTER_BOTH
  },
  loader: {
      path: 'assets/'
  },
  scene: [PreloadScene, SceneOne]
};

window.addEventListener('load', () => {
  // window.game = new Phaser.Game(config);
  const game = new Phaser.Game(config)
});


// const DEFAULT_WIDTH = 1280
// const DEFAULT_HEIGHT = 720
/*
const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene]
}
*/
