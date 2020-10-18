import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddCustomer from "../components/customers/AddCustomer";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";

class AddCustomerPage extends Component {

    render() {
        return (
            <LayoutSide>
                <ComponentHeader returnURL="/customers" title="Add Customer"/>
                <Container className="section-padding">
                    <AddCustomer/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddCustomerPage;
