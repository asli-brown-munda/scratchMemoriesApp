import particleOptions from "./particleOptions.js";
import Particles from "@tsparticles/react";


const BackgroundParticles = function () {
  return (
    <Particles
      id="tsparticles"
      options={particleOptions}
    />
  );
};
export default BackgroundParticles;

