import Phaser from 'phaser';


// import logoImg from './assets/logo.png';


export default class SceneOne extends Phaser.Scene
{
    test = 1;

    constructor ()
    {
        super({ key: 'sceneOne', active: false });
    }
  
    create ()
    {
        this.add.bitmapText(0, 0, "whiteFont", "Some Textus").setOrigin(0);

        
        this.input.keyboard.on("keydown-Z", () => {console.log("Key 'Z'");
    });
        this.input.on('pointerdown', this.onClick, this);
    }
    
    onClick(pointer: Phaser.Input.Pointer, currentlyOver: Array<Phaser.GameObjects.GameObject>)
    {
        if (pointer.middleButtonDown())
        {
            console.log("Middle click");
        }

        else if (pointer.rightButtonDown())
        {
            console.log("Right click");
        }

        else
        {
            console.log("Left click");
        }
    }
} // end class
