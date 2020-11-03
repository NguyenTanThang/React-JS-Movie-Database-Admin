import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditPlan from "../components/plans/EditPlan";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";

class EditPlanPage extends Component {
    render() {
        const { match: { params } } = this.props;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/plans" title="Edit Manager"/>
                <Container className="section-padding">
                    <EditPlan planID={params.planID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default EditPlanPage;
