import { Router } from 'express';
import Photos from '../models/photos';
import multer from "multer";
import config from "../config/config"
import files from '../lib/files'

const photoUpload = multer({ dest: config.photoPath });
const photoCpUpload = photoUpload.fields([
        { name: 'photo', maxCount: 100 }]);

let routes = Router();

/*
GET /Photos
*/
routes.get('/', (req, res) => {
	let query = req.query || {}
	Photos.find(query).sort('sequence').exec( (err, Photos) => {
		if(err) {
			res.send(err);
		} else {
			res.json({
				status: 'success',
				message: 'Photos query success!',
				data: Photos
			});
		}
	});
});

/*
POST /Photos
*/
routes.post('/', photoCpUpload, (req, res) => {
	let files = req.files["photo"];
	let results = [];
	
	for(var key in files) {
		let photo= new Photos();
		photo['fileName'] = files[key].filename;
		photo.save((err, photo) => {
			if(err) {
				res.send(err);
			}
			results.push(photo);
			 if(results.length === files.length) {
				res.json({
					status: 'success',
					message: 'Photoscreate success!',
					data: photo			
				});
			}
		});
	}
});

/*
GET /Photos/:id
*/
routes.get('/:id', (req, res) => {
	Photos.findById(req.params.id, (err, photo) => {
		if(err) {
			res.send(err);
		} else {
			res.json({
				status: 'success',
				message: 'Photosget success!',
				data: photo			});
		}
	});
});

/*
PUT /Photos/:id
*/
routes.put('/:id', (req, res) => {
	Photos.findById(req.params.id, (err, photo) => {
		if(err) {
			res.send(err);
		}
		let data = req.body;
		for(var key in data) {
			photo[key] = data[key];
		}

		photo((err, photo) => {
			if(err) {
				res.send(err);
			} else {
				res.json({
					status: 'success',
					message: 'Photosupdata success!',
					data: photo				
				});
			}
		});
	});
});

/*
DELETE /Photos/:id
*/
routes.delete('/:id', (req, res) => {
	Photos.findById(req.params.id, (err, photo) => {
		files.deletePhotoFile(photo.fileName);
		Photos.remove({
			_id: req.params.id
		}, (err, Photos) => {
			if(err) {
				res.send(err);
			} else {
				res.json({
					status: 'success',
					message: 'Photosdelete success!',
					data: Photos			
				});
			}
		});
	});
});

/*
GET all categories
*/
routes.get('/info/categories', (req, res) => {
	Photos.collection
		.distinct("category",  (err, Photos) => {
		if(err) {
			res.send(err);
		} else {
			res.json({
				status: 'success',
				message: 'Photos query success!',
				data: Photos
			});
		}
	});
});

export default routes;