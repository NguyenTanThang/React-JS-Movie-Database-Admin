import React, { Component } from 'react';
import { Descriptions } from 'antd';
import {convertKeyToText, checkIfIn} from "../../utils/utils";

const restrictedKeys = [
    "__v",
    "_id",
    "password"
]

class CustomerDetails extends Component {

    renderCustomerDescriptionItems = () => {
        const {customerItem} = this.props;
        const currentCustomer = customerItem.customerItem;
        console.log(currentCustomer);
        let descriptionItems = [];

        for (var property in currentCustomer) {
            if (currentCustomer.hasOwnProperty(property)) {
                if (checkIfIn(property, restrictedKeys)) {
                    continue;
                }
                
              const label = convertKeyToText(property);
              const content = String(currentCustomer[property]);
              const key = `cd-${property}`

              descriptionItems.push(
                <Descriptions.Item key={key} label={label}>{content}</Descriptions.Item>
              )
            }
        }

        return descriptionItems;
    }

    render() {
        const {renderCustomerDescriptionItems} = this;

        return (
            <Descriptions title="Customer Details" layout="vertical" bordered>
                {renderCustomerDescriptionItems()}
            </Descriptions>
        )
    }
}

export default CustomerDetails;
