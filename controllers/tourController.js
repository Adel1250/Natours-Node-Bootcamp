// const fs = require('fs');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const Tour = require(`${__dirname}/../models/tourModel`);

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

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        // results: tours.length,
        // data: {
        //     tours
        // }
    });
};

exports.getTour = (req, res) => {
    // const tour = tours.find(el => el.id === req.params.id * 1);
    res.status(200).json({
        status: "success",
        // data: {
        //     tour
        // }
    });
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

exports.updateTour = (req, res) => {
    // const tour = tours.find(el => el.id === req.params.id * 1);
    res.status(200).json({
        status: "success",
        data: {
            tour: "<Update tour here!>"
        }
    });
};

exports.deleteTour = (req, res) => {
    // const tour = tours.find(el => el.id === req.params.id * 1);
    res.status(204).json({
        status: "success",
        data: null
    });
};