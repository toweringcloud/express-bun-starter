import express from "express";
import { signUp, signIn, signOut } from '../controllers/userController';
import { home, trending, newStory } from '../controllers/storyController';

const globalRouter = express.Router();
globalRouter.get('/', home);
globalRouter.get('/trending', trending);
globalRouter.get('/new', newStory);
globalRouter.get('/join', signUp);
globalRouter.get('/login', signIn);
globalRouter.get('/logout', signOut);

export default globalRouter;
