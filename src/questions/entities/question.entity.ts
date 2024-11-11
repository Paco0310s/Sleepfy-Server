import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table, Model, HasMany, HasOne } from "sequelize-typescript";
import { Test } from "src/tests/entities/test.entity";
import { AnswersOption } from '../../answers_options/entities/answers_option.entity';
import { UserAnswer } from "src/user-answers/entities/user-answer.entity";

@Table
export class Question extends Model<Question> {  // Ahora extiende Model<Question>
    @AllowNull(false) // Not null
    @Column({
        type: DataType.STRING,
        validate: {
            len: [2, 30], // Debe tener entre 2 y 30 caracteres
        }
    })
    question: string;

    @ForeignKey(() => Test)
    @AllowNull(false) // Not null
    @Column({
        type: DataType.INTEGER
    })
    testId: number;

    @BelongsTo(() => Test)
    test: Test;

    @HasMany(() => AnswersOption)
    AnswersOptions: AnswersOption[];

    @HasMany(() => UserAnswer)
    userAnswer: UserAnswer;
}