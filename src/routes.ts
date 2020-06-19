import { Application } from 'express';

import { error404 } from './controllers/errors';
import {
    getAdventureByTag,
    getListOfAdventures,
    getJsonOfAdventures,
    getStaticBasePath,
    getJsonOfAdventuresByTag
} from './controllers/adventures';
import { getSceneById } from './controllers/scene';


export default (app: Application): void => {
    app.get('/', getListOfAdventures);

    app.get('/scene/:id', getSceneById);

    app.get('/adventures/:tag', getAdventureByTag);

    app.get('/api/adventures', getJsonOfAdventures);

    app.get('/api/staticBasePath', getStaticBasePath);

    app.get('/api/adventuresByTag', getJsonOfAdventuresByTag);

    // Если роутер не выбрал подходящий для запроса маршрут – используется этот
    app.all('*', error404);
};
