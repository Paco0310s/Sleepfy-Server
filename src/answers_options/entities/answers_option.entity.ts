import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Question } from "src/questions/entities/question.entity";
import { UserAnswer } from "src/user-answers/entities/user-answer.entity";

@Table
export class AnswersOption extends Model<AnswersOption> {

    @Column(
        {
            type: DataType.STRING,
            validate: {
                len: [2, 30], // Should be between 2 and 30 characters
            }
        }
    )
    answer: string;

    @Column(
        {
            type: DataType.BOOLEAN
        }
    )
    isCorrect: boolean;

    @ForeignKey(() => Question)
    @AllowNull(false) // Not null
    @Column({
        type: DataType.INTEGER
    })
    questionId: number;

    @BelongsTo(() => Question)
    question: Question;

    @HasMany(() => UserAnswer)
    userAnswer: UserAnswer;
}
