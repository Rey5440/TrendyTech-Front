
import BeatLoader from "react-spinners/BeatLoader";
import "./loader.css"
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner">
      <BeatLoader
        color={"#36d7b7"}
        loading={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </div>
  );
};

export default Loader;
