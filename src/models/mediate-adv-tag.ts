import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import Adventure from './adventure';
import Tag from './tags';

@Table
class AdventureTag extends Model<AdventureTag> {

    @ForeignKey(() => Adventure)
    @Column(DataType.INTEGER)
    adventureId: number;

    @ForeignKey(() => Tag)
    @Column(DataType.INTEGER)
    tagId: number;
}

export default AdventureTag;
