import {Navigate} from "react-router-dom";
import {memo} from "react";
import {useSession} from "../../context/AuthProvider";

const privateRoute = memo(({children, mvoCoordinator = false}) => {
  const {isAuthed, isMvoCoordinator} = useSession();
  return isAuthed && (isMvoCoordinator >= mvoCoordinator) ? (
      children
  ) : (
      <Navigate to={"/login"} replace/>
  );
});

export default privateRoute;
