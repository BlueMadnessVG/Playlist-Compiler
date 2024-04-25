import React from "react";

function Greetings() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting = "";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good night";
  }

  return <h1 className=" text-2xl font-abc font-bold  ml-2"> {greeting} </h1>;
}

export default Greetings;
