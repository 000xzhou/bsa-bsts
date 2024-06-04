class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    // Defind the root if root is empty
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    // start at root of tree
    let current = this.root;

    while (true) {
      if (val < current.val) {
        // If the left child is null, insert the new node here
        if (current.left === null) {
          current.left = newNode;
          // Exit the loop and return the tree
          return this;
        } else {
          // Move to the left child and continue the loop
          current = current.left;
        }
      } else {
        // If the right child is null, insert the new node here
        if (current.right === null) {
          current.right = newNode;
          // Exit the loop and return the tree
          return this;
        } else {
          // Move to the right child and continue the loop
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);

    // Defind the root if root is empty
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    // Pass the root and new node into isnertNode
    insertNode(this.root, newNode);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current !== null) {
      if (val == current.val) return current;
      else if (val < current.val) {
        // move mid to left
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    return findHelper(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let arr = [];

    const traverse = (node) => {
      if (node === null) return;

      arr.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let arr = [];

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      arr.push(node.val);
      traverse(node.right);
    };

    traverse(this.root);
    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let arr = [];

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);
      arr.push(node.val);
    };

    traverse(this.root);
    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let arr = [];
    let queue = [];

    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      // Remove the first from queue
      let current = queue.shift();

      if (current !== null) {
        // if current isn't empty add to arr
        arr.push(current.val);

        if (current.left !== null) {
          // if current isn't empty and left isn't empty add to queue
          queue.push(current.left);
        }

        if (current.right !== null) {
          queue.push(current.right);
        }
      }
    }

    return arr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    // look for the node
    const nodeToRemove = this.find(val);
    // no node found
    if (nodeToRemove === undefined) return null;

    const removeNode = (node, val) => {
      if (node === null) return null;

      if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.val) {
        node.right = removeNode(node.right, val);
        return node;
      } else {
        // Node with no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // Node with one child
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        // Node with two children
        let tempNode = smallNode(node.right);
        node.val = tempNode.val;
        node.right = removeNode(node.right, tempNode.val);
        return node;
      }
    };

    this.root = removeNode(this.root, val);
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {}
}

// helpers
const insertNode = (current, newNode) => {
  if (newNode.val < current.val) {
    // If the left child is null, insert the new node here
    if (current.left === null) {
      current.left = newNode;
      // Exit the loop and return the tree
      return this;
    } else {
      // Pass on the left child and continue
      insertNode(current.left, newNode);
    }
  } else {
    // If the right child is null, insert the new node here
    if (current.right === null) {
      current.right = newNode;
      // Exit the loop and return the tree
      return this;
    } else {
      // Pass on the right child and continue
      insertNode(current.right, newNode);
    }
  }
};

const findHelper = (current, val) => {
  if (current === null) return undefined;
  // value found
  if (val === current.val) return current;

  if (val < current.val) {
    // move mid to left
    return findHelper(current.left, val);
  } else {
    // move mid to right
    return findHelper(current.right, val);
  }
};

const smallNode = (node) => {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
};

module.exports = BinarySearchTree;
