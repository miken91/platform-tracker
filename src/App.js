import React, {useState} from 'react';
import PageTemplate from './Templates/PageTemplate';
import {Route, Switch} from "react-router-dom";
import AssetMaintenancePage from "./Pages/AssetMaintenancePage";
import LoginPage from "./Pages/LoginPage";
import ApplicationContext from './ApplicationContext';

function App() {
    const [token, setToken] = useState();
    return (
        <React.Fragment>
            <ApplicationContext.Provider value={{token, setToken}}>
                {token ?
                    <Switch>
                        <Route path="/addAsset">
                            <PageTemplate children={<AssetMaintenancePage/>}/>
                        </Route>
                        <Route path="/">
                            <PageTemplate children={<AssetMaintenancePage/>}/>
                        </Route>
                    </Switch> :
                    <LoginPage></LoginPage>}
            </ApplicationContext.Provider>
        </React.Fragment>
    )
}

export default App;
