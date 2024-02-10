import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ScheduleWashDto } from 'src/common/dto/schedule-wash.dto';
import { WashCalendar, WashService } from './wash.service';

@Controller('wash')
export class WashController {
  constructor(private readonly washService: WashService) {}

  @Get('find/:washId')
  async find(@Param('washId') washId: string) {
    const wash = await this.washService.findById(washId);

    return wash;
  }

  @Get('all')
  async findAll() {
    return await this.washService.findAll();
  }

  @Get('available-calendar')
  async availableCalendar(): Promise<Array<WashCalendar>> {
    return await this.washService.getScheduleCalendar();
  }

  @Post('schedule')
  async scheduleWash(@Body() scheduleWashDto: ScheduleWashDto) {
    return await this.washService.scheduleWash(scheduleWashDto);
  }

  @Patch('complete/:washId')
  async completeWash(@Param('washId') washId: string) {
    return await this.washService.completeWash(washId);
  }

  @Patch('cancel/:washId')
  async cancelWash(@Param('washId') washId: string) {
    return await this.washService.cancelWash(washId);
  }
}
