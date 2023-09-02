import Phaser from 'phaser';

// Types
import GameItem from './sceneStuff/GameItemType.js';

//
import GameItems from './sceneStuff/GameItems.mjs';


export default class Inventory extends Phaser.Scene
{
    itemsPerRow:number = 5;

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

    // ratio
    percent:number = this.itemFrameSide / this.distance;

    // game objects:
    marker: Phaser.GameObjects.Image;

    arrowUp: Phaser.GameObjects.Image;

    arrowDown: Phaser.GameObjects.Image;

    amountText: Phaser.GameObjects.BitmapText;


    immy: Phaser.GameObjects.Image;

    // @ts-ignore
    dynTexture; // : any | null; //Phaser.Textures.DynamicTexture | any | null | undefined;

    inventory = new Map<GameItem, number>();

    currentItem:GameItem | null = null;


    constructor ()
    {
        super({ key: 'Inventory'}); // , active: false });
    }

    preload()
    {
        this.load.atlas("itemsAtlas", "inv_atlas_test.png", "inv_atlas_test.json");

        this.load.xml('tinyNumbersXML', 'font_inv.xml');

        this.load.once('complete', () => { Phaser.GameObjects.BitmapText.ParseFromAtlas(this, 'tinyNumbers', 'itemsAtlas', 'font_inv', 'tinyNumbersXML');})
    }
  
    create ()
    {
        // @ts-ignore
        this.addMultiple(Phaser.Utils.Array.NumberArray(0, 5)); // GameItems.size - 1)); // this.itemsPerRow));

        this.addMultiple(Phaser.Utils.Array.NumberArray(0, 4));
        

        // @ts-ignore
        this.dynTexture = this.textures.addDynamicTexture("DT", this.itemsPerRow * this.distance, this.rowAmount * this.distance).fill(0x33dd55, 0.6);

        this.immy = this.add.image(this.offset, this.offset, 'DT')
            .setOrigin(0)
            .setInteractive()
            .on('pointerdown', this.withoutRemainder);

        this.arrowUp = this.add.image(248, 9, 'itemsAtlas', "inventory_arrow_up")
                      .setInteractive()
                    //   .setState(0)
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
                     .setVisible(false);


        this.drawItems();
        this.setArrowVisibility();

        // @ts-ignore
        this.input.keyboard.on("keydown-Z", this.pressedZ, this);

    } // end 'create' method

    drawItems()
    {
        const {startingCol, distance, slotsAmount, itemsPerRow, dynTexture, amountText, inventory} = this;

        
        const invAry = [...inventory.keys()];
        
        dynTexture.clear();
        
        dynTexture.fill(0x33dd55, 0.6);

        dynTexture.beginDraw()


        let x = 0;
        let y = 0;

        const maxX = distance * itemsPerRow;
        let item: GameItem | null;
        let owned: number;

        //hmmm limit
        const limit = Math.min(slotsAmount, inventory.size - itemsPerRow * startingCol);
        // console.log("(limit:)", limit);

        for (let slot = 0; slot < limit; slot++)
        {
            // console.log(`Drawing slot# ${slot} of ${limit}`);

            if (x === maxX) //slot === itemsPerRow)
            {
                x = 0;
                y += distance;
            }

            item = invAry[startingCol * itemsPerRow + slot];

            // console.log(item);

            // if(item === undefined) {break}

            dynTexture.batchDrawFrame('itemsAtlas', item.frame, x, y);

            // @ts-ignore
            owned = inventory.get(item);

            // console.log("How many?", inventory.get(item));

            if (owned > 1)
            {
                amountText.setText(owned);
                dynTexture.batchDraw(amountText, x + distance, y + distance - this.gap);
            }

            x += distance;
            // console.log(x);
        }

        dynTexture.endDraw();
    }

    maxY()
    {
        // return Math.max(0, Math.floor( (this.getInv().length - 1) / this.itemsPerRow) - 1);
        console.log("Inventory.size:", this.inventory.size)
        // console.log("MaxY", this.inventory.size - this.startingCol * this.itemsPerRow - this.itemsPerRow);

        const maxStartingCol = Math.max(0, Math.ceil(this.inventory.size / this.itemsPerRow) - this.rowAmount);
        console.log("MaxY", maxStartingCol);
        return maxStartingCol;
    }

