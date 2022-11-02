const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require(`${__dirname}/../../models/tourModel`);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB Connected Successfully"));

// Read JSON File   
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data to Database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data imported successfully!");
        process.exit();
    }
    catch (err) {
        console.error(err);
    }
}

// Delete all data already existing
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data deleted successfully");
        process.exit();
    }
    catch (err) {
        console.error(err);
    }
}

// node dev-data/data/import-dev-data.js --import
if (process.argv[2] === '--import') {
    importData();
}
// node dev-data/data/import-dev-data.js --import
else if (process.argv[2] === '--delete') {
    deleteData();
}