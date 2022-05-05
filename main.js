/* OGD Wien Beispiel */

let stephansdom = {
    lat:48.208493,
    lng:16.373118,
    title: "Stephansdom"
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
    "Basemap Orthofoto mit Beschriftung" : L.layerGroup([L.tileLayer.provider("BasemapAT.orthofoto"),
    L.tileLayer.provider("BasemapAT.overlay")])
}).addTo(map)

/*
let sightLayer = L.featureGroup();

layerControl.addOverlay(sightLayer, "Sehenswürdigkeiten");

let mrk = L.marker([stephansdom.lat, stephansdom.lng]).addTo(sightLayer)

sightLayer.addTo(map);
*/

L.control.scale({
    imperial: false
}).addTo(map);

L.control.fullscreen().addTo(map)

var miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("BasemapAT.grau"), {
        toggleDisplay: true
    }
).addTo(map);

// async heißt code läuft weiter bis Funktion fertig ist
async function loadSites(url) {
    let response = await fetch(url);
    let geojson = await response.json(url)
    console.log(geojson);

    let overlay = L.featureGroup();

    layerControl.addOverlay(overlay, "Sehenswürdigkeiten");
    overlay.addTo(map);

    L.geoJSON(geojson).addTo(overlay);
}



loadSites("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json")