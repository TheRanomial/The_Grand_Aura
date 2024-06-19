"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const router = useRouter();

  function handleSubmitFilter(filter) {
    const params = new URLSearchParams(window.location.search);
    params.set('capacity', filter);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('capacity');


  return (
    <div className="border border-primary-800 flex">
      <button
        onClick={() => handleSubmitFilter("all")}
        className={`px-5 py-2 hover:bg-primary-700 ${currentFilter === "all" ? 'bg-primary-700 text-primary-100' : 'text-primary-200'}`}
      >
        All rooms
      </button>
      <button
        onClick={() => handleSubmitFilter("small")}
        className={`px-5 py-2 hover:bg-primary-700 ${currentFilter === "small" ? 'bg-primary-700 text-primary-100' : 'text-primary-200'}`}
      >
        2-4 guests
      </button>
      <button
        onClick={() => handleSubmitFilter("medium")}
        className={`px-5 py-2 hover:bg-primary-700 ${currentFilter === "medium" ? 'bg-primary-700 text-primary-100' : 'text-primary-200'}`}
      >
        4-6 guests
      </button>
      <button
        onClick={() => handleSubmitFilter("large")}
        className={`px-5 py-2 hover:bg-primary-700 ${currentFilter === "large" ? 'bg-primary-700 text-primary-100' : 'text-primary-200'}`}
      >
        6-10 guests
      </button>
    </div>
  );
}

export default Filter;
