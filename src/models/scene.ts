import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import Achievement from './achievment';
import Activity from './activity';
import Adventure from './adventure';
import Angle from './angles';
import SceneAchievement from './mediate-scene-achieve';
import SceneActivity from './mediate-act-scene';

@Table
class Scene extends Model<Scene>{

    @PrimaryKey
    @AutoIncrement
    @Column( {
        type: DataType.INTEGER
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    img: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    description: string;

    @BelongsToMany(() => Achievement, () => SceneAchievement)
    achievements: Achievement[];

    @BelongsToMany(() => Activity, () => SceneActivity)
    activities: Activity[];

    @ForeignKey(() => Angle)
    @Column ({
        field: 'angle_id',
        type: DataType.STRING
    })
    angleId: string;

    @ForeignKey(() => Adventure)
    @Column ({
        type: DataType.INTEGER,
        field: 'adventure_id'
    })
    adventureId: number;
}

export default Scene;
