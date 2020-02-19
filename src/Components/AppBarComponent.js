import React, {useContext} from 'react';
import { AppBar, Toolbar} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { NavLink as Link } from "react-router-dom";
import ApplicationContext from "../ApplicationContext";
const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    linkStyle: {
        color: "white",
        textDecoration: "none"
    }
}));
function AppBarComponent() {
    const classes = useStyles();
    const context = useContext(ApplicationContext);
    return(
        <AppBar position='static'>
            <Toolbar>
                <h3 className={classes.title}>Application Platform Tracker</h3>
                {context.token?
                <Link className={classes.linkStyle} to="/addAsset">Database Maintenance</Link> : null}
            </Toolbar>
        </AppBar>

    );
}
export default AppBarComponent;