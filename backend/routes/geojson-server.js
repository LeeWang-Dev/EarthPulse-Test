const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();

const dataPath = path.resolve("./") + '/static/data.geojson';

// READ geojson
router.get('/', (req, res) => {
    try {
      const readData = fs.readFileSync(dataPath, 'utf8');
      const dataObject = JSON.parse(readData);
      res.json({
          'status':'success',
          'result': dataObject
      });
    } catch (err) {
      res.json({
          'status': 'failed',
          'message': err
      });
    }  
});

module.exports = router;