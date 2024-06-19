import { UsersIcon,Ru, CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import Image from "next/image"
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className="flex-1 relative">
      <Image
        src={image}
        fill
        priority
        alt={`Cabin ${name}`}
        className="border-r object-cover border-primary-800"
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
           Room {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl text-accent-300 font-[350]">
                  {regularPrice - discount} INR
                </span>
                <span className="line-through font-semibold text-accent-500">
                  {regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-[350] text-accent-300">{regularPrice} INR</span>
            )}
            <span className="text-accent-300">/ night</span>
          </p>
        </div>

        <div className=" text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l font-semibold bg-accent-700 text-primary-900 border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
