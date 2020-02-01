import React, {useEffect, useState} from 'react';
import {Grid, Tabs, Tab} from '@material-ui/core';
import CreateAssetComponent from './CreateAssetComponent';
import ModifyAssetComponent from "./ModifyAssetComponent";

function AssetMaintenanceComponent(props) {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <h3>{props.schema.title} Maintenance</h3>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                <Tab label={"Modify Existing " + props.schema.title}/>
                <Tab label={"Create new " + props.schema.title + " entry."}/>
            </Tabs>
            {value === 0 ? <ModifyAssetComponent schema={props.schema}/> : <CreateAssetComponent schema={props.schema}/>}
        </React.Fragment>
    )
};



export default AssetMaintenanceComponent

