import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditManager from "../components/managers/EditManager";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";

class EditManagerPage extends Component {
    render() {
        const { match: { params } } = this.props;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/managers" title="Edit Manager"/>
                <Container className="section-padding">
                    <EditManager managerID={params.managerID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default EditManagerPage;
