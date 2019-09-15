import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addCustomer } from '../_services/rest/customerService';
import { isValidTcNo } from '../_utils/utils';

class AddCustomerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
        };
    }

    render() {
        return (
            <div>

                <h2>Yeni müşteri ekle</h2>
                <Formik
                    initialValues={{
                        tcNo: '',
                        name: '',
                        surname: '',
                        phone: '',
                        monthlyIncome: '',
                        status:'ACTIVE'
                    }}

                    validationSchema={Yup.object().shape({
                        tcNo: Yup.string().required('Kimlik numarası gereklidir!'),
                        name: Yup.string().required('İsim gereklidir!'),
                        surname: Yup.string().required('Soyisim gereklidir!'),
                        phone: Yup.string().required('Telefon numarası gereklidir!'),
                        monthlyIncome: Yup.string().required('Aylık gelir gereklidir!'),
                    })}

                    onSubmit={({ tcNo, name,surname,phone,monthlyIncome,status }, { setStatus, setSubmitting }) => {
                        setStatus();
                        if(!isValidTcNo(tcNo)){
                            setSubmitting(false);
                            setStatus("Kimlik numarası geçerli değil!");
                            return;
                        }
                        addCustomer({ tcNo, name,surname,phone,monthlyIncome,status },
                            (response)=>{
                                const { from } = this.props.location.state || { from: { pathname: "/" } };
                                this.props.history.push(from);
                            },
                            (error)=>{
                                setSubmitting(false);
                                setStatus(error);
                            }
                        )
                    }}

                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="tcNo">Kimlik numarası</label>
                                <Field name="tcNo" type="text" className={'form-control' + (errors.tcNo && touched.tcNo ? ' is-invalid' : '')}  maxLength={11}/>
                                <ErrorMessage name="tcNo" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">İsim</label>
                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}  maxLength={20} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Soyisim</label>
                                <Field name="surname" type="text" className={'form-control' + (errors.surname && touched.surname ? ' is-invalid' : '')}  maxLength={20} />
                                <ErrorMessage name="surname" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telefon</label>
                                <Field name="phone" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')}  maxLength={11}/>
                                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="monthlyIncome">Aylık gelir</label>
                                <Field name="monthlyIncome" type="text" className={'form-control' + (errors.monthlyIncome && touched.monthlyIncome ? ' is-invalid' : '')} />
                                <ErrorMessage name="monthlyIncome" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Durum</label>
                                <Field
                                    name="status" 
                                    component="select" 
                                    placeholder="Durum"
                                    className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')}>   
                                        <option value="ACTIVE">Aktif</option>
                                        <option value="PASSIVE">Pasif</option>
                                    </Field>
                                <ErrorMessage name="status" component="div" className="invalid-feedback" />
                            </div>
       
                            <div className="form-group">
                                
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Kaydet</button>
                               
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP/
                                    //wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAA
                                    AAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACw
                                    AAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnH
                                    QLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4Q
                                    Mu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAA
                                    AAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYP
                                    DDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGq
                                    RoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsN
                                    gXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe8
                                    2p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVd
                                    mgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAj
                                    DII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }

                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export { AddCustomerPage }; 