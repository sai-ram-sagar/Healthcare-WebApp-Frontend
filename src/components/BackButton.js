import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="btn btn-warning" onClick={() => navigate(-1)} 
      style={{
        position:"absolute",
        top:"135px",
        left:"10px",
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="me-1"/>
      Back
    </button>
  );
};

export default BackButton;
