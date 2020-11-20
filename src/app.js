// import assert from './middlewares/v1/assert';
import bodyParser from 'body-parser'
import express from 'express';
import router from './routes';

const app = express()

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })


app.set('trust proxy', true)
app.use(urlencodedParser);
app.use(jsonParser);

app.use(router);
// app.use(assert);

export default app;