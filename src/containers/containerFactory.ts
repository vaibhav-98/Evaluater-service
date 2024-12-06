import Docker from 'dockerode';

async function createContainer(imageName: string, cmdExecutable: string[]) {
    const docker = new Docker();
  
    try {
      const container = await docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        OpenStdin: true,
      });
      return container;
    } catch (err) {
      console.error(`Error creating container with image ${imageName}:`, err);
      throw err;
    }
  }
  
export default createContainer ;