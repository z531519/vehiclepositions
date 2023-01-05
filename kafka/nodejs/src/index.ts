import * as dotenv from "dotenv";
import startApi from "./api";
import startConsumer from "./consumer";
import startTransformer from "./transformer";
dotenv.config();

const app = async (): Promise<void> => {
  console.log("SampleJS");

  startTransformer();
  startConsumer();
  startApi();
  return Promise.resolve();
};

export default app;

app();
