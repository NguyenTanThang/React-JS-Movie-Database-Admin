import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditCustomer from "../components/customers/EditCustomer";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";

class EditCustomerPage extends Component {
    render() {
        const { match: { params } } = this.props;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/customers" title="Edit Customer"/>
                <Container className="section-padding">
                    <EditCustomer customerID={params.customerID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default EditCustomerPage;
