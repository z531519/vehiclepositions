import express, {  } from 'express';
import { initRedisClient } from './redis';
import geojson from 'geojson';
import cors from 'cors';



const startApi = async () => {
  const app = express();
  app.use(cors());
  const port = process.env.PORT || 8080;

  const client = await initRedisClient();

  app.get("/vehicle/positions", async (req, res) => {
    const list = await client.keys("veh:oday:*")
    const veh = list.map((raw) => raw.split(":")[2]);
    return res.send(veh);
  });

  app.get("/vehicle/positions/:veh", async (req, res) => {
    const list = await client.sMembers(`veh:oday:${req.params.veh}`)
   
    return res.send(list);
  });

  app.get("/vehicle/positions/:veh/:oday", async (req, res) => {
    const list = await client.lRange(`veh:geo:${req.params.veh}:${req.params.oday}`, 0, -1)
    const points = list.map((raw) => {
      const vp = JSON.parse(raw);
      return vp;
    })
    
    return res.send(points);
  });


  app.get("/vehicle/positions/:veh/:oday/geojson", async (req, res) => {
    const list = await client.lRange(`veh:geo:${req.params.veh}:${req.params.oday}`, 0, -1)
    const points = list.map((raw) => {
      const vp = JSON.parse(raw);
      return { latitude: vp.lat, longitude: vp.long, ...vp };
    })
    
    const geojsonObject = geojson.parse(points, {
      Point: ['latitude', 'longitude'],
    });

    const response = geojsonObject;

    res.send(response);

  });


  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
};

export default startApi;
