import {Fragment, memo, useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Card, CardActionArea, CardHeader, CardMedia} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";


const sdgCard = memo(({
                          id,
                          naam,
                          nummering,
                          url,
                      }) => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {categorie} = state;

    const handleOpenSDG = useCallback(() => {
        navigate("/sdg", {
            state: {
                categorie,
                sdg: {
                    id,
                    naam,
                    nummering,
                    url,
                },
            },
        });
    }, [navigate, id, naam, nummering, url]);

    return <Fragment>
        <Card>
            <CardActionArea onClick={handleOpenSDG}>
                {
                    url &&
                    <CardMedia
                        component={"img"}
                        src={url}
                        alt={"Icoon voor de SDG " + naam}
                        loading={"lazy"}
                    />
                }
                <CardHeader title={nummering} subheader={naam} action={<ChevronRight fontSize={"large"} />} />
            </CardActionArea>
        </Card>
    </Fragment>;
});

export default sdgCard;