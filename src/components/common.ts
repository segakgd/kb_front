export enum ProjectStatusEnum {
  Active = 'active',
  Trial = 'trial',
  Block = 'block',
  Enabled = 'enabled',
}

export enum BotTypeEnum {
  Telegram = 'telegram',
  Vk = 'vk'
}

export enum IntegrationTypeEnum {
  Robokassa = 'robokassa',
  Sber = 'sber',
  AmoCrm = 'amo'
}

export enum ShippingTypeEnum {
  Courier = 'courier',
  Pickup = 'pickup',
}

export enum DiscountTypeEnum {
  Cash = 'cash',
  Percent = 'percent',
}

export enum OrderStatusEnum {
  New = 'new',
  Reject = 'reject',
  InProcess = 'reject',
  Success = 'Success',
}

export enum PaymentStatusEnum {
  Success = 'Success',
  Waiting = 'Waiting',
  Canceled = 'Canceled',
  Failed = 'Failed',
  UponReceipt = 'UponReceipt',
}

