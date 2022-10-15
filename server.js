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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});