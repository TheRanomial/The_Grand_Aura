"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

function ReservationProvider({ children }) {
  const [bookedDate, setBookedDate] = useState({
    from: undefined,
    to: undefined,
  });

  const resetRange = () =>
    setBookedDate({
      from: undefined,
      to: undefined,
    });

  return (
    <ReservationContext.Provider
      value={{
        bookedDate,
        setBookedDate,
        resetRange
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  return context;
}

export { ReservationProvider, useReservation };
