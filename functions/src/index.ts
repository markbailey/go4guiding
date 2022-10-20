import { https } from 'firebase-functions';
import apiService from './services/api';

export const api = https.onRequest(apiService);
