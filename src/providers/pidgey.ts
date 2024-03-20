import { config } from '../config';
import { Injectable } from '@nestjs/common';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';

@Injectable()
export class Pidgey {
  pidgeyFunctionName = config.providers.pidgey.functionName;

  async sendNotifications(
    notificationsToBeSent: sendNotificationPidgeyObject[],
  ): Promise<any> {
    try {
      const lambdaClient = new LambdaClient({});
      const command = new InvokeCommand({
        FunctionName: this.pidgeyFunctionName,
        Payload: JSON.stringify({
          notifications: notificationsToBeSent,
        }),
        InvocationType: 'RequestResponse',
      });

      const { Payload: response } = await lambdaClient.send(command);
      return response;
    } catch (error) {
      if (error.Error)
        throw new Error(
          `Error on POST - sendMessage - pidgey: \x1b[31m${error.Error.Message}`,
        );

      throw new Error(`Error on POST - sendMessage - pidgey: \x1b[31m${error}`);
    }
  }
}
