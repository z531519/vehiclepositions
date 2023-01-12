import express, { Express, Request, Response } from 'express';
import { initRedisClient } from './redis';
import geojson, {GeoJSON} from 'geojson';
import cors from 'cors';

import request from 'request';

import tokml from '@maphubs/tokml'

const startApi = async () => {
  const app = express();
  app.use(cors());
  const port = process.env.PORT || 8080;

  const client = await initRedisClient();

  app.get("/vehicle/positions", async (req, res) => {
    const list = await client.keys("*")
    return res.send(list);
  });

  app.get("/vehicle/positions/:id", async (req, res) => {
    const list = await client.lRange(req.params.id, 0, -1)
    const points = list.map((raw) => {
      const vp = JSON.parse(raw);
      return vp;
    })
    
    return res.send(points);
  });

  app.get("/vehicle/positions/:id/geo", async (req, res) => {
    const list = await client.lRange(req.params.id, 0, -1)
    const points = list.map((raw) => {
      const vp = JSON.parse(raw);
      return { latitude: vp.lat, longitude: vp.long };
    })
    
    const geojsonObject = geojson.parse(points, {
      Point: ['latitude', 'longitude'],
    });

    const response = tokml(geojsonObject);

    const encoded = encodeURIComponent(JSON.stringify(geojsonObject));

    res.redirect("http://geojson.io/#data=data:application/json," + encoded);

    // res.contentType('application/vnd.google-earth.kml+xml').send(response);
  });

  app.get("/vehicle/positions/:id/geojson", async (req, res) => {
    const list = await client.lRange(req.params.id, 0, -1)
    const points = list.map((raw) => {
      const vp = JSON.parse(raw);
      return { latitude: vp.lat, longitude: vp.long };
    })
    
    const geojsonObject = geojson.parse(points, {
      Point: ['latitude', 'longitude'],
    });

    const response = geojsonObject;

    res.send(response);

  });

  app.get("/vehicle/positions/:id/geojson2", async (req, res) => {
    const list = await client.lRange(req.params.id, 0, -1)
    const lines = list.map((raw) => {
      const vp = JSON.parse(raw);
      return [   vp.long, vp.lat, ];
    })

    const points = list.map((raw) => {
      const vp = JSON.parse(raw);
      return { latitude: vp.lat, longitude: vp.long };
    })
    
    // const geojsonObject = geojson.parse([{
    //   lines
    // }], {
    //   LineString: 'lines',
    // });

    const geojsonObject = geojson.parse(points, {
      Point: ['latitude', 'longitude'],
    });

    // geojsonObject.features = [...geojsonObject.features, ...geojsonPoints.features];

    const response = geojsonObject;

    res.send(response);

  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
};

export default startApi;
