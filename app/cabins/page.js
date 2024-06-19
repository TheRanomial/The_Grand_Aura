export const metadata = {
  title: "ROOMS",
};

import { Suspense } from "react";
import Loading from "./loading";
import CabinList from "../_components/CabinList";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";


export const revalidate = 0;

export default async function Page({searchParams}) {

  const filter=searchParams?.capacity??"all";

  return (
    <div>
      <h1 className="text-5xl mb-9 text-accent-400 font-medium">
        Our Available Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Nestled in the heart of the majestic Himalayas, our hotel in Shimla
        offers an unparalleled blend of luxury and natural beauty. With
        breathtaking views of snow-capped mountains and lush pine forests, each
        stay promises a serene escape from the hustle and bustle of city life.
        Guests can indulge in world-class amenities, savor exquisite cuisine,
        and experience the warm hospitality that Shimla is renowned for.
      </p>

      <div className="flex justify-end mb-10"><Filter/></div>

      <Suspense fallback={<Loading />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder/>
      </Suspense>
    </div>
  );
}
