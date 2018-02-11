'use strict';


const treeWalker = options => {
    const o = {
        children: 'children',
        ...options
    };
    return function walk(tr, fn) {
        let n = null;
        if (tr && tr.length) {
            for (let [i, t] of tr.entries()) {
                if (fn.call(null, t)) {
                    n = t;
                    break;
                }
                else {
                    n = walk(t[o.children], fn);
                    if (n) {
                        break;
                    }
                }
            }
        }
        return n;
    };
};
exports.treeBuilder = options => {

    const opts = {
        id: 'id',
        parent: 'parent_id',
        children: 'children',
        ...options
    };
    const tree = [];
    const walk = treeWalker(opts);
    return function toTree(table) {
        while (table.length) {
            for (let idx = table.length - 1; idx >= 0; idx --) {
                let row = table[idx];
                if (row[opts.parent] == null) {
                    tree.push({...row});
                    table.splice(idx, 1);
                }
                else {
                    let ps = walk(tree, node => {
                        return row[opts.parent] === node[opts.id];
                    });
                    if (ps) {
                        ps[opts.children] = ps[opts.children] || [];
                        ps[opts.children].push({...row});
                        table.splice(idx, 1);
                    }
                }
            }
        }
        return tree;
    }

};

exports.treeWalker = treeWalker;