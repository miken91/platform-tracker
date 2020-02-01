import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import AssetMaintenanceComponent from "../Components/AddAssetComponents/AssetMaintenanceComponent";
import data from "./schema";

const useStyles = makeStyles(theme => ({
    listGridItem: {
        maxHeight:'60%',
        overflow: 'auto'
    }
}));
function AssetMaintenancePage() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, i) => {
        setSelectedIndex(i);
    };
    const schema = data.schema;
    return(
        <React.Fragment>
            <h1>DB Maintenance</h1>
            <h3>Choose from the following tables:</h3>
            <Grid container spacing={6}>
                <Grid item lg={3}>
                    <List className={classes.listGridItem}>
                        {schema.map((schema, i) => {
                                return <ListItem button
                                                 key={i}
                                                 selected={selectedIndex === i}
                                                 onClick={event => handleListItemClick(event, i)}>
                                    <ListItemText primary={schema.title}/>
                                </ListItem>
                            }
                        )}
                    </List>
                </Grid>
                <Grid item lg={9}>
                    <AssetMaintenanceComponent schema={schema[selectedIndex]}/>
                </Grid>
            </Grid>
        </React.Fragment>

    )
}

export default AssetMaintenancePage;