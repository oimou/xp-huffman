"use strict";

let src = "Hello world";

class HuffmanTreeNode {
    constructor(value, count, left, right) {
        this.value = value;
        this.count = count;
        this.left = left;
        this.right = right;
    }

    isLessThan(node) {
        return this.count < node.count;
    }
}

let dict = {};

src.split("").forEach((c) => {
    dict[c] = (dict[c] || 0) + 1;
});

let nodes = [];

for (let value in dict) {
    let node = new HuffmanTreeNode(value, dict[value], null, null);

    nodes.push(node);
}

while (1 < nodes.length) {
    let min1 = spliceMinimumNode(nodes);
    let min2 = spliceMinimumNode(nodes);

    let node = new HuffmanTreeNode(null, min1.count + min2.count, min1, min2);

    nodes.push(node);
}

stringifyNodes(nodes);

function spliceMinimumNode(nodes) {
    let min = 0;

    nodes.forEach((node, i) => {
        if (node.isLessThan(nodes[min])) {
            min = i;
        }
    });

    return nodes.splice(min, 1)[0];
}

function stringifyNodes(nodes) {
    let rendererTree = [];
    let i = 0;

    traversePreorder(nodes[0], (err, n, depth) => {
        if (err) {
            return console.error(err);
        }

        n.x = i++;
        n.y = depth;

        rendererTree[n.y] = rendererTree[n.y] || [];
        rendererTree[n.y][n.x] = n.count;
    });

    for (let y = 0; y < rendererTree.length; y++) {
        let line = rendererTree[y];
        let str = "";

        for (let x = 0; x <= i; x++) {
            let v = line[x];

            str += v ? ("00" + v).slice(-2) : "..";
        }

        console.log(str);
    }
}

function traversePreorder(node, cb, depth) {
    depth = depth || 0;

    if (node.left !== null) {
        traversePreorder(node.left, cb, depth + 1);
    }

    cb(null, node, depth);

    if (node.right !== null) {
        traversePreorder(node.right, cb, depth + 1);
    }
}
