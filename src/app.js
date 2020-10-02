import express from 'express';
import router from './routes';
import assert from './middlewares/assert';


const app = express()



app.use(router);
app.use((req, res, next) => {
    res.error(`Some of the aliases you requested do not exist: ${req.path}`, 404);
});
app.use(assert)
export default app;