import * as mqtt from "mqtt"  // import everything inside the mqtt module and give it the namespace "mqtt"
let client = mqtt.connect({host: '192.168.15.5', port: 1883})
client.publish("luiz/temperatura", "22")
console.log("Publicado");

