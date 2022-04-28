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
    "Basemap Standard" : L.tileLayer.provider("BasemapAT.grau"),
    "Basemap Terrain" : L.tileLayer.provider("BasemapAT.terrain"),
    "Basemap Surface" : L.tileLayer.provider("BasemapAT.surface"),
    "Basemap Beschriftung" : L.tileLayer.provider("BasemapAT.overlay"),
    "Basemap Orthofoto" : L.tileLayer.provider("BasemapAT.orthofoto"),
    "Kombiniert" : L.layerGroup([L.tileLayer.provider("BasemapAT.orthofoto"),
    L.tileLayer.provider("BasemapAT.overlay")])
}).addTo(map)

let sightLayer = L.featureGroup();

layerControl.addOverlay(sightLayer, "Sehenswürdigkeiten");

let mrk = L.marker([stephandsdom.lat, stephansdom.lng]).addTo(sightLayer)