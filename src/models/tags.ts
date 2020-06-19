import {
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import Adventure from './adventure';
import AdventureTag from './mediate-adv-tag';

@Table
class Tag extends Model<Tag> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column({
        type: DataType.STRING,
        field: 'ru_name'
    })
    ruName: string;

    @Column({
        type: DataType.STRING,
        field: 'eng_name'
    })
    engName: string;

    @BelongsToMany(() => Adventure, () => AdventureTag)
    adventures: Adventure[];
}

export default Tag;
