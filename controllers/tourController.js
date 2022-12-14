// const fs = require('fs');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const Tour = require(`${__dirname}/../models/tourModel`);
const APIFeatures = require(`${__dirname}/../utils/APIFeatures.js`);

exports.alias = (req, res, next) => {
    req.query.sort = '-ratingsAverage,price';
    req.query.limit = '5';
    req.query.fields = 'ratingsAverage,name,price,summary';
    next();
}

// Example for explaining middlewares
// exports.checkID = (req, res, next, val) => {
//     console.log(`The id of the tour is: ${val}`);
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: "fail",
//             message: "Invalid ID"
//         });
//     }
//     next();
// }

// Example for explaining middlewares
// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: "fail",
//             message: "No price or name"
//         });
//     }
//     next();
// };

exports.getAllTours = async (req, res) => {
    try {
        // Query Building
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        // Execute the Query
        const tours = await features.query;

        // Send Response
        res.status(200).json({
            status: "success",
            results: tours.length,
            data: {
                tours
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.getTour = async (req, res) => {
    // const tour = tours.find(el => el.id === req.params.id * 1);
    try {
        const tour = await Tour.findById(req.params.id);
        // const tour = Tour.findOne({ _id: req.params.id}) --> Another way
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
    // const newId = tours[tours.length - 1].id + 1;
    // const newTour = Object.assign({ id: newId }, req.body);
    // tours.push(newTour);
    // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    //     res.status(201).json({
    //         status: "success",
    //         data: {
    //             tour: newTour
    //         }
    //     });
    // });
};

exports.updateTour = async (req, res) => {
    // const tour = tours.find(el => el.id === req.params.id * 1);
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.deleteTour = async (req, res) => {
    // const tour = tours.find(el => el.id === req.params.id * 1);
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null
        });
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};