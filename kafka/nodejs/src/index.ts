import * as dotenv from "dotenv";

import startApi from "./api";
import startConsumer from "./consumer";
import startTransformer from "./transformer";


const app = async (): Promise<void> => {
  console.log("SampleJS");

  dotenv.config();
  console.log(process.env.BOOTSTRAP_SERVERS)
  startTransformer();
  startConsumer();
  startApi();
  return Promise.resolve();
};

export default app;

app();
