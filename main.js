import HashSet from "./hashset.js";

const hs = new HashSet();

hs.set("Tiger");
hs.set("Elepant");
hs.set("Giraffe");
hs.set("Beetle");
hs.set("Lion");
hs.set("Eagle");
hs.set("Velociraptor");
hs.set("Falcon");

console.log(hs.keys(), hs.clear(), hs.keys(), hs);
