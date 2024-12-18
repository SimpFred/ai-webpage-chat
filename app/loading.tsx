import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black  z-50">
      <Spinner
        color="secondary"
        labelColor="secondary"
        size="lg"
        label="Loading the data"
      />
    </div>
  );
};

export default Loading;
