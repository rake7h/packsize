import { exec } from 'child_process';
import { promisify } from 'util';

const doExec = async (cmdString, path) => {
  const execSync = promisify(exec);

  try {
    console.log(global.WS)
    const { error, stdout, stderr } = await execSync(cmdString, {
      cwd: path || global.WS
    });

    const result = {
      error,
      stdout,
      stderr
    };

    if (error) {
      console.log(`error: ${error.message}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    if (stdout) {
      // console.log(`stdout: ${stdout}`);
    }
    return result;
  } catch (e) {
    return {
      error: e
    };
  }
};

export { doExec };
