import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

function GoBackBtn() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>
      <ArrowLeftIcon />
    </button>
  );
}

export default GoBackBtn;
