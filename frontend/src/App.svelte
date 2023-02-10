<script>
  import { onMount } from "svelte";
  import { LeafletMap, GeoJSON, TileLayer } from "svelte-leafletjs";

  const API_URL = "http://localhost:8000";

  let geoJsonData;

  onMount(async () => {
    const response = await fetch(`${API_URL}/api/geojson`);
    const responseJson = await response.json();
    if (responseJson.status === "success") {
      geoJsonData = responseJson.result;
      console.log(geoJsonData);
    }
  });

  const mapOptions = {
    center: [41.40959, 2.13009],
    zoom: 16,
  };
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 19,
    attribution: "© OpenStreetMap contributors",
  };
  const geoJsonOptions = {
    style: function (geoJsonFeature) {
      //   console.log("style", geoJsonFeature);
      return {
        color: "#ff0000",
        stroke: true,
      };
    },
  };
</script>

<div class="mapContainer">
  <LeafletMap options={mapOptions}>
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    <GeoJSON data={geoJsonData} options={geoJsonOptions} />
  </LeafletMap>
</div>

<style>
  .mapContainer {
    position: relative;
    width: 800px;
    height: 500px;
    margin: 100px auto;
  }
</style>
