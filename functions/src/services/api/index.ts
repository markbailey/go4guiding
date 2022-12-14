require('dotenv').config();
import * as express from 'express';
import * as cors from 'cors';

import v1Route, { BASE_SLUG as V1_SLUG } from './routes/v1';

const api = express();

api.use(cors());
api.get('/', (_, response) => response.status(200).send('Welcome to GO4API!'));
api.use(V1_SLUG, v1Route);

export default api;
