import Phaser from "phaser";

export default class VisibilityMap
{
    constructor(aryOfNumberArys)
    {
        this.graph = new Map();
        
        this.polygons = [];

        for (const numbersAry of aryOfNumberArys)
        {
            this.polygons.push(new Phaser.Geom.Polygon(numbersAry));
        }
    }
}
