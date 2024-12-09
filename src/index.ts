import bodyParser from 'body-parser';
import express, { Express } from "express";

import serverConfig from "./config/serverConfig";
import runJava from './containers/runJavaDocker';
//import runPython from "./containers/runPythonDocker";
// import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";
const app: Express = express();

app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log("wow");

  SampleWorker('SampleQueue');

  
//    sampleQueueProducer('SampleJob', {
//     name: "sanket",
//     company: "Microsoft",
//     position: "Tech Enginer",
//     location: "Remote | BLR | LKO"
// }, 1);

// const code = `
// x = input()
// y = input()
// print("value of x is", x)
// print("value of y is", y)
// `;

// const inputCase = `100
// 200`;               

// runPython(code, inputCase);
const code = `
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner src = new Scanner(System.in);
        int input = src.nextInt();
        System.out.println("input value given by user: " + input);
        for (int i = 0; i < input; i++) {
            System.out.println(i);
        }
    }
}
`;

const inputCase = `10`;

runJava(code, inputCase);

});


