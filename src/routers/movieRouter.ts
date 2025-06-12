import express from 'express';
import { home, movieDetail, filterMovie } from '../controllers/movieController';

const movieRouter = express.Router();
movieRouter.get('/', home);
movieRouter.get('/filter', filterMovie);
movieRouter.get('/:id(\\d+)', movieDetail);

export default movieRouter;
