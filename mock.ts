import { setupWorker } from 'msw/browser';
import { getSwaggerPetstoreMock } from './app/api/endpoints.msw';

const worker = setupWorker(...getSwaggerPetstoreMock());

worker.start();