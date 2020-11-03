import React, { Component } from 'react';
import {Container} from "reactstrap";
import CustomerDetails from "../components/customers/CustomerDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCustomerByID} from "../requests/customerRequests";

class CustomerDetailsPage extends Component {

    state = {
        customerItem: ""
    }

    async componentDidMount() {
        const {customerID} = this.props.match.params;
        const customerItem = await getCustomerByID(customerID);
        this.setState({
            customerItem
        })
    }

    render() {
        const {customerItem} = this.state;

        if (!customerItem) {
            return (<></>)
        }

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/customers" title="Customer Details"/>
                <Container className="section-padding">
                    <CustomerDetails customerItem={customerItem}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default CustomerDetailsPage;
