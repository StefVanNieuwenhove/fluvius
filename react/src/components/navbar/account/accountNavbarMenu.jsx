import { Fragment, memo } from "react";
import { Button, IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useLogout, useSession } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const accountNavbarMenu = memo(() => {
  const logout = useLogout();
  const { isMvoCoordinator } = useSession();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/roltemplate");
  }, []);

  return (
    <Fragment>
      {isMvoCoordinator && (
        <Button color={"inherit"} onClick={handleClick}>
          Rollen aanpassen
        </Button>
      )}
      <IconButton edge={"end"} size="large" onClick={logout} color="inherit">
        <Logout />
      </IconButton>
    </Fragment>
  );
});

export default accountNavbarMenu;