    clickedArrow()
    {
        // @ts-ignore
        console.log("Current StartingCol", this.scene.startingCol, this.state);

        // arrowUp has state===0, arrowDown has state === 1
        if (this.state === 0)
        {
            // console.log("Arrow UP");
            this.scene.startingCol = Math.max(0, this.scene.startingCol - 1);
            this.scene.marker.y += this.scene.distance;
        // this.scene.decCol()
        // this.scene.setSlots()
        // this.scene.marker.y += this.scene.distance
        }
        else
        {
            // console.log("Arrow Down");
            this.scene.startingCol = Math.min(this.scene.startingCol + 1 , this.scene.maxY());
            this.scene.marker.y -= this.scene.distance;
        // this.scene.incCol()
        // this.scene.setSlots()
        // this.scene.marker.y -= this.scene.distance
        }

        // console.log("Drawing.from:", this.scene.startingCol, this.scene.marker.y);
        this.scene.drawItems();
        this.scene.setArrowVisibility();
    }

    setArrowVisibility()
    {
        this.arrowUp.setVisible(this.startingCol > 0);

        this.arrowDown.setVisible( !(this.startingCol === this. maxY()) );
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

    loseItem(id: number | GameItem, inv = this.inventory)
    {
        const item:GameItem = typeof id === "number"? GameItems.get(id): id;

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

    getItemByIdx(wanted:number, inv = this.inventory)
    {
        let i:number = 0;

        for (const item of inv.keys())
        {
            if (i++ === wanted)
            {
                return item;
            }
        }

        console.error(`Item (at [${wanted}]) not found. Inventory.size was ${inv.size}`, inv);

        return null;
    }

    withoutRemainder(pointer, relX, relY, d)
    {
        const {itemsPerRow, rowAmount, percent, distance, inventory, marker, offset} = this.scene;
    
            const rx = relX / distance;
            const ry = relY / distance;

            const gridX = Math.floor(rx);
            const gridY = Math.floor(ry);
            
            // console.log("---TEST---", arguments);
            // console.log(`relX: ${relX}\nrelY: ${relY}`);
            // console.log(`gridX: ${gridX}\ngridY: ${gridY}`);

            // console.log(`alloX: ${rx - gridX}\nalloY: ${ry - gridY}`);



        //  Allow interaction if click coordinates are within the cell area - ...no effect if a gap was clicked.
        if (rx - gridX <= percent && ry - gridY <= percent)
        {
            const cell = gridX + gridY * itemsPerRow ;

            const realCell = cell + this.scene.startingCol * itemsPerRow;

            console.log(`%cCell %c ${cell} %c(${realCell})`, "background-color: #337;", "color: #dd7;background-color: #557;", "color: #dd7;");

            if (realCell < inventory.size)
            {
                // this.scene.currentItem = [...inventory.keys()][realCell];
                
                /*this.scene.currentItem*/ const clickedItem = this.scene.getItemByIdx(realCell, inventory);
                
                // console.log(this.scene.currentItem.name);

                // marker.setPosition(offset + gridX * distance, offset + gridY * distance).setVisible(true);
                
                this.scene.manageClickedItem(clickedItem, gridX, gridY, distance, offset);
            }

        }
        else
        {
            this.scene.setNoItem();
            // marker.setVisible(false);

            // this.scene.currentItem = null;
        }
    }

    manageClickedItem(clickedItem, gridX, gridY, distance, offset)
    {
        if (this.currentItem === clickedItem)
        {
            console.log("Deselect Item(was:)", clickedItem);
            return this.setNoItem();
        }
        
        else if (this.currentItem === null)
        {
            console.log("SELECT ITEM", clickedItem);
            
            this.currentItem = clickedItem;

            this.marker.setPosition(offset + gridX * distance, offset + gridY * distance).setVisible(true);
        }


        else
        {
            //hardcoded Combine items
            const prevItem = this.currentItem;

            const minId = Math.min(prevItem.id, clickedItem.id);

            const maxId = Math.max(prevItem.id, clickedItem.id);

            // Radish + Apple = Rice Ball
            if (minId === 2 && maxId === 3)
            {
                console.log("Combine ITEM", clickedItem);


                this.loseItem(prevItem);
                this.loseItem(clickedItem.id);
                this.addItem(36, 1, this.inventory);
                this.setNoItem();
                this.drawItems();
            }

            else
            {
                console.log("SELECT ITEM", clickedItem);
            
                this.currentItem = clickedItem;

                this.marker.setPosition(offset + gridX * distance, offset + gridY * distance).setVisible(true);
            }

        }
    }

    setNoItem()
    {
        this.currentItem = null;
        
        this.marker.setVisible(false);
    }
    

    pressedZ()
    {
        console.log(`****CurrentItem: ${this.currentItem === null? "---" : this.currentItem.name} ****`);

        this.startingCol = this.maxY();

        this.drawItems();

        this.setArrowVisibility();

    }
} // end class
