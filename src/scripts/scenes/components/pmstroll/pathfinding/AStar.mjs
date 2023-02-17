// import Phaser from "phaser";
import GraphManager from "../GraphManager.mjs";
import PriorityQueue from "./PriorityQueue.mjs";

export default class Astar
{
    start;
    target;
    graph;

    heuristic;

    cameFrom;
    costSoFar;
    fScore;
    frontier;

    constructor(start, target, graph, heuristic)
    {
        this.start = start;

        this.target = target;

        this.graph = graph;

        this.heuristic = heuristic;

        //initialize costSoFar
        this.costSoFar = new Map(); // [...graph.keys()].map(el => [el, 0]));   
        this.costSoFar.set(start, 0);

        this.fScore = new Map();
        this.fScore.set(start, 0)

        this.frontier = new PriorityQueue(this.costSoFar);

        // visites nodes
        // key<node>
        // value<(node> (cheapest neighbor)
        this.cameFrom = new Map();

        // start the search immediately
        this.search();
    }

    search()
    {
        const {frontier, costSoFar, cameFrom, fScore, start, target, graph} = this;

        frontier.insert(start);

        //mark "start" as visited
        cameFrom.set(start, null)

        while(!frontier.isEmpty())
        {
            const currentNode = frontier.pop();

            if (currentNode === target) {return this}

            for (const [neighbor, distance] of graph.get(currentNode))
            {
                const newCost = costSoFar.get(currentNode) + distance;

                const betterCost = newCost < costSoFar.get(neighbor);

                // if not yet visited, or already visited but we have a cheaper cost
                if(!cameFrom.has(neighbor) || betterCost)
                {
                    // set or update the cost
                    costSoFar.set(neighbor, newCost);

                    // mark as visited / update the path portion
                    cameFrom.set(neighbor, currentNode);

                    // different
                    fScore.set(neighbor, newCost + this.heuristic(neighbor, target));

                    // update frontier determine priority
                    betterCost? frontier.reorderUpFrom(neighbor) : frontier.insert(neighbor)
                }
            }
        }

        return this
    }

    getPath()
    {
        // console.log("AStar SIZE:", this.fScore.size);

        const path = [];

        let {target: currNode} = this;

        if (!this.cameFrom.has(currNode) || this.cameFrom.size === 1)
        {
            this.destroy();
            
            return path
        }

        path.push(currNode);

        while (currNode !== this.start)
        {
            currNode = this.cameFrom.get(currNode);

            // path.push(currNode);

            //maybe a new obj?
            path.push({x: currNode.x, y: currNode.y});
        }

        this.destroy();

        return path
	}

    destroy()
    {
        this.frontier.orderedArr.length = 0;
        this.frontier.orderedArr = undefined;
        this.frontier.distancesMap = undefined;
        this.frontier = undefined;

        this.costSoFar.clear();
        this.costSoFar = undefined;

        this.heuristic = undefined;

        this.fScore.clear();
        this.fScore = undefined;

        this.cameFrom.clear();
        this.cameFrom = undefined;

        this.start = undefined;
        this.target = undefined;

        GraphManager.destroyGraph(this.graph);
        this.graph = undefined;
    }

}
