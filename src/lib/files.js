import path from "path";
import fs from "fs";
import Promise from "bluebird";
import config from '../config/config';

const PHOTOS_PATH = path.join(process.cwd(), config.photoPath);

module.exports = {
    getPhotoFile: (filename) => {
        return new Promise( (resolve, reject) => {
            let filePath = path.join(PHOTOS_PATH, filename);

            try {
                fs.accessSync(filePath, fs.F_OK);
            } catch(e) {
                reject(e);
            }
        });
    },
    deletePhotoFile: (filename) => {
        return new Promise( (resolve, reject) => {
            let filePath = path.join(PHOTOS_PATH, filename);
            try {
                fs.unlinkSync(filePath, fs.F_OK);
            } catch(e) {
                reject(e);
            }
            // console.log(filePath);
            // resovle({
            //     status: 'success',
            //     message: 'Delete Photo Success'
            // });
        })
    }
};
