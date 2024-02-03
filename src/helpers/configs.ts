import type { PacksizeConfig } from "../types";
import { cosmiconfigSync } from "cosmiconfig";
import { getPackageDirGlob } from './globs';

const readConfig = (ws: string): PacksizeConfig | undefined => {
    // default config locations
    const configPaths = [ws];
    const explorer = cosmiconfigSync("packsize", {
        searchPlaces: configPaths,
    });

    try {
        const result = explorer.load(configPaths[0] + "/packsize.config.json");
        return result?.config;
    } catch (e) {
        console.log("err", e);
    }
};

const getProjectsFromConfig = (WS) => {
    const configs = readConfig(WS);

    if (!configs?.packages) {
        throw Error("NO packages found in packsize config file for size checks!");
    }

    const packages = getPackageDirGlob({
        projectRoot: WS,
        packagesGlob: configs.packages,
    });

    return packages

}

export { readConfig, getProjectsFromConfig }