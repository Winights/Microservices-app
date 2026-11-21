export enum TransactionType {
  WITHDRAWL = 'WITHDRAWL',
  DEPOSIT = 'DEPOSIT',
  TRANSFER = 'TRANSFER',
}

export enum TransactionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type FindTransactionParams = {
  userIds?: string[];
  ids?: string[];
  type?: TransactionType;
  status?: TransactionStatus;
  amounts?: string[];
  take?: number;
  skip?: number;
};

export enum EventNameEnum {
  TransactionSaved = 'TransactionSaved',
  BalanceChanged = 'BalanceChanged',
}

export type EventBalanceChangedData = {
  transactionId: string;
  status: TransactionStatus;
};