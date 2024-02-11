import path from 'path';
import { getSizeOfPackageFile } from './size';
import packlist from 'npm-packlist';
import Arborist from '@npmcli/arborist';
import hash from 'object-hash';
import { writeSizeFile, removeFileOrDir, readJsonFile } from './fs';
import * as jsondiffpatch from 'jsondiffpatch';
import {success} from './logger';
import {parsePackagePath} from './globs';
import chalk from "chalk";

const generateSizeSnapForPackage = async (pkgDir, opts = {}) => {
  const {packageName, workspaceName} = parsePackagePath(pkgDir)
  try {
    // Get more details of the package using Arborist
    const arborist = new Arborist({ path: pkgDir });
    const tree = await arborist.loadActual();

    // Get list of all files that would be part of the publish package
    const pkgfiles = await packlist(tree);

    // Get size of each file
    const s = await getSizeOfPackageFile(pkgDir, pkgfiles);

    // Return the sizes for each workspace
    return {
      package: workspaceName+'/'+packageName,
      hash: hash(s),
      artifacts: s
    };
  } catch (e) {
    console.error(`Error generating size snapshot for package at ${pkgDir}:`, e);
    throw e;
  }
};

const getSizeSnapsForProject = async (projectDir, callback) => {
  try {
    const promises = projectDir.map(async (p) => {
      // Get size details
      const sizeSnap = await generateSizeSnapForPackage(p);
      callback({ location: p, snap: sizeSnap });
    });

    await Promise.all(promises);
  } catch (e) {
    console.error('getSizeSnapsForProject catch', e);
    throw e;
  }
};

const getPresentSnapOfProject = (projectDir) => {
  try {
    return readJsonFile({ path: path.join(projectDir, PACKAGE_SNAP_FILE) });
  } catch (e) {
    console.error('getPresentSnapOfProject catch', e);
    throw e;
  }
};

const writeSizeSnapForProject = (projectDir) => {
  // Write snap on the package root
  const snapWriter = ({ location, snap }) => {
    writeSizeFile({ location: path.join(location, PACKAGE_SNAP_FILE), content: snap });
  };

  getSizeSnapsForProject(projectDir, snapWriter);
};

const compareSnaps = async (projectDir) => {
  // For each package, compare present and updated snap
  const promises = projectDir.map(async (p) => {
    const presentSnap = getPresentSnapOfProject(p);
    const updatedSnap = await generateSizeSnapForPackage(p);

    if (presentSnap.hash === updatedSnap.hash) {
      console.log(chalk.green('✅ Packsize'), chalk.blue.bold((updatedSnap.package)));
    } else {
      console.log(chalk.red('❌ Packsize'), chalk.blue.bgRed.bold((updatedSnap.package)));
      console.log(JSON.stringify(jsondiffpatch.diff(presentSnap, updatedSnap), null, 2));
    }
  });
  await Promise.all(promises);
};

const clearSizeSnapsForProject = async (projectDir) => {
  try {
    const promises = projectDir.map(async (p) => {
      // Write sizesnap at the package root
      removeFileOrDir(path.join(p, PACKAGE_SNAP_FILE));
    });

    await Promise.all(promises);
  } catch (e) {
    console.error('clearSizeSnapsForProject catch', e);
    throw e;
  }
};

export { getSizeSnapsForProject, clearSizeSnapsForProject, writeSizeSnapForProject, compareSnaps };
