import express from 'express';

import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { api } from './api';

const app = express();
const port = process.env.PORT ?? 3000;
app.set('port', port);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // set to false when done with project

app.use('/api', api);

app.listen(port, () => {
    console.log(
        `Forum now running on Port ${app.get('port') as number} in ${
            app.get('env') as string
        } environment 👌`
    );
});
