import { Fragment, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, useSession } from "../context/AuthProvider";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Divider,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import fluvius_logo from "../images/fluvius_logo.png";
import itsme from "../images/Itsme.png";

const Login = memo(() => {
  const navigate = useNavigate();
  const login = useLogin();
  const { loading, error } = useSession();

  const handleLogin = useCallback(
    async ({ naam, wachtwoord }) => {
      const success = await login({
        naam,
        wachtwoord,
      });
      if (success) {
        navigate("/", { replace: true });
      } else {
        console.error("Login mislukt");
      }
    },
    [login, navigate]
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      handleLogin({
        naam: data.get("naam"),
        wachtwoord: data.get("wachtwoord"),
      });
    },
    [handleLogin]
  );

  return (
    <Fragment>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Card sx={{ padding: 2 }}>
          <img src={fluvius_logo} alt="logo" style={{ width: "120px" }} />
          <CardHeader title={"Login"} action={<Avatar sx={{ bgcolor: red[400] }} />} />
          {/* <CardMedia component="img" height="40" image={fluvius_logo} alt="logo" /> */}
          <Box component={"form"} onSubmit={handleSubmit}>
            <Stack>
              <TextField
                required
                id={"naam"}
                name={"naam"}
                label={"Gebruikersnaam"}
                type={"text"}
                autoComplete={"username"}
                autoFocus
                margin={"dense"}
                disabled={!!loading}
                data-cy="naam_input"
              />
              <TextField
                required
                id={"wachtwoord"}
                name={"wachtwoord"}
                label={"Wachtwoord"}
                type={"password"}
                autoComplete={"password"}
                margin={"dense"}
                disabled={!!loading}
                data-cy="wachtwoord_input"
              />
            </Stack>
            <Button
              type={"submit"}
              disabled={!!loading}
              fullWidth
              variant={"contained"}
              sx={{ marginTop: 1 }}
              data-cy="login_button">
              Log in
            </Button>
          </Box>
          <Divider sx={{ marginY: 1 }} />
          <Button
            disabled={!!loading}
            fullWidth
            variant={"contained"}
            sx={[
              { bgcolor: "orangered" },
              {
                "&:hover": {
                  backgroundColor: "white",
                },
              },
            ]}>
            <img src={itsme} alt="itsme logo" style={{ height: "30px" }} />
          </Button>
        </Card>
      </Box>
      <Snackbar open={!!error}>
        <Alert severity={"error"}>{error}</Alert>
      </Snackbar>
    </Fragment>
  );
});

export default Login;
