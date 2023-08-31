import Phaser from 'phaser';

// Types
import GameItem from './sceneStuff/GameItemType.js';

//
import GameItems from './sceneStuff/GameItems.mjs';


export default class Inventory extends Phaser.Scene
{
    itemsPerRow:number = 7;

    rowAmount:number = 2;

    slotsAmount:number = this.itemsPerRow * this.rowAmount;

    // mutable stuff
    startingCol:number = 0;


    // sizes, in pixels:

    // cell size
    distance:number = 32;

    // item in cell
    itemFrameSide:number = 26;

    gap:number = this.distance - this.itemFrameSide;

    offset:number = 3;



    marker: Phaser.GameObjects.Image;

    arrowUp: Phaser.GameObjects.Image;

    arrowDown: Phaser.GameObjects.Image;

    amountText: Phaser.GameObjects.BitmapText;

    // gag : GameItem = GameItems.get(5);

    immy: Phaser.GameObjects.Image;

    dynTexture: any | null; //Phaser.Textures.DynamicTexture | any | null | undefined;

    inventory = new Map<GameItem, number>();


    constructor ()
    {
        super({ key: 'Inventory', active: false });
    }

    preload()
    {
        this.load.atlas("itemsAtlas", "inv_atlas_test.png", "inv_atlas_test.json")
        this.load.xml('tinyNumbersXML', 'font_inv.xml');
        this.load.once('complete', () => { Phaser.GameObjects.BitmapText.ParseFromAtlas(this, 'tinyNumbers', 'itemsAtlas', 'font_inv', 'tinyNumbersXML');})
    }
  
    create ()
    {
        // this.text = this.add.bitmapText(4, 8, "tinyNumbers", "1%2340955").setOrigin(0);

        // this.add.image(24, 35, 'itemsAtlas', this.gag.frame);

        // this.player = this.add.triangle(11, 118, 4, 16, 0, 0, 8, 0, 0xbbbb88)//0xdb78ca)
        //     .setOrigin(0.5, 1)
        //     .setDepth(2);

        // console.log(this.gag);

        // this.inventory.set(GameItems.get(22), 2);
        this.addItem(4, 21).addMultiple([0,1,2,3,5]).loseItem(4);

        console.log("INVEEEEEEEEEEEEEEEEEE:", this.inventory);

        //console.dir(GameItems);

        //console.dir(this.textures.addDynamicTexture);

        this.dynTexture = this.textures.addDynamicTexture("DT", this.itemsPerRow * this.distance, this.rowAmount * this.distance).fill(0x33dd55, 0.6);

        this.immy = this.add.image(3, 3, 'DT').setOrigin(0);

        this.arrowUp = this.add.image(248, 9, 'itemsAtlas', "inventory_arrow_up")
                      .setInteractive()
                      .setState(0)
                      .on("pointerdown", this.clickedArrow)
                      .on("pointerover", this.arrowOvered)
                      .on("pointerout", this.arrowOut)
       
        this.arrowDown = this.add.image(this.arrowUp.x, 24, 'itemsAtlas', "inventory_arrow_up")
                      .setFlip(true, true)
                      .setInteractive()
                      .setState(1)
                      .on("pointerdown", this.clickedArrow)
                      .on("pointerover", this.arrowOvered)
                      .on("pointerout", this.arrowOut)

        this.amountText = this.make.bitmapText({font: "tinyNumbers", origin: 1}, false);

        this.marker = this.marker = this.add.image(3, this.offset, 'itemsAtlas', "inventory_selected_item")
                     .setOrigin(0)
                     //.setVisible(false);

        // this.input.keyboard.on("keydown-Z", this.pressedZ, this); // () => { this.text?.setText("Key 'Z'"); });

        

       
    } // end 'create' method

    drawItems()
    {
        
    }

    clickedArrow()
    {
        // arrowUp has state===0, arrowDown has state === 1
        // if (this.state === 0)
        // {
        // this.scene.decCol()
        // this.scene.setSlots()
        // this.scene.marker.y += this.scene.distance
        // }
        // else
        // {
        // this.scene.incCol()
        // this.scene.setSlots()
        // this.scene.marker.y -= this.scene.distance
        // }
    }

    arrowOvered()
    {
        this.setFrame("inventory_arrow_up_h", false, false);
    }

    arrowOut()
    {
        this.setFrame("inventory_arrow_up", false, false);
    }

    addItem(id: number, amount: number = 1, inv = this.inventory)
    {
        const item = GameItems.get(id);

        if (inv.has(item))
        {
            inv.set(item, inv.get(item) + amount);
        }
        else
        {
            inv.set(item, amount);
        }

        return this;
    }

    addMultiple(idAry: number[], inv = this.inventory)
    {
        for (const id of idAry)
        {
            this.addItem(id, 1, inv);
        }

        return this;
    }

    loseItem(id: number, inv = this.inventory)
    {
        const item:GameItem = GameItems.get(id);

        if (inv.has(item))
        {
            const updAmount:number = inv.get(item) - 1;
            
            updAmount === 0? inv.delete(item) : inv.set(item, updAmount)
        }

        return this;
        // for (const id of idsAry)
        // {

        // }
    }
    

    pressedZ()
    {

    }
} // end class
