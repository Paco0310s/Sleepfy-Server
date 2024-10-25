import { AllowNull, Column, DataType, HasMany, Table, Model } from "sequelize-typescript";
import { Question } from '../../questions/entities/question.entity';

@Table
export class Test extends Model<Test> {  // El modelo debe extenderse de `Model<Test>`
    @AllowNull(false)  // Not null
    @Column({
        type: DataType.STRING,
        validate: {
            len: [2, 30], // Debe tener entre 2 y 30 caracteres
        }
    })
    name: string;

    @HasMany(() => Question)
    questions: Question[];
}