import { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import * as subMVOAPI from "../api/dashboard/subMVODoelstelling";
import { SubMVOCard } from "../components";

const Mvo = memo(() => {
  const { state } = useLocation();
  const { mvo } = state;

  const [subMVOs, setSubMVOs] = useState([]);
  const getSubMVOsByMVO = useCallback(async () => {
    try {
      const data = await subMVOAPI.getByMVO(mvo.id);
      setSubMVOs(data);
    } catch (error) {
      console.error(error);
    }
  }, [setSubMVOs, mvo.id]);

  useEffect(() => {
    getSubMVOsByMVO();
  }, [getSubMVOsByMVO]);

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
          MVO: {mvo.naam}
        </Typography>
      </Toolbar>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Stack spacing={2}>
            {subMVOs.map(mvo => {
              return (
                <SubMVOCard key={mvo.ID} id={mvo.ID} naam={mvo.NAAM} doelwaarde={mvo.DOELWAARDE} url={mvo.ICOON} />
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Box component={"div"} sx={{ position: "sticky", top: 80, aspectRatio: "16/10" }}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
});

export default Mvo;
