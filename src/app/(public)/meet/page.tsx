import React from "react";
import CelebrityGrid from "./_component/celebrityGrid";
import Header from "../_components/header";

function Meet() {
  return (
    <div>
      <Header
        title=" Meet and Greet"
        subtitle="At FanStar, we bring your favorite artists closer to you and we make it
              possible."
      />
      <CelebrityGrid />
    </div>
  );
}

export default Meet;
