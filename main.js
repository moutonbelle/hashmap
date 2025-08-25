import HashMap from "./hashmap.js";

let hm = new HashMap();

hm.set("Tiger", "Rabbit");
hm.set("Eagle", "Trout");

console.log(hm);

console.log(hm.remove("Elephant"));
console.log(hm.remove("Tiger"));

console.log(hm);
