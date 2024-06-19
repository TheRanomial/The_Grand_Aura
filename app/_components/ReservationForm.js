"use client";

import { differenceInDays, format } from "date-fns";
import { handleCreateBooking } from "../_lib/actions";
import { useReservation } from "./ReservationContext";
import { SubmitButton } from "./SubmitButton";

function ReservationForm({ cabin, session }) {
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const { bookedDate, resetRange } = useReservation();

  const numNights = differenceInDays(bookedDate.to, bookedDate.from);
  const startDate = bookedDate.from;
  const endDate = bookedDate.to;

  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = handleCreateBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        {
          <div className="flex gap-4 items-center justify-end">
            <img
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="h-8 rounded-full"
              src={session.user.image}
              alt={session.user.name}
            />
            <p>Logged in as {session.user.name}</p>
            <p>
              {startDate ? format(startDate, "PPP") : "Select a start date"}
            </p>
            <p>{endDate ? format(endDate, "PPP") : "Select a start date"}</p>
          </div>
        }
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton label="Reserve"/>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
