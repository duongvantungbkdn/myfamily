const userRouter = require('./userRouter');
const dataRouter = require('./dataRouter');
const publicRouter = require('./publicRouter');
const adminRouter = require('./adminRouter');
const verifyToken = require('../middlewaresAndHelpers/verifyToken');
const checkUserRole = require('../middlewaresAndHelpers/checkUserRole');

function route(app) {
    // login/register user
    app.use('/user',verifyToken, userRouter);

    // private: only admin have access permission
    app.use('/admin', verifyToken, checkUserRole(['ADM','ADM1']), adminRouter);

    // private: only admin and member user have access permission
    app.use('/data',verifyToken, checkUserRole(['ADM','ADM1','MEM']), dataRouter);

    //public veryone have access permission
    app.use('/', verifyToken, publicRouter);
}

module.exports = route;
