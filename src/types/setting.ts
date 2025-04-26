export interface ISetting {
  bankingInfo: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    routing: string;
    address: string;
  };
  cryptoInfo: {
    name: string;
    network: string;
    address: string;
    rate: number;
  }[];
  cashApp: { tag: string; name: string };
  mail: {
    name: string;
    password: string;
  };
  whatsApp: string;
}
