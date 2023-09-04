import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ruleOfThree } from 'src/utils/utils';
import { Device } from 'src/v1/database/models/device.entity';
import * as mqtt from "mqtt";
import { TemplateMessage } from 'src/v1/database/models/templateMessage.entity';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(Device.name) private deviceRepository: Model<Device>,
    @InjectModel(TemplateMessage.name) private templateMessageRepository: Model<TemplateMessage>
  ) {}

  private async pluviometer(device: Device, metric: number) {
    const alertsToBeFired: Alert[] = device.alerts.filter((alert) => {
      const percent = ruleOfThree(device.maximumLimit, metric,100)
      return percent >= alert.percent
    })
    if(alertsToBeFired.length)
      await this.goOffAlerts(alertsToBeFired);
  }

  private async goOffAlerts(alertsToBeFired: Alert[]) {
    const templateIds = alertsToBeFired.map((alerts) => {
      return alerts.templateId
    })
    console.log(templateIds);
    const templates = await this.templateMessageRepository.find({
      _id: {
        $in: templateIds
      }
    });
    console.log(templates);
    
    let client = mqtt.connect("mqtt://broker.emqx.io:1883", {
      clientId: 'pluvial',
      clean: true,
      connectTimeout: 4000,
      username: 'brainiax',
      password: 'pluvial',
    });

    client.on("connect", () => {
      client.publish("pluvial/alerts", "Sua area está sujeita a alagamento", {qos: 0, retain: false}, (error) => {
        if(error)
        console.error(error);
      });
    });
  }

  async alert(id: string, metric: number) {
    const device: Device = (await this.deviceRepository.findOne({ _id: id })).toObject();

    if (!device) {
      throw new HttpException(
        'This device id not exists in database.',
        HttpStatus.NOT_FOUND,
      );
    }

    if(device.deviceName === 'pluviometer')
      this.pluviometer(device, metric)

    return device;
  }
}
