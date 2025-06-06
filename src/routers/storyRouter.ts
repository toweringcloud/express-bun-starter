import express from "express";
import { info, edit, remove } from '../controllers/storyController';

const storyRouter = express.Router();
storyRouter.get('/:id(\\d+)', info);
storyRouter.get('/:id(\\d+)/edit', edit);
storyRouter.get('/:id(\\d+)/delete', remove);

export default storyRouter;
