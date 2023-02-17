import Phaser from 'phaser';

import PMStroll from './components/pmstroll/PMStroll.mjs';
import VisibilityMap from './components/pmstroll/VisibilityMap.mjs';


export default class SceneOne extends Phaser.Scene
{
    text? : Phaser.GameObjects.BitmapText;

    player: Phaser.GameObjects.Shape;

    dest: Phaser.GameObjects.Shape;

    vismap: VisibilityMap;

    pmstroll: PMStroll;

    constructor ()
    {
        super({ key: 'sceneOne', active: false });
    }
  
    create ()
    {
        this.text = this.add.bitmapText(4, 8, "whiteFont", "Some Textus").setOrigin(0);

        this.player = this.add.triangle(11, 118, 4, 16, 0, 0, 8, 0, 0x88bb88)//0xdb78ca)
            .setOrigin(0.5, 1)
            .setDepth(2);

        // a circle, just to visualize the end point
        this.dest = this.add.circle(128, 118, 2, 0xea5d7c).setDepth(2);

        this.pmstroll = new PMStroll(this);

        this.vismap = this.pmstroll.addVisibilityMap(
            // [
            //     [26, 116, 26, 38, 110, 38, 130, 6, 206, 6, 240, 38, 242, 116, 180, 116, 172, 68, 106, 68, 110, 86, 146, 86, 148, 118],
            //     [46, 82, 44, 46, 130, 46, 152, 22, 182, 24, 180, 40, 154, 38, 128, 62, 56, 62, 56, 94],
            //     [202, 38, 232, 48, 230, 70, 218, 60, 208, 98, 184, 84]
            // ]
            [
                [9, 82, 9, 6, 29, 6, 29, 3, 42, 3, 39, 6, 59, 6, 62, 29, 72, 29, 82, 6, 115, 6, 122, 26, 135, 26, 145, 6, 181, 6, 181, 42, 191, 42, 204, 29, 204, 19, 191, 19, 191, 6, 240, 6, 240, 36, 224, 52, 214, 52, 214, 42, 207, 42, 204, 52, 204, 72, 231, 72, 240, 82, 244, 82, 244, 62, 254, 62, 250, 122, 194, 122, 178, 105, 178, 89, 165, 89, 165, 112, 174, 112, 178, 122, 118, 122, 125, 112, 135, 112, 135, 89, 118, 85, 118, 108, 92, 122, 75, 122, 75, 102, 85, 102, 85, 85, 69, 85, 69, 69, 56, 69, 56, 92, 72, 92, 69, 112, 33, 115, 19, 125, 3, 125, 3, 105],
                [82, 36, 92, 19, 108, 19, 115, 36, 89, 42],
                [145, 33, 155, 16, 174, 16, 174, 36, 158, 46, 158, 52, 174, 62, 174, 72, 155, 72, 145, 59],
                [191, 85, 191, 66, 198, 66, 201, 75, 224, 82, 237, 92, 227, 112, 204, 112, 214, 102, 211, 95],
                [141, 79, 161, 79, 158, 85, 155, 102, 145, 102, 148, 85, 141, 85],
                [85, 52, 92, 52, 92, 75, 85, 75],
                [19, 75, 26, 75, 26, 92, 39, 92, 39, 75, 46, 75, 46, 102, 19, 102],
                [23, 56, 19, 16, 46, 16, 52, 56, 46, 62, 39, 29, 29, 33, 29, 62]
            ]
        );

        console.log(this.vismap);

        this.pmstroll.debug?.showPolygons(this.vismap);

        // this.pmstroll.debug?.drawPolyMap(this.vismap);

        


        
        this.input.keyboard.on("keydown-Z", () => { this.text?.setText("Key 'Z'"); });

        this.input.on('pointerdown', this.onClick, this);
    }
    
    onClick(pointer: Phaser.Input.Pointer, currentlyOver: Array<Phaser.GameObjects.GameObject>)
    {
        if (pointer.middleButtonDown())
        {
            this.text?.setText("Middle click");

            this.player.setPosition(pointer.worldX, pointer.worldY);

            this.pmstroll.debug?.clear();
            this.pmstroll.debug?.showPolygons(this.vismap);

            const testDijkstraPath = this.pmstroll.pathDijkstra(this.player, this.dest, this.vismap);

            console.dir("SceneA Dijkstra:", testDijkstraPath);

            // just show the path
            if(testDijkstraPath.length)
            {
            console.log("...drawing")

            // this.pmstroll.debug.graphics.clear();

            this.pmstroll.debug?.showPath(testDijkstraPath, 0xb845a9)
        }
    
        }

        else if (pointer.rightButtonDown())
        {
            this.text?.setText("Right click");

            this.dest.setPosition(pointer.worldX, pointer.worldY);
        }

        else
        {
            this.text?.setText("Left click");
        }
    }
} // end class
