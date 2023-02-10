<script>
  import { onMount } from "svelte";
  import { LeafletMap, GeoJSON, TileLayer } from "svelte-leafletjs";
  import 'leaflet/dist/leaflet.css';

  const API_URL = "http://localhost:8000";
  let basemap = "street";
  let geoJsonData;

  onMount(async () => {
    const response = await fetch(`${API_URL}/api/geojson`);
    const responseJson = await response.json();
    if (responseJson.status === "success") {
      geoJsonData = responseJson.result;
    }
  });

  const mapOptions = {
    center: [41.409, 2.13],
    zoom: 17,
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

<div class="map-container">
  <LeafletMap options={mapOptions}>
    {#if basemap === "street"}
      <TileLayer
        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        options={{
          minZoom: 0,
          maxZoom: 20,
          maxNativeZoom: 19,
          attribution: "© OpenStreetMap contributors",
        }}
      />
    {:else if basemap === "satellite"}
      <TileLayer
        url={"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"}
        options={{
          attribution: "ArcGIS World Imagery",
        }}
      />
    {/if}
    <GeoJSON data={geoJsonData} options={geoJsonOptions} />
  </LeafletMap>
  <div class="basemap-container">
    <button
      on:click={() => (basemap = "street")}
      class:toggle={basemap === "street"}>Street</button
    >
    <button
      on:click={() => (basemap = "satellite")}
      class:toggle={basemap === "satellite"}>Satellite</button
    >
  </div>
</div>

<style>
  .map-container {
    position: relative;
    width: 800px;
    height: 500px;
    margin: 100px auto;
  }
  .basemap-container {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999;
  }
  .basemap-container button {
    border: 0;
    border-radius: 8x;
    background-color: white;
    cursor: pointer;
  }
  .basemap-container button.toggle {
    color: white;
    background-color: rgb(100, 122, 255);
  }
  @media screen and (max-width: 960px) {
    .map-container {
      margin: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
