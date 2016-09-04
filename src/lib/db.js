import mongoose from 'mongoose';
import config from '../config/config';

//connetc mongoDB
const mongodbUrl = config.mongodbUrl;

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUrl);

const db = mongoose.connection;


//mongo event handler
db.on('connected', function () {  
  console.log('Mongoose default connection open to ' + mongodbUrl);
}); 

// If the connection throws an error
db.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
db.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

db.on('open', function() {
  console.log('Mongodb connection success !');
});

