import React, {useEffect, useState} from 'react';
import {Grid, Tabs, Tab} from '@material-ui/core';
import CreateAssetComponent from './CreateAssetComponent';
import ModifyAssetComponent from "./ModifyAssetComponent";

function AssetMaintenanceComponent(props) {
    const [value, setValue] = useState(0);
    let tabs = [
        {category: 'Asset Audience', route: 'asset-audiences'},
        {category: 'Asset Category', route: 'asset-cats'},
        {category: 'Asset SLA', route: 'asset-slas'},
        {category: 'Asset Type', route: 'asset-types'},
        {category: 'Asset Primary User Type', route: 'asset-primary-user-types'}
    ];
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function DatabaseOperation(props) {
        if(props.value === 0){
            return <CreateAssetComponent tab={tabs[props.index]}/>
        } else {
            return <ModifyAssetComponent tab={tabs[props.index]}/>
        }
    }

    return (
        <React.Fragment>
            <Grid container direction='column'>
                <Grid item>
                    <h2>Perform maintenance for {tabs[props.index].category}</h2>
                </Grid>
                <Grid item>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label='Create new entry'/>
                        <Tab label='Modify existing entry'/>
                    </Tabs>
                </Grid>
                <Grid item>
                    <DatabaseOperation value={value} index={props.index}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};



export default AssetMaintenanceComponent

