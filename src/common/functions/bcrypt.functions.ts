import * as bcrypt from 'bcrypt';

export class BcryptFunctions {
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    // Compare the user password with the password hash
    static async comparePasswords(userPassword: string, passwordHash: string): Promise<boolean> {
        return bcrypt.compare(userPassword, passwordHash);
    }
}