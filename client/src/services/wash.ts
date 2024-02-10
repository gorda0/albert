import { ScheduleWashDto, Wash, WashCalendar } from "@models/wash";

import axios, { AxiosResponse } from "axios";

export const baseUrl = 'http://localhost:3000';

const http = axios.create({
  baseURL: baseUrl,
});

interface WashServiceProperties {
  scheduleWash(data: ScheduleWashDto): Promise<Wash>;
  listWashes(): Promise<Array<Wash>>;
  listAvailableCalendar(): Promise<Array<WashCalendar>>;
  confirmWash(washId: string): Promise<Wash>;
  cancelWash(washId: string): Promise<Wash>;
}

const WashService: WashServiceProperties = {
  async scheduleWash(data) {
    return http
      .post<ScheduleWashDto, AxiosResponse<Wash>>(
        "/wash/schedule",
        data
      )
      .then((res) => res.data);
  },
  async listWashes() {
    return http
      .get<null, AxiosResponse<Array<Wash>>>(
        `/wash/all`,
      )
      .then((res) => res.data);
  },
  async listAvailableCalendar() {
    return http
      .get<null, AxiosResponse<Array<WashCalendar>>>(
        `/wash/available-calendar`,
      )
      .then((res) => res.data);
  },
  async confirmWash(washId) {
    return http
      .patch<null, AxiosResponse<Wash>>(
        `/wash/complete/${washId}`,
      )
      .then((res) => res.data);
  },
  async cancelWash(washId) {
    return http
      .patch<null, AxiosResponse<Wash>>(
        `/wash/cancel/${washId}`,
      )
      .then((res) => res.data);
  },
};

export default WashService;
