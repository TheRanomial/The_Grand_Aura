
import ReservationCard from "@/app/_components/ReservationCard";
import { getBookings, getCabin, getGuest } from "@/app/_lib/data-service";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export const revalidate=0;

export const metadata={
  title:"Bookings"
}

export default async function Page() {
  const session=await auth();
  const {id:bookingId}=await getGuest(session.user.email);
  
  // CHANGE
  const bookings =await getBookings(bookingId);
 
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
