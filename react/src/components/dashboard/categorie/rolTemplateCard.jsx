import { Fragment, memo, useCallback, useContext, useState } from "react";
import { Card, CardHeader, CardMedia, Checkbox } from "@mui/material";
import { CatTempByRolContext } from "../../../context/CatTempByRolContext";
import { useEffect } from "react";

const categorieTemplateCard = memo(({ id, naam, url}) => {
  const templateContext = useContext(CatTempByRolContext);
  const [notChecked, setNotChecked] = useState(false);

  const handleCheck = useCallback(() => {
    setNotChecked(!notChecked);

    if (!templateContext.catTempByRolContext.includes(id) && !notChecked)
      templateContext.addCat(id);

    if (notChecked && templateContext.catTempByRolContext.includes(id))
      templateContext.removeCat(id);
  }, [notChecked, templateContext, id]);

  useEffect(() => {
    if (templateContext.catTempByRolContext.includes(id)) {
      setNotChecked(true);
    }
  }, [notChecked]);

  return (
    <Fragment>
      <Card>
        {url && (
          <CardMedia
            component={"img"}
            src={url}
            alt={"Icoon voor de categorie " + naam}
            loading={"lazy"}
            sx={{ padding: 2 }}
          />
        )}
        <CardHeader
          title={naam}
          action={
            <Checkbox
              checked={notChecked}
              onClick={handleCheck}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      </Card>
    </Fragment>
  );
});

export default categorieTemplateCard;
