/**
 * quadtree-js
 * @version 1.2.5
 * @license MIT
 * @author Timo Hausmann
 */

/* https://github.com/timohausmann/quadtree-js.git v1.2.4 */

/**
 * The Quadtree uses rectangle objects for all areas ("Rect").
 * All rectangles require the properties x, y, width, height
 * @typedef {Object} Rect
 * @property {number} x         X-Position
 * @property {number} y         Y-Position
 * @property {number} width     Width
 * @property {number} height    Height
 */

/**
 * Quadtree Constructor
 * @class Quadtree
 * @param {Rect} bounds                 bounds of the node ({ x, y, width, height })
 * @param {number} [max_objects=10]     (optional) max objects a node can hold before splitting into 4 subnodes (default: 10)
 * @param {number} [max_levels=4]       (optional) total max levels inside root Quadtree (default: 4) 
 * @param {number} [level=0]            (optional) depth level, required for subnodes (default: 0)
 */
function Quadtree(bounds, max_objects?, max_levels?, level?) {

    this.max_objects = max_objects || 10;
    this.max_levels = max_levels || 4;

    this.level = level || 0;
    this.bounds = bounds;

    this.objects = [];
    this.nodes = [];
};


/**
 * Split the node into 4 subnodes
 * @memberof Quadtree
 */
Quadtree.prototype.split = function () {

    var nextLevel = this.level + 1,
        subWidth = this.bounds.width / 2,
        subHeight = this.bounds.height / 2,
        x = this.bounds.x,
        y = this.bounds.y;

    //top right node
    this.nodes[0] = new Quadtree({
        x: x + subWidth,
        y: y,
        width: subWidth,
        height: subHeight
    }, this.max_objects, this.max_levels, nextLevel);

    //top left node
    this.nodes[1] = new Quadtree({
        x: x,
        y: y,
        width: subWidth,
        height: subHeight
    }, this.max_objects, this.max_levels, nextLevel);

    //bottom left node
    this.nodes[2] = new Quadtree({
        x: x,
        y: y + subHeight,
        width: subWidth,
        height: subHeight
    }, this.max_objects, this.max_levels, nextLevel);

    //bottom right node
    this.nodes[3] = new Quadtree({
        x: x + subWidth,
        y: y + subHeight,
        width: subWidth,
        height: subHeight
    }, this.max_objects, this.max_levels, nextLevel);
};


/**
 * Determine which node the object belongs to
 * @param {Rect} pRect      bounds of the area to be checked ({ x, y, width, height })
 * @return {number[]}       an array of indexes of the intersecting subnodes (0-3 = top-right, top-left, bottom-left, bottom-right / ne, nw, sw, se)
 * @memberof Quadtree
 */
Quadtree.prototype.getIndex = function (pRect) {

    var indexes = [],
        verticalMidpoint = this.bounds.x + (this.bounds.width / 2),
        horizontalMidpoint = this.bounds.y + (this.bounds.height / 2);

    var startIsNorth = pRect.y < horizontalMidpoint,
        startIsWest = pRect.x < verticalMidpoint,
        endIsEast = pRect.x + pRect.width > verticalMidpoint,
        endIsSouth = pRect.y + pRect.height > horizontalMidpoint;

    //top-right quad
    if (startIsNorth && endIsEast) {
        indexes.push(0);
    }

    //top-left quad
    if (startIsWest && startIsNorth) {
        indexes.push(1);
    }

    //bottom-left quad
    if (startIsWest && endIsSouth) {
        indexes.push(2);
    }

    //bottom-right quad
    if (endIsEast && endIsSouth) {
        indexes.push(3);
    }

    return indexes;
};


/**
 * Insert the object into the node. If the node
 * exceeds the capacity, it will split and add all
 * objects to their corresponding subnodes.
 * @param {Rect} pRect      bounds of the object to be added ({ x, y, width, height })
 * @memberof Quadtree
 */
