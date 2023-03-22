import {Fragment, memo, useCallback, useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {ChevronRight} from "@mui/icons-material";


const breadcrumbsNavbar = memo(() => {
	const navigate = useNavigate();
	const {pathname, state} = useLocation();

	const [breadcrumbDepth, setBreadcrumbDepth] = useState(0);
	const [isDisabled, setDisabled] = useState(false);
	useEffect(() => {
		switch (pathname) {
			case "/": {
				setBreadcrumbDepth(0);
				setDisabled(false);
				break;
			}
			case "/categorie": {
				setBreadcrumbDepth(1);
				setDisabled(false);
				break;
			}
			case "/sdg": {
				setBreadcrumbDepth(2);
				setDisabled(false);
				break;
			}
			case "/subsdg": {
				setBreadcrumbDepth(3);
				setDisabled(false);
				break;
			}
			case "/mvo": {
				setBreadcrumbDepth(4);
				setDisabled(false);
				break;
			}
			case "/submvo": {
				setBreadcrumbDepth(5);
				setDisabled(false);
				break;
			}
			default: {
				setDisabled(true);
				break;
			}
		}
	}, [pathname, setBreadcrumbDepth, setDisabled]);

	const handleBackToNumber = useCallback(({niveau = 0}) => {
		navigate(-breadcrumbDepth + niveau);
	}, [navigate, breadcrumbDepth]);

	return <Fragment>
		<Button onClick={handleBackToNumber}
				sx={{color: "inherit"}}
				disabled={isDisabled || breadcrumbDepth === 0}>Dashbord</Button>
		{breadcrumbDepth >= 1 && <Fragment>
			<ChevronRight/>
			<Button onClick={() => handleBackToNumber({niveau: 1})}
					sx={{color: "inherit"}}
					disabled={isDisabled || breadcrumbDepth <= 1}>Categorie: {state?.categorie?.naam}</Button>
		</Fragment>}
		{breadcrumbDepth >= 2 && <Fragment>
			<ChevronRight/>
			<Button onClick={() => handleBackToNumber({niveau: 2})}
					sx={{color: "inherit"}}
					disabled={isDisabled || breadcrumbDepth <= 2}>SDG: {state?.sdg?.nummering}</Button>
		</Fragment>}
		{breadcrumbDepth >= 3 && <Fragment>
			<ChevronRight/>
			<Button onClick={() => handleBackToNumber({niveau: 3})}
					sx={{color: "inherit"}}
					disabled={isDisabled || breadcrumbDepth <= 3}>sub SDG: {state?.subSDG?.nummering}</Button>
		</Fragment>}
		{breadcrumbDepth >= 4 && <Fragment>
			<ChevronRight/>
			<Button onClick={() => handleBackToNumber({niveau: 4})}
					sx={{color: "inherit"}}
					disabled={isDisabled || breadcrumbDepth <= 4}>MVO: {state?.mvo?.naam}</Button>
		</Fragment>}
		{breadcrumbDepth >= 5 && <Fragment>
			<ChevronRight/>
			<Button onClick={() => handleBackToNumber({niveau: 5})}
					sx={{color: "inherit"}}
					disabled={isDisabled || breadcrumbDepth <= 5}>sub MVO: {state?.subMVO?.naam}</Button>
		</Fragment>}
	</Fragment>;
});

export default breadcrumbsNavbar;