import {
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import Scene from './scene';
import SceneActivity from './mediate-act-scene';

@Table
class Activity extends Model<Activity> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id: number;

    @Column ({
        type: DataType.STRING
    })
    name: string;

    @ForeignKey(() => Scene)
    @Column({
        type: DataType.INTEGER,
        field: 'next-scene-id'
    })
    nextSceneId: number;

    @BelongsToMany(() => Scene, () => SceneActivity)
    scenes: Scene[];
}

export default Activity;
