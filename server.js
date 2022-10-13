const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const app = require(`${__dirname}/app`);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB Connected Successfully"));

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    rating: {
        type: Number,
        default: 4.5
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: "The Forest Hiker",
    rating: 4.7,
    price: 497
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});