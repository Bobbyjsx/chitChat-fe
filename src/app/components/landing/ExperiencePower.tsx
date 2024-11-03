import React from "react";
import Feature from "../Features";

const ExperiencePower = () => {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center bg-transparent">
      <h2 className="text-3xl font-bold mb-4">
        Experience the Power of ChitChat
      </h2>
      <Feature
        title="Instant Messaging"
        description="Stay in touch with real-time messaging."
      />
      <Feature
        title="Create Chat Rooms"
        description="Organize conversations effortlessly."
      />
      {/* Add more features */}
    </div>
  );
};

export default ExperiencePower;
