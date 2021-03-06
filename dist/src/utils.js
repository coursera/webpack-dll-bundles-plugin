"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var fs = require("fs");
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
exports.deleteFolderRecursive = deleteFolderRecursive;
;
function resolveConfig(config) {
    if (typeof config === 'string') {
        return resolveConfig(require(config));
    }
    else if (typeof config === 'function') {
        return config();
    }
    else if (config.__esModule === true && !!config.default) {
        return resolveConfig(config.default);
    }
    else {
        return config;
    }
}
exports.resolveConfig = resolveConfig;
function runWebpack(config) {
    return {
        done: new Promise(function (RSV, RJT) {
            return webpack(resolveConfig(config), function (err, stats) {
                if (err) {
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                }
                var info = stats.toJson();
                if (stats.hasErrors()) {
                    console.error(info.errors);
                }
                return err ? RJT(err) : RSV(stats);
            });
        })
    };
}
exports.runWebpack = runWebpack;
//# sourceMappingURL=utils.js.map