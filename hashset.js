import { List } from "./linkedlist.js";

export default class HashSet {
  constructor(capacity = 8, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = [];
    this.size = 0;

    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new List();
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

  set(key) {
    let bucket = this.buckets[this.hash(key)];

    let target = bucket.find(key);
    if (target === null) {
      bucket.prepend(key);
      this.size++;
      if (this.size > this.capacity * this.loadFactor) this.grow();
    }
  }

  grow() {
    // Retrieve contents and clear buckets
    let contents = this.keys();
    this.clear();

    // Double capacity and initialize new buckets
    this.capacity *= 2;
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new List();
    }

    // Add entries to new buckets
    contents.forEach((item) => this.set(item));
  }

  get(key) {
    return this.has(key);
  }

  has(key) {
    return this.buckets[this.hash(key)].contains(key);
  }

  remove(key) {
    let bucket = this.buckets[this.hash(key)];

    let target = bucket.find(key);
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
      result.push(...this.buckets[i].values());
    }
    return result;
  }

  entries() {
    return this.keys();
  }
}
