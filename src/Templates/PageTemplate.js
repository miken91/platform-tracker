import React from 'react';
import { Container } from '@material-ui/core';
import AppBarComponent from "../Components/AppBarComponent";

function PageTemplate(props) {
    return(
        <div>
            <AppBarComponent/>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}
export default PageTemplate;
