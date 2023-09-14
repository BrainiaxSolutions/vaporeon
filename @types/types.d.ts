type TypeAlertObject = {
  name: string;
  templateId: string;
};

type AlertObject = {
  alertId: number;
  receiver: string;
  lastNotificationSent: Date;
  percent: number;
  maxNotifications: number;
  remainingNotifications: number;
  sleepMinutes: number;
  typeAlert: TypeAlertObject;
};

type recipientObject = {
  email?: string;
  phone?: string;
};

type sendNotificationPidgeyObject = {
  recipient: recipientObject;
  content: any;
  typeNotification: TypeAlertObject;
};
