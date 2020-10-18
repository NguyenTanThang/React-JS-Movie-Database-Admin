import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddManager from "../components/managers/AddManager";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";

class AddManagerPage extends Component {

    render() {
        return (
            <LayoutSide>
                <ComponentHeader returnURL="/managers" title="Add Manager"/>
                <Container className="section-padding">
                    <AddManager/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddManagerPage;
