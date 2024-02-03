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
  

  export {getPackageDirGlob}