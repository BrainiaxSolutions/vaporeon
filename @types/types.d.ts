type AlertObject = {
  alertId: number;
  receiver: string;
  lastNotificationSent: Date;
  percent: number;
  maxNotifications: number;
  remainingNotifications: number;
  sleepMinutes: number;
  typeAlert: string[];
  templateId: string;
};

type recipientObject = {
  email: string;
  phone: string;
};
