import { KeyValueList } from "./linkedlist.js";

export default class HashMap {
  constructor(capacity = 8, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = [];
    this.size = 0;

    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new KeyValueList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let bucket = this.buckets[this.hash(key)];

    let target = bucket.findKey(key);
    if (!(target === null)) bucket.at(target).value = value;
    else {
      bucket.prepend(key, value);
      this.size++;
      if (this.size > this.capacity * this.loadFactor) this.grow();
    }

    // TODO: Have to grow HashMap if size > capacity * loadFactor
  }

  grow() {
    // Retrieve contents and clear buckets
    let contents = this.entries();
    this.clear();

    // Double capacity and initialize new buckets
    this.capacity *= 2;
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new KeyValueList();
    }

    // Add entries to new buckets
    contents.forEach((item) => this.set(item[0], item[1]));
    this.size = contents.length;
  }

  get(key) {
    return this.buckets[this.hash(key)].getValue(key);
  }

  has(key) {
    return this.buckets[this.hash(key)].containsKey(key);
  }

  remove(key) {
    let bucket = this.buckets[this.hash(key)];

    let target = bucket.findKey(key);
    if (target === null) return false;
    bucket.removeAt(target);
    this.size--;
    return true;
  }

  get length() {
    return this.size;
  }

  clear() {
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i].clear();
    }
    this.size = 0;
  }

  keys() {
    let result = [];
    for (let i = 0; i < this.capacity; i++) {
      result.push(...this.buckets[i].keys());
    }
    return result;
  }

  values() {
    let result = [];
    for (let i = 0; i < this.capacity; i++) {
      result.push(...this.buckets[i].values());
    }
    return result;
  }

  entries() {
    let result = [];
    for (let i = 0; i < this.capacity; i++) {
      result.push(...this.buckets[i].entries());
    }
    return result;
  }
}
