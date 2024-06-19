import Spinner from "../_components/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-300">Loading Rooms Data...</p>
    </div>
  );
}

export default Loading;
