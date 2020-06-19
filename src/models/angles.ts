import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

@Table
class Angle extends Model<Angle> {

    @PrimaryKey
    @Column({
        type: DataType.STRING,
    })
    id: string;
}

export default Angle;
