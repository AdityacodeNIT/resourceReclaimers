import React, { useEffect, useState } from "react";

const Reminder = () => {
  const [isUserActive, setIsUserActive] = useState(true);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());

  const handleUserActivity = () => {
    setIsUserActive(true);
    setLastActiveTime(Date.now());
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    const checkInactivity = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastActiveTime > 1800000) {
        // 3 minutes
        setIsUserActive(false);
      }
    }, 10);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearInterval(checkInactivity);
    };
  }, [lastActiveTime]);

  return (
    <>
      {!isUserActive && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-red-600 p-6 rounded-lg shadow-lg text-center">
            <p className="text-red-600 font-bold mb-4">
              You haven't interacted in a while. Please log in or register.
            </p>
            <button
              onClick={() => setIsUserActive(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Dismiss
            </button>
          </div>
          <div className="fixed inset-0 bg-black opacity-50"></div>{" "}
          {/* Background overlay */}
        </div>
      )}
    </>
  );
};

export default Reminder;
