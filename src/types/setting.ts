export interface ISetting {
  bankingInfo: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    routing: string;
    address: string;
    status: boolean;
  };
  cryptoInfo: {
    name: string;
    network: string;
    address: string;
    rate: number;
  }[];
  cryptoStatus: boolean;
  cashApp: { tag: string; name: string };
  email: string;
  whatsApp: string;
  securityFee: number;
}
