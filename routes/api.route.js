

let authRouter = require('./auth.route');
let userRouter = require('./user.route');

module.exports = function(app){

    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
};
