import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class CustomRoutine extends Model<CustomRoutine> {

    @Column({
        type: DataType.TEXT
    })
    routine: string;

    @ForeignKey(() => User)
    @AllowNull(false) // Not null
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
