//connecting mongoose
const mongoose = require('mongoose')

// const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/stat_app'
// mongoose.connect(dbConnection, { useNewUrlParser: true})
//   .then(() => {
//     console.log("mongo is working");
//   })
const connectionString = 'mongodb://localhost/stat_app';
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(connectionString, { useNewUrlParser: true })
}
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
    }
  );
  mongoose.connection.once('open', function() {
    console.log("Mongoose has connected to MongoDB!");
  });
// export your mongoose connection
module.exports = mongoose;

// const mongoose = require('mongoose');

// module.exports = mongoose;