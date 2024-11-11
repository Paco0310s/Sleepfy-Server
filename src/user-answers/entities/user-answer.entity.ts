import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AnswersOption } from "src/answers_options/entities/answers_option.entity";
import { Question } from "src/questions/entities/question.entity";
import { User } from "src/users/entities/user.entity";

@Table
export class UserAnswer extends Model<UserAnswer> {
    @ForeignKey(() => User)
    @AllowNull(false) // Not null
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @ForeignKey(() => Question)
    @AllowNull(false) // Not null
    @Column({
        type: DataType.INTEGER
    })
    questionId: number;

    @ForeignKey(() => AnswersOption)
    @AllowNull(false) // Not null
    @Column({
        type: DataType.INTEGER
    })
    answerOptionId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Question)
    question: Question;

    @BelongsTo(() => AnswersOption)
    answerOption: AnswersOption;
}
