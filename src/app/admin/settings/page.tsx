import BankingInfo from "./_component/bankingInfo";
import ContactEmail from "./_component/contactEmail";
import CryptoInfo from "./_component/cryptoInfo";
import Membership from "./_component/membership";
import SecurityFee from "./_component/securityFee";

function Profile() {
  return (
    <div className="space-y-6">
      <BankingInfo />
      <CryptoInfo />
      <SecurityFee />
      <Membership />
      <ContactEmail />
    </div>
  );
}

export default Profile;
