import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddPlan from "../components/plans/AddPlan";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";

class AddPlanPage extends Component {

    render() {
        return (
            <LayoutSide>
                <ComponentHeader returnURL="/plans" title="Add Plan"/>
                <Container className="section-padding">
                    <AddPlan/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddPlanPage;
