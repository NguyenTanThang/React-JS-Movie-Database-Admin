import React, { Component } from 'react';
import {Container} from "reactstrap";
import {Space} from "antd";
import {
    getAllManagers
} from "../actions/managerActions";
import {connect} from "react-redux";
import ManagerList from "../components/managers/ManagerList";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {Link} from "react-router-dom"

class ManagerPage extends Component {
    
    componentDidMount() {
        this.props.getAllManagers();
    }

    render() {
        return (
            <LayoutSide>
                <ComponentHeader returnURL="/" title="Managers"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                            <Link className="btn btn-primary" to="/managers/add">Add Manager</Link>
                        </Space>
                    </div>
                    <div className="table-container">
                        <ManagerList managers={this.props.managers}/>
                    </div>
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllManagers: () => {
            dispatch(getAllManagers())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        managers: state.managerReducer.managers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage);
