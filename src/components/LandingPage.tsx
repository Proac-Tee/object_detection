import React from "react";
import Hero from "./LandingPage/Hero";
import Overview from "./LandingPage/Overview";
import CallToAction from "./LandingPage/CallToAction";

const LandingPage = () => {
  return (
    <section>
      <Hero />
      <Overview />
      <CallToAction />
    </section>
  );
};

export default LandingPage;
