import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addPlan
} from "../../actions/planActions";
import { Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup} from 'reactstrap';

class AddPlan extends Component {

    state = {
        name: "",
        price: "",
        description: "",
        durationInDays: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {addPlan} = this.props;
        const {name, price, description, durationInDays} = this.state;

        addPlan({name, price, description, durationInDays});
        this.setState({
            name: "",
            price: "",
            description: "",
            durationInDays: ""
        })
    }

    render() {
        const {handleChange, handleSubmit} = this;
        const {name, price, description, durationInDays} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <TextField id="name" name="name" label="Name" variant="outlined" className="material-input" required onChange={handleChange} value={name}/>
                    </FormGroup>
                    <FormGroup>
                        <TextField id="price" name="price" type="number" label="Price" variant="outlined" className="material-input" required onChange={handleChange} value={price}/>
                    </FormGroup>
                    <FormGroup>
                        <TextField id="durationInDays" name="durationInDays" type="number" label="Duration In Days" variant="outlined" className="material-input" required onChange={handleChange} value={durationInDays}/>
                    </FormGroup>
                    <FormGroup>
                        <TextField id="description" name="description" label="Description" variant="outlined" className="material-input" required onChange={handleChange} value={description}/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="primary" htmlType="submit" block>
                            Create
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addPlan: (newPlan) => {
            dispatch(addPlan(newPlan))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(AddPlan);
