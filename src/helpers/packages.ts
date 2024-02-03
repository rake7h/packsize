import { getSizeOfPackageFile } from './size';
import packlist from 'npm-packlist';
import Arborist from '@npmcli/arborist';
import hash from 'object-hash';
import { writeSizeFile , removeFileOrDir} from './fs';

const generateSizeSnapForPacakge = async (pkgDir:string, opts = {}) => {
  // add workspace name in package data
    const pr = pkgDir.split(global.WS)[1].split('/');
    pr[pr.length - 1] = undefined;
    const ws = pr.join('');

    //TODO: read the package.json properties
    console.log(pkgDir, pr, ws);

    /**
     * get more details of package by using Arborist
     */
    const arborist = new Arborist({ path: pkgDir });
    const tree = await arborist.loadActual();

    /**
     * get list of all files that would be part of publish package. In other words,
     * all files that go in the tar ball of a package when published.
     */
    const pkgfiles = await packlist(tree);

    /**
     * get size of each file
     */
    const s = await getSizeOfPackageFile(pkgDir, pkgfiles);

    /**
     * return the sizes for each workspace
     */

    return {
      workspace: ws,
      artifacts: s
    };
};

const getSizeSnapsForProject = async (projectDir:Array<string>) => {
  try {
    const promise = projectDir.map(async(p)=>{
      // get size details
      const sizeSnap = await generateSizeSnapForPacakge(p);
      // write snap on package root
      writeSizeFile({ location: p + '/' + PACKAGE_SNAP_FILE, content: sizeSnap });
    })
    await Promise.all(promise)
  } catch (e) {
    console.error('getSizeSnapsForProject catch')
    throw e
  }
};

const clearSizeSnapsForProject = async (projectDir:Array<string>) => {
  try {

    const promise = projectDir.map(async(p)=>{
      // write snap on package root
      removeFileOrDir(p + '/' + PACKAGE_SNAP_FILE)
    })
    await Promise.all(promise)
  } catch (e) {
    console.error('clearSizeSnapsForProject catch')
    throw e
   
  }
};

export { getSizeSnapsForProject, clearSizeSnapsForProject };
