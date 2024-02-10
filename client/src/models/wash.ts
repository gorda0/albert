export type WashError = {
  message: string;
};

export interface Wash {
  id: string;
  plate: string;
  type: WashType;
  status: WashStatus;
  scheduleHour: string;
  scheduleDay: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum WashType {
  COMPLETE = "complete",
  SIMPLE = "simple",
}

export enum WashStatus {
  SCHEDULED = "scheduled",
  COMPLETE = "complete",
  CANCELED = "canceled",
}

export interface WashCalendar {
  date: string;
  slots: Array<string>;
}

export const durations = {
  [WashType.COMPLETE]: 45,
  [WashType.SIMPLE]: 30,
};

export interface ScheduleWashDto {
  date: string;
  hour: string;
  plate: string;
  type: WashType;
}

export interface WashStore {
  washes: Array<Wash>;
  calendars?: Array<WashCalendar>;
  errors: Array<WashError>;
}
