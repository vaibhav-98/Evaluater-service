import express, { Express } from "express";

import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";

const app: Express = express();

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log("wow");

  SampleWorker('SampleQueue');

   sampleQueueProducer('SampleJob', {
       name: "Vaibhav",
       company: "PW",
       position: "Tech Enginer",
       location: "Remote | BLR | LKO"
   });

});


