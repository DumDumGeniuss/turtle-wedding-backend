import { Router } from 'express';
import config from "../config/config"
import files from '../lib/files'


let routes = Router();


routes.get("/photos/:fileName", (req, res, next) => {
    files.getPhotoFile(req.params.fileName)
        .then( (result) => {
            res.contentType(result.fileMime)
                .status(200)
                .sendFile(result.filePath, (err) => {
                    if (err) { next(err); }
                });
        })
        .catch( (err) => {
            next(err);
        });
});


export default routes;