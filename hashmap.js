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
    if (typeof target === "number") bucket.at(target).value = value;
    else {
      bucket.prepend(key, value);
      this.size++;
    }
  }
}
