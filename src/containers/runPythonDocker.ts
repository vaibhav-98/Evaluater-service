
// import Docker from 'dockerode';
// import { TestCase } from '../types/testCases';

import { PYTHON_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';

async function runPython(code: string) {
   
    console.log("Initialing a new python docker container");
    

    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty-echo']);
    
    // starting / booting the corresponding docker container 
    await pythonDockerContainer.start();

    console.log("Started the docker container");

    return pythonDockerContainer;
    
}

export default runPython ;


