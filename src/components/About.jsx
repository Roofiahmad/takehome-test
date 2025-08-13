import React from "react";
import { useParams } from "react-router-dom";

const About = () => {
  const params = useParams();
  console.log(params);
  return <div>About page</div>;
};

export default About;
