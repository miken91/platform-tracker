import React, { useState } from 'react';
import { Grid, Tabs, Tab } from '@material-ui/core';
import AssetMaintenanceComponent from "../Components/AddAssetComponents/AssetMaintenanceComponent";

function AssetMaintenancePage() {
    const [value, setValue] = useState(0);
    let assetComponent = <AssetMaintenanceComponent index={value}/>;
    const handleChange = (event, newValue) => {
        setValue(newValue);
        assetComponent = <AssetMaintenanceComponent index={newValue}/>
    };
    return(
        <React.Fragment>
           <Tabs
               value={value}
               onChange={handleChange}
               centered
           >
               <Tab label='Asset Audience'/>
               <Tab label='Asset Category'/>
               <Tab label='Asset SLA'/>
               <Tab label='Asset Type'/>
               <Tab label='Asset Primary User Type'/>
           </Tabs>
            {assetComponent}
        </React.Fragment>

    )
}
export default AssetMaintenancePage;