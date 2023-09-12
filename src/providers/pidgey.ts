import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Pidgey {
  pidgeyAPI: AxiosInstance;

  constructor() {
    this.pidgeyAPI = Axios.create({
      baseURL: config.providers.pidgey.url,
    });
  }

  async sendNotifications(
    notificationsToBeSent: sendNotificationPidgeyObject[],
  ): Promise<AxiosResponse> {
    try {
      const response = await this.pidgeyAPI.post(
        '/v1/notification/sendNotifications',
        {
          notifications: notificationsToBeSent,
        },
      );

      return response;
    } catch (error) {
      if (error.response)
        throw new Error(
          `Error on POST - sendMessage - pidgey: \x1b[31m${error.response.data.message}`,
        );

      throw new Error(
        `Error on POST - sendMessage - pidgey: \x1b[31m${error.cause}`,
      );
    }
  }
}
