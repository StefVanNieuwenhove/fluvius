import { Fragment, memo, useCallback, useMemo, useState, useEffect } from "react";
import { Alert, AlertTitle, Box, Toolbar, Typography, Button, TextField, Stack } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useLocation } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import * as RapporteerAPI from "../api/dashboard/rapporteerDS";
import { useSession } from "../context/AuthProvider";

const container = memo(() => {
  const { state } = useLocation();
  const { subMVO } = state;
  const { isManager } = useSession();

  const [msg, setMsg] = useState("");
  const [reports, setReports] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const fetchReports = useCallback(async () => {
    const data = await RapporteerAPI.getAll();
    setReports(data);
  }, []);

  const handleClick = useCallback(async () => {
    try {
      const datasource = subMVO.naam;
      if (msg !== "") {
        await RapporteerAPI.createReport({ datasource, msg });
        fetchReports();
        setShowAlert(false);
      } else setShowAlert(true);
    } catch (error) {
      console.error(error);
    }
  }, [msg, subMVO.naam, fetchReports]);

  const handleClose = useCallback(
    async id => {
      try {
        await RapporteerAPI.deleteReport(id);
        fetchReports();
      } catch (error) {
        console.error(error);
      }
    },
    [fetchReports]
  );

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const max = 400;
  const data = useMemo(
    () => [
      { name: "Datum 1", uv: Math.floor(Math.random() * max) + 1, pv: 2400, amt: 2400 },
      { name: "Datum 2", uv: Math.floor(Math.random() * max) + 1, pv: 2400, amt: 2400 },
      { name: "Datum 3", uv: Math.floor(Math.random() * max) + 1, pv: 2400, amt: 2400 },
      { name: "Datum 4", uv: Math.floor(Math.random() * max) + 1, pv: 2400, amt: 2400 },
      { name: "Datum 5", uv: Math.floor(Math.random() * max) + 1, pv: 2400, amt: 2400 },
    ],
    []
  );

  return (
    <Fragment>
      <Toolbar disableGutters>
        <Typography variant={"h4"} component={"h2"} sx={{ flexGrow: 1 }} noWrap>
          sub MVO: {subMVO.naam}
        </Typography>
      </Toolbar>
      <Box sx={{ aspectRatio: "2/1" }}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack spacing={2}>
            {reports
              .filter(report => report.DATASOURCE === subMVO.naam)
              .map(report => (
                <Alert severity="warning" key={report.ID} onClose={() => handleClose(report.ID)}>
                  <AlertTitle>Waarschuwing</AlertTitle>
                  {report.DATASOURCE}: {report.MSG}
                </Alert>
              ))}
          </Stack>
          {isManager && (
            <Stack spacing={2}>
              {showAlert && (
                <Alert severity="error" onClose={() => setShowAlert(false)}>
                  Gelieve een bericht mee te geven
                </Alert>
              )}
              <TextField
                data-cy="bericht_input"
                label={"Bericht"}
                variant="outlined"
                onChange={e => setMsg(e.target.value)}
              />
              <Button
                variant="contained"
                sx={[
                  { bgcolor: "orangered", paddingY: 2 },
                  {
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  },
                ]}
                startIcon={<ReportIcon />}
                onClick={handleClick}
                data-cy="rapporteer_button">
                Rapporteer
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
    </Fragment>
  );
});

export default container;
