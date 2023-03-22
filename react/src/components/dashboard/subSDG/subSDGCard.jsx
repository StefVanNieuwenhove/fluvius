import {Fragment, memo, useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Card, CardActionArea, CardHeader, CardMedia} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";


const subSDGCard = memo(({
                             id,
                             beschrijving,
                             nummering,
                             url,
                         }) => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {categorie, sdg} = state;

    const handleOpenSDG = useCallback(() => {
        navigate("/subsdg", {
            state: {
                categorie,
                sdg,
                subSDG: {
                    id,
                    beschrijving,
                    nummering,
                    url,
                },
            },
        });
    }, [navigate, id, beschrijving, nummering, url]);

    return <Fragment>
        <Card>
            <CardActionArea onClick={handleOpenSDG}>
                {
                    url &&
                    <CardMedia
                        component={"img"}
                        src={url}
                        alt={"Icoon voor de subSDG " + beschrijving}
                        loading={"lazy"}
                    />
                }
                <CardHeader title={nummering} subheader={beschrijving} action={<ChevronRight fontSize={"large"} />} />
            </CardActionArea>
        </Card>
    </Fragment>;
});

export default subSDGCard;