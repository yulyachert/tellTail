import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import Activity from './activity';
import Scene from './scene';

@Table
class SceneActivity extends Model<SceneActivity> {

    @ForeignKey(() => Scene)
    @Column(DataType.INTEGER)
    sceneId: number;

    @ForeignKey(() => Activity)
    @Column(DataType.INTEGER)
    activityId: number;
}

export default SceneActivity;
