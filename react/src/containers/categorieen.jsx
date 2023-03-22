import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { CategorieCard } from "../components";
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useSession } from "../context/AuthProvider";
import { useGetCatergorieen } from "../context/TemplateProvider";
import { useNavigate } from "react-router-dom";

const Categorieen = memo(() => {
  const [categorieen, setCategorieen] = useState([]);
  const getCategorieenTemplate = useGetCatergorieen();
  const { ready } = useSession();
  const getCategorieen = useCallback(async () => {
    if (ready) {
      try {
        const data = await getCategorieenTemplate();
        setCategorieen(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [ready, getCategorieenTemplate]);

  useEffect(() => {
    getCategorieen();
  }, [getCategorieen]);

  const navigate = useNavigate();

  const aanpassenTemplate = useCallback(() => {
    navigate("/categorietemplate");
  }, [navigate]);

  return (
    <Fragment>
      <Toolbar disableGutters>
        <Typography variant={"h4"} component={"h2"} sx={{ flexGrow: 1, fontWeight: "bold", marginY: 4 }} noWrap>
          Beschikbare categorieën
        </Typography>
        <Button startIcon={<Edit />} variant={"contained"} onClick={aanpassenTemplate}>
          Aanpassen
        </Button>
      </Toolbar>
      <Grid
        container
        spacing={2}
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}>
        {categorieen.map(categorie => {
          return (
            <Grid item xs={1} key={categorie.ID}>
              <CategorieCard id={categorie.ID} naam={categorie.NAAM} url={categorie.URLICOON} />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
});

export default Categorieen;
