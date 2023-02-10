const express = require("express");
const cors = require("cors");

const PORT = "8000";

const geojsonServerRouter = require("./routes/geojson-server");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use("/api/geojson", geojsonServerRouter);
