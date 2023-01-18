const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tours.model');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

console.log('====================================');
console.log();
console.log('====================================');

// if (process.env.NODE_ENV === 'development') {
//   DB = process.env.DATABASE_LOCAL;
//   console.log('====================================');
//   console.log('development');
//   console.log('====================================');
// } else {
//   DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
// }

mongoose
  .connect(DB, {
    connectTimeoutMS: 1000,
    // dbName: 'natours',
    // Note that mongoose will **not** pull `bufferCommands` from the query string
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('mongodb connected');
    // eslint-disable-next-line no-console
    // console.log(con.connections);
  })
  .catch((err) => {
    console.log('====================================');
    console.log('error occured');
    console.log('====================================');
    throw err;
  });

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
