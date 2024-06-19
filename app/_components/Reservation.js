import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../api/auth/[...nextauth]/route";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const settings=await getSettings();
  const bookedDates=await getBookedDatesByCabinId(cabin.id);
  const session=await auth();

  return (
    <div className="grid grid-cols-2 min-h-[400px] border border-primary-800 mt-10">
      <DateSelector settings={settings} cabin={cabin} bookedDates={bookedDates} />
      {session?.user?<ReservationForm cabin={cabin} session={session}/>:<LoginMessage/>}
    </div>
  );
}

export default Reservation;
