import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Wash, WashStatus, WashType } from './wash.entity';
import { ScheduleWashDto } from 'src/common/dto/schedule-wash.dto';

interface WashSchedule {
  date: Date;
  time: string;
  duration?: number;
}

export interface WashCalendar {
  date: Date;
  slots: Array<string>;
}

const durations = {
  [WashType.COMPLETE]: 45,
  [WashType.SIMPLE]: 30,
};

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

function washToSchedule({
  type,
  scheduleDay,
  scheduleHour,
}: Wash): WashSchedule {
  return {
    duration: durations[type],
    date: new Date(scheduleDay),
    time: scheduleHour,
  };
}

function isScheduled(
  slot: WashSchedule,
  schedules: Array<WashSchedule>,
): boolean {
  return schedules.some((schedule) => {
    const slotTime = timeToMinutes(slot.time);
    const scheduleTime = timeToMinutes(schedule.time);
    const scheduleEndTime = scheduleTime + (schedule.duration ?? 30);
    return (
      slot.date.toDateString() === schedule.date.toDateString() &&
      ((slotTime >= scheduleTime && slotTime < scheduleEndTime) ||
        (slotTime < scheduleTime &&
          slotTime + (schedule.duration ?? 30) > scheduleTime))
    );
  });
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins
    .toString()
    .padStart(2, '0')}`;
}

function timeToMinutes(time: string): number {
  const [hours, mins] = time.split(':').map(Number);
  return hours * 60 + mins;
}

@Injectable()
export class WashService {
  constructor(
    @InjectRepository(Wash)
    private readonly washRepository: Repository<Wash>,
  ) {}

  async findById(id: string) {
    const wash = await this.washRepository.findOne({
      where: { id },
    });

    if (!wash) {
      throw new NotFoundException(`Wash with id ${id} not found`);
    }

    return wash;
  }

  async findAll() {
    const washes = await this.washRepository
      .createQueryBuilder('wash')
      .where('wash.status != :status', { status: WashStatus.CANCELED })
      .orderBy('CAST(wash.scheduleDay AS date)', 'ASC')
      .addOrderBy('CAST(wash.scheduleHour AS time)', 'ASC')
      .getMany();

    // const washes = await this.washRepository
    // .createQueryBuilder('wash')
    // .where('wash.status != :status', { status: WashStatus.CANCELED })
    // .orderBy('CASE WHEN wash.status != :complete THEN 0 ELSE 1 END', 'ASC')
    // .addOrderBy('CAST(wash.scheduleDay AS date)', 'ASC')
    // .addOrderBy('CAST(wash.scheduleHour AS time)', 'ASC')
    // .setParameters({ complete: WashStatus.COMPLETE })
    // .getMany();

    return washes;
  }

  getAvailableSlots({
    scheduledWashes,
    months,
    openingTime,
    closingTime,
    breakStart,
    breakEnd,
    slotDurationSimple,
    slotDurationComplete,
  }: {
    scheduledWashes: Array<WashSchedule>;
    months: IntRange<0, 11>;
    openingTime: IntRange<0, 24>;
    closingTime: IntRange<0, 24>;
    breakStart: IntRange<0, 24>;
    breakEnd: IntRange<0, 24>;
    slotDurationSimple: IntRange<1, 60>;
    slotDurationComplete: IntRange<1, 60>;
  }): Array<WashCalendar> {
    const availableSlots = [];

    const nOpeningTime = (openingTime as number) * 60; // Convertendo para minutos
    const nClosingTime = (closingTime as number) * 60; // Convertendo para minutos
    const nBreakStart = (breakStart as number) * 60; // Convertendo para minutos
    const nBreakEnd = (breakEnd as number) * 60; // Convertendo para minutos

    const currentDate = new Date();
    const endDate = new Date(currentDate);

    endDate.setMonth(endDate.getMonth() + months);

    const currentDateClone = new Date(currentDate);

    currentDateClone.setHours(0, 0, 0, 0);

    while (currentDateClone <= endDate) {
      const currentDay = currentDateClone.getDay();
      const currentSlots = [];

      // Ignorar sábado (6) e domingo (0)
      if (currentDay !== 6 && currentDay !== 0) {
        //let currentTime = nOpeningTime;
        let currentTime = Math.max(
          nOpeningTime,
          currentDateClone.getTime() === currentDate.getTime()
            ? Math.ceil(currentDate.getHours() * 60 + currentDate.getMinutes())
            : nOpeningTime,
        );
        while (currentTime < nClosingTime) {
          if (
            !(
              currentDay === 5 &&
              currentTime + slotDurationComplete > nClosingTime
            )
          ) {
            if (
              (currentTime < nBreakStart || currentTime >= nBreakEnd) &&
              !(
                currentTime + slotDurationSimple > nBreakStart &&
                currentTime < nBreakEnd
              )
            ) {
              const availableSlot = {
                date: new Date(currentDateClone),
                time: formatTime(currentTime),
              };
              if (!isScheduled(availableSlot, scheduledWashes)) {
                currentSlots.push(formatTime(currentTime));
              }
            }
          }
          currentTime += 5;
        }

        if (currentSlots.length > 0) {
          availableSlots.push({
            date: new Date(currentDateClone),
            slots: currentSlots,
          });
        }
      }

      currentDateClone.setDate(currentDateClone.getDate() + 1); // Avança para o próximo dia
    }

    return availableSlots;
  }

  // getAvailableSlots({
  //   scheduledWashes,
  //   months,
  //   openingTime,
  //   closingTime,
  //   breakStart,
  //   breakEnd,
  //   slotDurationSimple,
  //   slotDurationComplete,
  // }: {
  //   scheduledWashes: Array<WashSchedule>;
  //   months: IntRange<0, 11>;
  //   openingTime: IntRange<0, 24>;
  //   closingTime: IntRange<0, 24>;
  //   breakStart: IntRange<0, 24>;
  //   breakEnd: IntRange<0, 24>;
  //   slotDurationSimple: IntRange<1, 60>;
  //   slotDurationComplete: IntRange<1, 60>;
  // }): Array<WashCalendar> {
  //   const availableSlots: WashCalendar[] = [];

  //   const nOpeningTime = openingTime * 60; // Convertendo para minutos
  //   const nClosingTime = closingTime * 60; // Convertendo para minutos
  //   const nBreakStart = breakStart * 60; // Convertendo para minutos
  //   const nBreakEnd = breakEnd * 60; // Convertendo para minutos

  //   const currentDate = new Date();
  //   const endDate = new Date(currentDate);

  //   endDate.setMonth(endDate.getMonth() + months);

  //   const currentDateClone = new Date(currentDate);

  //   currentDateClone.setHours(0, 0, 0, 0);

  //   while (currentDateClone <= endDate) {
  //     const currentDay = currentDateClone.getDay();
  //     const currentSlots: string[] = [];

  //     // Ignorar sábado (6) e domingo (0)
  //     if (currentDay !== 6 && currentDay !== 0) {
  //       const today = currentDate.toDateString();
  //       const currentTime = Math.max(
  //         nOpeningTime,
  //         currentDateClone.getTime() === currentDate.getTime()
  //           ? Math.ceil(currentDate.getHours() * 60 + currentDate.getMinutes())
  //           : nOpeningTime,
  //       );
  //       let nextTime = currentTime;

  //       while (nextTime < nClosingTime) {
  //         if (
  //           !(
  //             currentDay === 5 && nextTime + slotDurationComplete > nClosingTime
  //           )
  //         ) {
  //           if (
  //             (nextTime < nBreakStart || nextTime >= nBreakEnd) &&
  //             !(
  //               nextTime + slotDurationSimple > nBreakStart &&
  //               nextTime < nBreakEnd
  //             )
  //           ) {
  //             const availableSlot = {
  //               date: new Date(currentDateClone),
  //               time: formatTime(nextTime),
  //             };
  //             if (
  //               availableSlot.date.toDateString() === today &&
  //               nextTime >= currentTime
  //             ) {
  //               if (!isScheduled(availableSlot, scheduledWashes)) {
  //                 currentSlots.push(formatTime(nextTime));
  //               }
  //             } else if (availableSlot.date.toDateString() !== today) {
  //               if (!isScheduled(availableSlot, scheduledWashes)) {
  //                 currentSlots.push(formatTime(nextTime));
  //               }
  //             }
  //           }
  //         }
  //         nextTime += 5;
  //       }

  //       if (currentSlots.length > 0) {
  //         availableSlots.push({
  //           date: new Date(currentDateClone),
  //           slots: currentSlots,
  //         });
  //       }
  //     }

  //     currentDateClone.setDate(currentDateClone.getDate() + 1); // Avança para o próximo dia
  //   }

  //   return availableSlots;
  // }

  async getScheduleCalendar() {
    const washes = (
      await this.washRepository.find({
        where: {
          id: Not(IsNull()),
        },
      })
    ).map(washToSchedule);

    return this.getAvailableSlots({
      months: 3,
      scheduledWashes: washes,
      openingTime: 10,
      closingTime: 18,
      slotDurationSimple: 30,
      slotDurationComplete: 45,
      breakStart: 12,
      breakEnd: 13,
    });
  }

  async scheduleWash({ date, type, plate, hour }: ScheduleWashDto) {
    return await this.washRepository.save({
      scheduleDay: date,
      scheduleHour: hour,
      type,
      plate,
    });
  }

  async cancelWash(washId: string) {
    const wash = await this.findById(washId);

    if (!wash) {
      throw new NotFoundException();
    }

    wash.status = WashStatus.CANCELED;

    await this.washRepository.save(wash);

    return wash;
  }

  async completeWash(washId: string) {
    const wash = await this.findById(washId);

    if (!wash) {
      throw new NotFoundException();
    }

    wash.status = WashStatus.COMPLETE;

    await this.washRepository.save(wash);

    return wash;
  }
}
