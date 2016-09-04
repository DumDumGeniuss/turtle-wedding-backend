import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PhotosSchema = new Schema({
	fileName: String,
	content: String,
	sequence: Number,
	create_at: Date,
	update_at: Date
});

let Photos = mongoose.model('Photos', PhotosSchema);

export default Photos;