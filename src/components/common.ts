export enum ProjectStatusEnum {
  Active = 'active',
  Trial = 'trial',
  Blocked = 'blocked',
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
  InProcess = 'in_process',
  Success = 'success',
}

export enum PaymentStatusEnum {
  Success = 'success',
  Waiting = 'waiting',
  Canceled = 'canceled',
  Failed = 'failed',
  Cash = 'cash',
}

export enum FilterFormTypeEnum {
  Select = 'select',
}

export enum HttpMethodEnum {
  Get = 'get',
  Post = 'post',
  Patch = 'patch',
}

export function clearEmptyQuery(value: Object) {
  return Object.fromEntries(
    Object.entries(value).filter(([_, value]) => value !== null && value !== undefined && value !== '' )
  )
}
