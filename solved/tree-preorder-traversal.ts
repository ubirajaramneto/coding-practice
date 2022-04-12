// https://www.hackerrank.com/challenges/tree-preorder-traversal/problem?isFullScreen=true

const testCase:Array<number> = [52,7,4,98,12,8,14,3,62];

/*
* HackerRank has a weird way for dealing with BTrees for Typescript, and it appears the Typescript
* version of the challenge is broken, so I will just code it here and assert with some visualization tools.
* Also I will just implement all the methods, so I can have as a reference for the future challenges.
* */

class TNode {

  key: any;
  left: TNode | undefined;
  right: TNode | undefined;

  constructor(key) {
    this.key = key;
    this.left = undefined;
    this.right = undefined;
  }
}

class BinarySearchTree {
  root: TNode

  constructor() {
    this.root = undefined;
  }

  insert(key: any) {
    if (!this.root) {
      this.root = new TNode(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  private insertNode(node:TNode, key: any) {
    if (key < node.key) {
      if (!node.left) {
        node.left = new TNode(key);
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (!node.right) {
        node.right = new TNode(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  inOrderTraversal(node, callback) {
    if (node) {
      this.inOrderTraversal(node.left, callback);
      callback(node.key);
      this.inOrderTraversal(node.right, callback);
    }
  }

  preOrderTraversal(node, callback) {
    if (node) {
      callback(node.key);
      this.preOrderTraversal(node.left, callback);
      this.preOrderTraversal(node.right, callback);
    }
  }

  postOrderTraversal(node, callback) {
    if (node) {
      this.postOrderTraversal(node.left, callback);
      this.postOrderTraversal(node.right, callback);
      callback(node.key);
    }
  }

  min(node:TNode = this.root):any | undefined {
    let current = node;
    while (current.left) {
      current = current.left
    }
    return current.key;
  }

  max(node:TNode = this.root): any | undefined {
    let current = node;
    while (current.right) {
      current = current.right
    }
    return current.key;
  }

  remove(key: any) {
    this.root = this.removeNode(key, this.root);
  }

  protected removeNode(key:any, node:TNode) {
    /*
    * First, we want to find the specified key inside the tree.
    */
    if(!node) {
      return undefined;
    }
    if (key < node.key) {
      node.left = this.removeNode(key, node.left);
      return node;
    } else if(key > node.key ) {
      node.right = this.removeNode(key, node.right);
      return node;
    } else {
      /*
      * Case 1: Remove leaf node.
      */
      if (!node.left && !node.right) {
        console.log('FOUND LEAF FOR REMOVAL: ', node);
        node = undefined;
        return node;
      }
      /*
      * Case 2: Remove node with at least one child
      */
      if (!node.left || !node.right) {
        console.log('FOUND NODE WITH AT LEAST ONE CHILD: ', node);
        if (!node.left && node.right) {
          return node.right;
        }
        if (!node.right && node.left) {
          return node.left;
        }
      }
      /*
      * Case 3: Remove node with 2 children
      */
      if (node.left && node.right) {
        let aux = this.max(node.left);
        node = this.removeNode(aux, node);
        node.key = aux;
      }
    }
    return node;
  }
}

const tree = new BinarySearchTree();

for (let i = 0; i < testCase.length; i++) {
  tree.insert(testCase[i]);
}

console.log('TREE: ', JSON.stringify(tree, null, 2));
tree.inOrderTraversal(tree.root, (key) => {console.log('traversing in order: ', key)});
tree.preOrderTraversal(tree.root, (key) => {console.log('traversing pre order: ', key)});
tree.postOrderTraversal(tree.root, (key) => {console.log('traversing post order: ', key)});
tree.remove(12);
tree.remove(98);
console.log('TREE AFTER REMOVAL: ', JSON.stringify(tree, null, 2));