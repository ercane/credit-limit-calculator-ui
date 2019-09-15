import React from 'react';

import { getAllActiveCustomers, calculateCreditLimit } from '../_services/rest/customerService';
import { LOGGER } from '../_utils/logUtils';
import { storageService } from '../_services/storage/storageService';

const TAG = "HomePage"
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: storageService.userValue,
            customers: [],
            headers: ["Kimlik No", "İsim", "Soyisim", "Kredi Limiti", ""]
        };
    }

    componentDidMount() {
        this.getCustomers();
    }

    getCustomers() {
        getAllActiveCustomers(
            (response) => {
                this.setState({ customers: response })
            },
            (error) => {
                LOGGER.error(TAG, "getAllActiveCustomers error: " + error)
            });
    }

    renderTableHeader() {
        return this.state.headers.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    calculateCreditLimit(id) {
        LOGGER.info(TAG, "ID: " + id)
        calculateCreditLimit(id,
            (response) => {
                this.getCustomers();
            },
            (error) => { LOGGER.error(TAG, "Calculate Error: " + error) }
        )
    }

    renderTableData() {
        return this.state.customers.map((customer, index) => {
            const { id, tcNo, name, surname, creditLimit } = customer //destructuring
            return (
                <tr key={id} style={{ borderBottom: 5, borderBottomColor: 'black' }}>
                    <td style={{ marginLeft: 16 }}>{tcNo}</td>
                    <td style={{ marginLeft: 16 }}>{name}</td>
                    <td style={{ marginLeft: 16 }}>{surname}</td>
                    <td style={{ marginLeft: 16 }}>{creditLimit} TL</td>
                    <td style={{ marginLeft: 16 }}><button onClick={() => { this.calculateCreditLimit(id) }}>Limiti yeniden hesapla</button></td>
                </tr>
            )
        })
    }

    render() {
        const { currentUser, customers } = this.state;
        LOGGER.info(TAG, "Customers: " + this.state.customers)
        return (
            <div>
                <h1>Hi {currentUser.user.name}!</h1>

                {customers.length > 0 ?
                    <div>
                        <h3>Active customers:</h3>
                        <table id='customers' style={{ border: 1, borderColor: 'black' }}>
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>:
                    <label>There is no active customer</label>
                }
            </div>
        );
    }
}

export { HomePage };