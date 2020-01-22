import React from 'react';
import { AppBar, Toolbar} from '@material-ui/core';
import { NavLink as Link } from "react-router-dom";


function AppBarComponent() {
    return(
        <AppBar position='static'>
            <Toolbar>
                <Link to="/">Home</Link>
                <Link to="/addAsset">Add Asset</Link>
            </Toolbar>
        </AppBar>

    );
}
export default AppBarComponent;