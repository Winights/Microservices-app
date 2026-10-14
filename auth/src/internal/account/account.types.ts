export type VerificationParams = {
  login: string;
  password: string;
};

export type GetUsersByFiltersParams = {
  userIds?: string[];
  phones?: string[];
  login?: string;
};

export type Account = {
  userId: string;
  login: string;
};

export type GetUsersResponse = {
  items: Account[];
  total: number;
};