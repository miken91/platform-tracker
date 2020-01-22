import React from 'react';
import { Grid } from '@material-ui/core';


function ModifyAssetComponent(props) {
    fetch('http://127.0.0.1:3001/' + props.tab.route)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
           console.log(data);
        });

    return(
       <React.Fragment>
           <h4>Modify an existing {props.tab.category} entry</h4>
       </React.Fragment>
    )
}

export default ModifyAssetComponent;