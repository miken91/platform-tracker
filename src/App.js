import React from 'react';
import PageTemplate from './Templates/PageTemplate';
import {Route, Switch} from "react-router-dom";
import AssetMaintenancePage from "./Pages/AssetMaintenancePage";

function App() {
    return (
        <Switch>
            <Route path="/addAsset">
                <PageTemplate children={<AssetMaintenancePage/>}/>
            </Route>
            <Route path="/">
                <PageTemplate children={<div>hello</div>}></PageTemplate>
            </Route>
        </Switch>
    );
}

export default App;
