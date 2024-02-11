import fastGlob from "fast-glob";

interface GetPackageDirGlob {
    projectRoot: string;
    packagesGlob: string[];
  }

// find all pacakges directories by glob
const getPackageDirGlob = ({
    projectRoot,
    packagesGlob,
  }: GetPackageDirGlob): string[] => {
    const packages = fastGlob.sync(packagesGlob, {
      cwd: projectRoot,
      onlyDirectories: true,
      absolute: true,
    });
    return packages;
  };
  

  function parsePackagePath(packagePath) {
    const regex = /\/([^/]+)\/([^/]+)\/([^/]+)$/;
  
    const match = packagePath.match(regex);
  
    if (match) {
      const [, repoName, workspaceName, packageName] = match;
      return {
        repoName,
        workspaceName,
        packageName
      };
    }
  
    return null;
  }
  export {getPackageDirGlob, parsePackagePath}