Quadtree.prototype.insert = function (pRect) {

    var i = 0,
        indexes;

    //if we have subnodes, call insert on matching subnodes
    if (this.nodes.length) {
        indexes = this.getIndex(pRect);

        for (i = 0; i < indexes.length; i++) {
            this.nodes[indexes[i]].insert(pRect);
        }
        return;
    }

    //otherwise, store object here
    this.objects.push(pRect);

    //max_objects reached
    if (this.objects.length > this.max_objects && this.level < this.max_levels) {

        //split if we don't already have subnodes
        if (!this.nodes.length) {
            this.split();
        }

        //add all objects to their corresponding subnode
        for (i = 0; i < this.objects.length; i++) {
            indexes = this.getIndex(this.objects[i]);
            for (var k = 0; k < indexes.length; k++) {
                this.nodes[indexes[k]].insert(this.objects[i]);
            }
        }

        //clean up this node
        this.objects = [];
    }
};


/**
 * Return all objects that could collide with the given object
 * @param {Rect} pRect      bounds of the object to be checked ({ x, y, width, height })
 * @return {Rect[]}         array with all detected objects
 * @memberof Quadtree
 */
Quadtree.prototype.retrieve = function (pRect) {

    var indexes = this.getIndex(pRect),
        returnObjects = this.objects;

    //if we have subnodes, retrieve their objects
    if (this.nodes.length) {
        for (var i = 0; i < indexes.length; i++) {
            returnObjects = returnObjects.concat(this.nodes[indexes[i]].retrieve(pRect));
        }
    }

    //remove duplicates
    returnObjects = returnObjects.filter(function (item, index) {
        return returnObjects.indexOf(item) >= index;
    });

    return returnObjects;
};


/**
 * Clear the quadtree
 * @memberof Quadtree
 */
Quadtree.prototype.clear = function () {

    this.objects = [];

    for (var i = 0; i < this.nodes.length; i++) {
        if (this.nodes.length) {
            this.nodes[i].clear();
        }
    }

    this.nodes = [];
};



export default class CustomQuadtreeCollision {
    private _tree = null;
    constructor(rect: { x: number, y: number, width: number, height: number }) {
        this._tree = new Quadtree(rect);
    }

    /** 更新树结构 */
    updateTree(containerNode: cc.Node) {

        if (!this._tree) {
            return;
        }

        this._tree.clear();

        const container = containerNode.children;

        for (let i = 0, l = container.length; i < l; i++) {
            const item: cc.Node = container[i];
            if (item.name.startsWith('Collider_')) {
                // 四叉树插入
                this._tree.insert(item)
            }
        }
    }

    /** 检查 */
    check(player: cc.Node) {

        const ret: { retrieve: cc.Node[], contacts: cc.Node[] } = { retrieve: [], contacts: [] };
        // const aabb = player.getBoundingBoxToWorld();
        // debugger
        // const rect = { x: aabb.x, y: aabb.y, height: aabb.height, width: aabb.width };
        const retrieveObjects = this._tree.retrieve(player);
        // console.log(retrieveObjects);
        // debugger;
        retrieveObjects.forEach(element => {
            ret.retrieve.push(element);
            // 抓出来后检查碰撞
            if (testContact(element, player)) {
                ret.contacts.push(element);
            }
        });

        return ret;
    }


    /** 移除四叉树节点 */
    clear() {
        this._tree.clear();
        this._tree = null;
    }

}


function testContact(rect1: cc.Node, rect2: cc.Node) {

    // console.log(rect1.name,'1haojiedian');
    // console.log(rect2.name,'2haojiedian');

    /**  如果相交测试的节点为自己 不进行判断 */
    if (rect1.uuid === rect2.uuid) {
        return false;
    }

    return rectRect(rect1, rect2);
}


function rectRect(a, b) {
    // jshint camelcase:false

    const a_min_x = a.x;
    const a_min_y = a.y;
    const a_max_x = a.x + a.width * a.scale;
    const a_max_y = a.y + a.height * a.scale;

    const b_min_x = b.x;
    const b_min_y = b.y;
    const b_max_x = b.x + b.width * b.scale;
    const b_max_y = b.y + b.height * b.scale;

    return a_min_x <= b_max_x && a_max_x >= b_min_x && a_min_y <= b_max_y && a_max_y >= b_min_y;

}