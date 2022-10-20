import * as express from 'express';
import * as cors from 'cors';

import v1Route, { BASE_SLUG as V1_SLUG } from './routes/v1';

const api = express();
// Automatically allow cross-origin requests
api.use(cors({ origin: true }));
api.get('/', (request, response) => response.status(200).send('Hey there!'));
api.use(V1_SLUG, v1Route);

export default api;
