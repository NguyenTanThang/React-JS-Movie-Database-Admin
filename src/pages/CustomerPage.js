import React, { Component } from 'react';
import {Container} from "reactstrap";
import {Space} from "antd";
import {
    getAllCustomers
} from "../actions/customerActions";
import {connect} from "react-redux";
import CustomerList from "../components/customers/CustomerList";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {Link} from "react-router-dom"

class CustomerPage extends Component {
    
    componentDidMount() {
        this.props.getAllCustomers();
    }

    render() {
        return (
            <LayoutSide>
                <ComponentHeader returnURL="/" title="Customers"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                            <Link className="btn btn-primary" to="/customers/add">Add Customer</Link>
                        </Space>
                    </div>
                    <div className="table-container">
                        <CustomerList customers={this.props.customers}/>
                    </div>
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCustomers: () => {
            dispatch(getAllCustomers())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customerReducer.customers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
