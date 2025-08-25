import HashMap from "./hashmap.js";

let hm = new HashMap();

hm.set("Tiger", "Rabbit");
console.log(hm);
console.log(hm.buckets[7].toString());

hm.set("Tiger", "Squirrel");
console.log(hm.buckets[7].toString());

console.log(hm.get("Tiger"));
console.log(hm.get("Elephant"));
