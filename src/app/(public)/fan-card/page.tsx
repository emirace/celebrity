import React from "react";
import Header from "../_components/header";
import CelebrityGrid from "./_component/celebrityGrid";

function FanCard() {
  return (
    <div>
      <Header
        title="Get Your Celebrity Fan Card"
        subtitle="Join the ultimate fan experience and collect exclusive fan cards of your favorite celebrities."
      />
      <CelebrityGrid />
    </div>
  );
}

export default FanCard;
