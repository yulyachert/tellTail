import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import Achievement from './achievment';
import Scene from './scene';

@Table
class SceneAchievement extends Model<SceneAchievement> {

    @ForeignKey(() => Scene)
    @Column(DataType.INTEGER)
    sceneId: number;

    @ForeignKey(() => Achievement)
    @Column(DataType.INTEGER)
    achievementId: number;
}

export default SceneAchievement;
