import { memo, Fragment, useCallback, useState, useEffect, useContext } from "react";
import { Toolbar, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { CategorieTemplateCard } from "../components";
import { CatTempByUserContext } from "../context/CatTempByUserContext";
import config from "../config.json";
import * as gebruikerTemplateAPI from "../api/dashboard/gebruikerTemplate";
import { getCatsByRole } from "../context/TemplateProvider";

const Categorietemplate = memo(() => {
  const templateContext = useContext(CatTempByUserContext);
  const LS_GEBRUIKER_TEMPLATE = config.template_gebruiker;
  const navigate = useNavigate();

  const [categorieen, setCategorieen] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const getCategorieen = useCallback(async () => {
    try {
      const data = await getCatsByRole();
      setCategorieen(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const templateAanpassen = useCallback(async () => {
    console.log(templateContext);
    const newTemplate = templateContext.getSelectedCats().join(",");
    if (newTemplate !== "") {
      localStorage.setItem(LS_GEBRUIKER_TEMPLATE, newTemplate);
      try {
        const success = await gebruikerTemplateAPI.updateCatViewById(localStorage.getItem("gebruiker_ID"), newTemplate);
        if (success) navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else setIsEmpty(true);
  }, [templateContext, LS_GEBRUIKER_TEMPLATE, navigate]);

  useEffect(() => {
    getCategorieen();
  }, [getCategorieen]);

  const annuleren = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Fragment>
      <Toolbar disableGutters>
        <Typography variant={"h4"} component={"h2"} sx={{ flexGrow: 1, fontWeight: "bold", marginY: 4 }} noWrap>
          Categorieën template aanpassen
        </Typography>
        <Button startIcon={<ClearIcon />} variant={"contained"} sx={{ mr: 2 }} onClick={annuleren}>
          Annuleren
        </Button>
        <Button startIcon={<CheckIcon />} variant={"contained"} onClick={templateAanpassen}>
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
              <CategorieTemplateCard id={categorie.ID} naam={categorie.NAAM} url={categorie.URLICOON} />
            </Grid>
          );
        })}
      </Grid>
      {isEmpty && <Typography variant="h5">Gelieve minstens 1 categorie aan te duiden</Typography>}
    </Fragment>
  );
});

export default Categorietemplate;
