import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  const cabins = await getCabins();
  let filterCapacity = 0;
  let filteredCabins;

  if (filter == "all") {
    filterCapacity = 0;
  }

  if (filter == "small") {
    filterCapacity = 2;
  }
  if (filter == "medium") {
    filterCapacity = 4;
  }

  if (filter == "large") {
    filterCapacity = 10;
  }

  if (filter === "large") {
    filteredCabins =
      filterCapacity > 0
        ? cabins.filter((cabin) => cabin.maxCapacity >= 6)
        : cabins;
  } else {
    filteredCabins =
      filterCapacity > 0
        ? cabins.filter((cabin) => cabin.maxCapacity === filterCapacity)
        : cabins;
  }

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
