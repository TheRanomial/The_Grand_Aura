import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import {
  getCabin,
  getCabins,
} from "@/app/_lib/data-service";
import {
  EyeSlashIcon,
  MapPinIcon,
  UsersIcon,
  ArrowLeftIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const generateMetadata = async ({ params }) => {
  const cabin = await getCabin(params.cabinId);

  return {
    title: `ROOM ${cabin.name}`,
  };
};

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }));

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = params;
  const cabin = await getCabin(cabinId);
 
  const { id, name, maxCapacity, regularPrice, discount, image, description } =cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20  py-3 px-10 mb-24">
        <div className="relative scale-[1.15] ">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <Link
            href="/cabins"
            style={{ marginLeft: "16px" }}
            className="text-accent-100 font-black text-3xl  translate-bg-white-300 p-6 pb-1 w-[150%]"
          >
            <ArrowLeftIcon className="h-10 w-10 text-primary-100" />
          </Link>
          <h3 className="text-accent-100 font-black text-7xl mb-5  bg-primary-950 p-6 pb-1 w-[150%]">
            Room {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Shimla</span> (Himachal)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <CurrencyDollarIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Price: <span className="font-bold">INR {regularPrice}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl text-accent-500 font-semibold text-center">
          Payment on Check-In
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
