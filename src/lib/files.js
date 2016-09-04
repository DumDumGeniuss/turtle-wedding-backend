import path from "path";
import fs from "fs";
import Promise from "bluebird";
import mmm from 'mmmagic';
import config from '../config/config';

const Magic = mmm.Magic;
const PHOTOS_PATH = path.join(process.cwd(), config.photoPath);

module.exports = {
    getPhotoFile: (filename) => {
        return new Promise( (resolve, reject) => {
            let filePath = path.join(PHOTOS_PATH, filename);
            let magic = new Magic(mmm.MAGIC_MIME_TYPE);

            try {
                fs.accessSync(filePath, fs.F_OK);
            } catch(e) {
                reject(e);
            }

            magic.detectFile(filePath, function(err, result) {
                if (err) { reject(err) };
                resolve({ filePath: filePath, fileMime:result });
            });
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
