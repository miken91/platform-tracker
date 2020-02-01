import React, {useEffect, useState} from 'react'
import {Button, FormControlLabel, FormGroup, Switch, TextField, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    createFields: {
        marginRight: "1.5em"
    },
    createButton: {
        marginTop: "1em"
    }
}));
function CreateAssetComponent(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <h4> Create new entry </h4>
            <form className={classes.createFields}>
                <Grid container>
                    {Object.entries(props.schemas.properties).map(([fieldName, type]) => {
                        if(type.type === "string") {
                            if(fieldName.includes("Date")) {
                                return null
                            } else {
                                return <Grid item sm={3}><TextField className={classes.createFields} label={fieldName}/></Grid>
                            }
                        } else if(type.type === "boolean") {
                            return <Grid item sm={3}><FormControlLabel control={<Switch
                            size="medium"
                            edge="end"/>}label={fieldName}/></Grid>
                        }

                    })}
                </Grid>
            <Button className={classes.createButton} variant="contained">Create New Entry</Button>
            </form>
        </React.Fragment>
    )
}

export default CreateAssetComponent;