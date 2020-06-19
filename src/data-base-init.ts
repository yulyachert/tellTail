import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import Tag from './models/tags';
import Achievement from './models/achievment';
import Activity from './models/activity';
import Adventure from './models/adventure';
import Angle from './models/angles';
import SceneActivity from './models/mediate-act-scene';
import SceneAchievement from './models/mediate-scene-achieve';
import AdventureTag from './models/mediate-adv-tag';
import Scene from './models/scene';

const sequelizeOptions: SequelizeOptions = {
    models: [Tag, Achievement, Activity, Adventure, Angle, SceneActivity, SceneAchievement, AdventureTag, Scene]
};

if (!process.env.url) {
    throw new URIError();
}

export default new Sequelize(process.env.url, sequelizeOptions);
