import { Column, DataType, IsEmail, Model, Table, Unique, AllowNull, HasOne, HasMany } from "sequelize-typescript";
import { CustomRoutine } from "src/custom-routine/entities/custom-routine.entity";
import { UserAnswer } from "src/user-answers/entities/user-answer.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { SleepSchedule } from "src/sleep-schedules/entities/sleep-schedule.entity";

@Table
export class User extends Model {
    @AllowNull(false) // Not null
    @Column({
        type: DataType.STRING,
        validate: {
            len: [2, 30], // Should be between 2 and 30 characters
        }
    })
    name: string;

    @AllowNull(false) // Not null
    @Column({
        type: DataType.STRING,
        validate: {
            len: [2, 30], // Should be between 2 and 30 characters
        }
    })
    lastName: string;

    @AllowNull(false)
    @Unique // Should be unique, no duplicates
    @IsEmail // Validating email format
    @Column({
        type: DataType.STRING,
        validate: {
            isEmail: true, // Validation added by the @IsEmail decorator
            len: [5, 50] // Should be between 5 and 50 characters
        }
    })
    email: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        // validate: {
        //     len: [8, 20], // Should be between 8 and 20 characters
        //     is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, // Should include uppercase, lowercase, number, and special character
        // },
    })
    password: string;

    @HasMany(() => UserAnswer)
    userAnswer: UserAnswer;

    @HasMany(() => CustomRoutine)
    customRoutine: CustomRoutine;

    @HasMany(() => Comment)
    comment: Comment;

    @HasMany(() => SleepSchedule)
    sleepSchedule: SleepSchedule;

}
