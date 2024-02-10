import { IsNotEmpty, IsString } from 'class-validator';
import { WashType } from 'src/modules/wash/wash.entity';

export class ScheduleWashDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsString()
  type: WashType;
}
