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
      const lambdaClient = new LambdaClient({
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'AKIAVRUVUA56WQXL54GL',
          secretAccessKey: '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',
        },
      });
      const command = new InvokeCommand({
        FunctionName: this.pidgeyFunctionName,
        Payload: JSON.stringify({
          httpMethod: 'POST',
          path: 'api/pidgey/v1/notification/sendNotifications',
          body: Buffer.from(
            JSON.stringify({ notifications: notificationsToBeSent }),
          ),
        }),
        InvocationType: 'RequestResponse',
      });

      const { Payload } = await lambdaClient.send(command);
      const response = Buffer.from(Payload).toString();
      console.log(response);

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
