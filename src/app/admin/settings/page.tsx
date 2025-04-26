import BankingInfo from "./_component/bankingInfo";
import CryptoInfo from "./_component/cryptoInfo";
import Membership from "./_component/membership";

function Profile() {
  return (
    <div className="space-y-6">
      <BankingInfo />
      <CryptoInfo />
      <Membership />
    </div>
  );
}

export default Profile;
