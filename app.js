const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

// MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use((res, req, next) => {
    console.log("Hello from the middleware function ");
    next();
});

app.use((res, req, next) => {
    const requestTime = new Date().toISOString();
    console.log(requestTime);
    next();
})

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;