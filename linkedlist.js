export class List {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  get tail() {
    // If list is empty, return null
    if (this.head === null) return null;

    // Traverse the list to the last node
    let curr = this.head;
    while (curr.next != null) curr = curr.next;
    return curr;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  append(value = null) {
    let newNode = new Node(value);

    if (this.head === null) this.head = newNode;
    else this.tail.next = newNode;

    this.length++;
  }

  prepend(value = null) {
    let newNode = new Node(value);

    if (this.head === null) this.head = newNode;
    else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  at(i) {
    i = Number(i);
    // If index is beyond list, return null
    if (i >= this.length) return null;

    if (i === 0) return this.head;

    // Otherwise traverse the list to index i
    let target = this.head;
    for (let j = 0; j < i; j++) target = target.next;
    return target;
  }

  pop() {
    // If list is empty, return null
    if (this.head === null) return null;

    // If list has only one element, pop it
    if (this.length === 1) {
      let target = this.head;
      this.head = null;
      this.length--;
      return target;
    }

    // Else traverse to second to last node and pop last node
    let newTail = this.head;
    while (newTail.next.next !== null) newTail = newTail.next;
    let target = newTail.next;
    newTail.next = null;
    this.length--;
    return target;
  }

  contains(value) {
    // If list is empty, it does not contain value => return false
    if (this.head === null) return false;

    // Else, traverse list, testing each node for value
    let curr = this.head;
    while (curr !== null) {
      if (curr.value == value) return true;
      curr = curr.next;
    }

    // Reached end of list; value not contained
    return false;
  }

  find(value) {
    // If list is empty, it does not contain value => return null
    if (this.head === null) return null;

    // Else, traverse list, testing each node for value and tracking index
    let curr = this.head;
    let i = 0;
    while (curr !== null) {
      if (curr.value == value) return i;
      curr = curr.next;
      i++;
    }

    // Reached end of list; value not contained
    return null;
  }

  toString() {
    if (this.head === null) return "null";

    let result = "";
    let curr = this.head;
    result += `( ${curr.value} ) -> `;
    while (curr.next !== null) {
      curr = curr.next;
      result += `( ${curr.value} ) -> `;
    }
    result += "null";

    return result;
  }

  insertAt(value, index) {
    // If index beyond list, error
    if (index >= this.length) return null;

    // Special cases of prepend or append
    if (index === 0) this.prepend(value);
    else if (index === this.length - 1) this.append(value);
    else {
      // If index is in middle of the list, traverse to node before index
      let curr = this.head;
      let i = 0;
      while (i < index - 1) {
        curr = curr.next;
        i++;
      }

      // Insert new node
      let newNode = new Node(value);
      newNode.next = curr.next;
      curr.next = newNode;
      this.length++;
    }
  }

  removeAt(index) {
    // If index beyond list, error
    if (index >= this.length) return null;

    // If removing head . . .
    if (index === 0) {
      this.head = this.head.next;
      this.length--;
    } else {
      // Else traverse the list to predecessor
      let i = 0,
        curr = this.head;
      while (i < index - 1) {
        curr = curr.next;
        i++;
      }
      curr.next = curr.next.next;
      this.length--;
    }
  }
}

class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
  }
}

class KeyValueNode extends Node {
  constructor(key = null, value = null) {
    super(value);
    this.key = key;
  }
}

export class KeyValueList extends List {
  append(key = null, value = null) {
    let newNode = new KeyValueNode(key, value);

    if (this.head === null) this.head = newNode;
    else this.tail.next = newNode;

    this.length++;
  }

  prepend(key = null, value = null) {
    let newNode = new KeyValueNode(key, value);

    if (this.head === null) this.head = newNode;
    else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  containsKey(key) {
    // If list is empty, it does not contain key => return false
    if (this.head === null) return false;

    // Else, traverse list, testing each node for key
    let curr = this.head;
    while (curr !== null) {
      if (curr.key == key) return true;
      curr = curr.next;
    }

    // Reached end of list; key not contained
    return false;
  }

  findKey(key) {
    // If list is empty, it does not contain key => return null
    if (this.head === null) return null;

    // Else, traverse list, testing each node for key and tracking index
    let curr = this.head;
    let i = 0;
    while (curr !== null) {
      if (curr.key == key) return i;
      curr = curr.next;
      i++;
    }

    // Reached end of list; key not contained
    return null;
  }

  getValue(key) {
    let location = this.findKey(key);
    if (location === null) return null;
    return this.at(location).value;
  }

  toString() {
    if (this.head === null) return "null";

    let result = "";
    let curr = this.head;
    result += `( ${curr.key}: ${curr.value} ) -> `;
    while (curr.next !== null) {
      curr = curr.next;
      result += `( ${curr.key}: ${curr.value} ) -> `;
    }
    result += "null";

    return result;
  }

  insertAt(key, value, index) {
    // If index beyond list, error
    if (index >= this.length) return null;

    // Special cases of prepend or append
    if (index === 0) this.prepend(key, value);
    else if (index === this.length - 1) this.append(key, value);
    else {
      // If index is in middle of the list, traverse to node before index
      let curr = this.head;
      let i = 0;
      while (i < index - 1) {
        curr = curr.next;
        i++;
      }

      // Insert new node
      let newNode = new KeyValueNode(key, value);
      newNode.next = curr.next;
      curr.next = newNode;
      this.length++;
    }
  }

  keys() {
    if (this.head === null) return [];
    else {
      let curr = this.head,
        result = [];
      while (curr !== null) {
        result.push(curr.key);
        curr = curr.next;
      }
      return result;
    }
  }

  values() {
    if (this.head === null) return [];
    else {
      let curr = this.head,
        result = [];
      while (curr !== null) {
        result.push(curr.value);
        curr = curr.next;
      }
      return result;
    }
  }
}
