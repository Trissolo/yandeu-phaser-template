import Phaser from 'phaser';

// import PMStroll from './components/pmstroll/PMStroll.mjs';
// import VisibilityMap from './components/pmstroll/VisibilityMap.mjs';


export default class Inventory extends Phaser.Scene
{
    // text? : Phaser.GameObjects.BitmapText;

    // player: Phaser.GameObjects.Shape;

    text: Phaser.GameObjects.BitmapText;

    gag : String = "gag! Inv";

    immy: Phaser.GameObjects.Image;

    constructor ()
    {
        super({ key: 'Inventory', active: false });
    }

    preload()
    {
        this.load.atlas("itemsAtlas", "img/inv_atlas_test.png", "img/inv_atlas_test.json")
        this.load.xml('tinyNumbersXML', 'img/font_inv.xml');
        this.load.once('complete', () => { Phaser.GameObjects.BitmapText.ParseFromAtlas(this, 'tinyNumbers', 'itemsAtlas', 'font_inv', 'tinyNumbersXML');})
    }
  
    create ()
    {
        this.text = this.add.bitmapText(4, 8, "tinyNumbers", "1%23409").setOrigin(0);

        this.add.image(24, 35, 'itemsAtlas', "veg15");

        // this.player = this.add.triangle(11, 118, 4, 16, 0, 0, 8, 0, 0xbbbb88)//0xdb78ca)
        //     .setOrigin(0.5, 1)
        //     .setDepth(2);

        console.log(this.gag);
        // this.input.keyboard.on("keydown-Z", this.pressedZ, this); // () => { this.text?.setText("Key 'Z'"); });

       
    }
    

    pressedZ()
    {

    }
} // end class
