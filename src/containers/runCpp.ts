
// import Docker from 'dockerode';
// import { TestCase } from '../types/testCases';

import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';

async function runCpp(code: string, inputTestCase: string) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowLogBuffer: Buffer[] = [] ;
   
    console.log("Initialising a new java docker container");
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
    console.log(runCommand);
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 
    // starting / booting the corresponding docker container 
    await cppDockerContainer.start();

    console.log("Started the docker container");

    const loggerStram = await cppDockerContainer.logs({
          stdout: true,
          stderr: true,
          timestamps: false,
          follow: true, // whether the logs are streamed or returned as a string
    });

    // Attach events on the stream objects to start and stop reading
    loggerStram.on('data', (chunk) => {
        rowLogBuffer.push(chunk);
    });
     

    await new Promise( (res) => {
        loggerStram.on('end', () => {
            console.log(rowLogBuffer);
            const completeBuffer = Buffer.concat(rowLogBuffer);
            const decodeStream = decodeDockerStream(completeBuffer);
            console.log(decodeStream);
            console.log(decodeStream.stdout);
            res(decodeDockerStream);
            
        });
    });
   
       // remove the container when done with it
       await cppDockerContainer.remove();
    
}

export default runCpp ;


