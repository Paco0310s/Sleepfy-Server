import { Type } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class CreateSleepScheduleDto {
    @Type(() => Date)
    @IsDate()
    start: Date;

    @Type(() => Date)
    @IsDate()
    end: Date;

    @IsNumber()
    userId: number;
}
