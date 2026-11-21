import { TransactionType } from '../transaction/transaction.types';

export type AccountTransactionType = Exclude<
  TransactionType,
  TransactionType.TRANSFER
>;

export type ChangeBalanceParams = {
  userId: string;
  amount: string;
  transactionType: AccountTransactionType;
};