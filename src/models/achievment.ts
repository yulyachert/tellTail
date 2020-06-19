import {
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import Scene from './scene';
import SceneAchievement from './mediate-scene-achieve';

@Table
class Achievement extends Model<Achievement> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    img: string;

    @BelongsToMany(() => Scene, () => SceneAchievement)
    scenes: Scene[];
}

export default Achievement;
