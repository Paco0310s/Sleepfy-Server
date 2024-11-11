import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class SleepSchedule extends Model<SleepSchedule> {

    // Horario de inicio del sueño
    @Column({
        type: DataType.DATE
    })
    start: Date;

    // Horario de fin del sueño
    @Column({
        type: DataType.DATE
    })
    end: Date;

    @ForeignKey(() => User)
    @AllowNull(false) // Not null
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}