/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Deal with some deprecation warnings
mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successfully');
  });

//1. Specify a schema for our data
// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'A tour must have a name'],
//     unique: true
//   },
//   rating: {
//     type: Number,
//     default: 4.5
//   },
//   price: {
//     type: Number,
//     required: [true, 'A tour must have a price']
//   }
// });

//2. Created a tour out of the schema that we created
// const Tour = mongoose.model('Tour', tourSchema);

//3. Create new document
// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   price: 997
// });

// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => console.log('ERROR', err));

// console.log(app.get('env'));
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});