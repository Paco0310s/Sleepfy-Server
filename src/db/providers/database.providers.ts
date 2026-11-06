import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { envs } from 'src/config/envs';
import { AnswersOption } from 'src/answers_options/entities/answers_option.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CustomRoutine } from 'src/custom-routine/entities/custom-routine.entity';
import { Question } from 'src/questions/entities/question.entity';
import { SleepSchedule } from 'src/sleep-schedules/entities/sleep-schedule.entity';
import { Test } from 'src/tests/entities/test.entity';
import { UserAnswer } from 'src/user-answers/entities/user-answer.entity';
import { User } from 'src/users/entities/user.entity';


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: envs.dbHost,
                port: envs.dbPort,
                username: envs.dbUser,
                password: envs.dbPassword,
                database: envs.dbName,
            });
            sequelize.addModels([User, Test, Question, AnswersOption, UserAnswer, CustomRoutine, SleepSchedule, Comment]);
            await sequelize.sync();

            // Auto-migración segura para columnas de verificación de correo y recuperación de contraseña
            try {
                const queryInterface = sequelize.getQueryInterface();
                const tableDesc = await queryInterface.describeTable('Users');

                if (!tableDesc['isEmailVerified']) {
                    await queryInterface.addColumn('Users', 'isEmailVerified', {
                        type: DataTypes.BOOLEAN,
                        allowNull: false,
                        defaultValue: true, // Cuentas anteriores se marcan verificadas automáticamente
                    });
                }
                if (!tableDesc['verificationCode']) {
                    await queryInterface.addColumn('Users', 'verificationCode', {
                        type: DataTypes.STRING,
                        allowNull: true,
                    });
                }
                if (!tableDesc['verificationCodeExpires']) {
                    await queryInterface.addColumn('Users', 'verificationCodeExpires', {
                        type: DataTypes.DATE,
                        allowNull: true,
                    });
                }
            } catch (err) {
                console.warn('Aviso al verificar columnas de Users:', err);
            }

            return sequelize;
        },
    },
];