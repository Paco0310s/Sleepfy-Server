import { Column, DataType, IsEmail, Model, Table, Unique, AllowNull } from "sequelize-typescript";

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
}
