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

import AdventureTag from './mediate-adv-tag';
import Scene from './scene';
import Tag from './tags';

@Table
class Adventure extends Model<Adventure> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id: number;

    @Column ({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    img: string;

    @Column({
        type: DataType.STRING,
    })
    description: string;

    @ForeignKey(() => Scene)
    @Column ({
        field: 'scene_id',
        type: DataType.INTEGER
    })
    sceneId: number;

    @BelongsToMany(() => Tag, () => AdventureTag)
    tags: Tag[];
}

export default Adventure;
