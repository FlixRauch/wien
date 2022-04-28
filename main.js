/* OGD Wien Beispiel */

let stephansdom = {
    lat:48.208493,
    lng:16.373118,
    title: "Sephansdom"
}

let startLayer = L.tileLayer.provider("BasemapAT.basemap")
let map = L.map("map", {
    center: [stephansdom.lat, stephansdom.lng],
    zoom: 12,
    layers: [
        startLayer
    ]
})

let layerControl = L.control.layers({
    "BasemapAT Grau" : startLayer,
}).addTo(map)