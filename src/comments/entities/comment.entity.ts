import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class Comment extends Model<Comment> {

    @Column({
        type: DataType.TEXT
    })
    comment: string;

    @ForeignKey(() => User)
    @AllowNull(false) // Not null
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}