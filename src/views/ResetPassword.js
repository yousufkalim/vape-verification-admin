/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, { useState } from 'react';
import api from 'api';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
} from 'reactstrap';
import AuthNavbar from '../components/Navbars/AuthNavbar';
import '../assets/css/custom.css';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../config';

const ResetPassword = () => {
  let [user, setUser] = useState({});
  const mainContent = React.useRef(null);
  const history = useHistory();
  const params = useParams();
  const token = params?.token;

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const verifyUser = () => {
    const url = baseUrl;
    axios
      .get(`${url}/auth/verify-token/${token}`)
      .then(() => {})
      .catch((err) => {
        history.push('/auth/login');
      });
  };

  React.useEffect(() => {
    verifyUser();
    document.body.classList.add('bg-default');
    return () => {
      document.body.classList.remove('bg-default');
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, []);

  const handleSubmit = () => {
    if (!user.password || !user.confirmPassword) {
      toast.error('Please fill all the fields');
    } else if (user.password.length < 8 || user.confirmPassword.length < 8) {
      toast.error('Password should contains at least 8 characters');
    } else if (user.password !== user.confirmPassword) {
      toast.error('Password and Confirm Password are not matching');
    } else {
      api('put', `/auth/reset-password/${token}`, { password: user?.password })
        .then((res) => {
          setUser({ password: '', confirmPassword: '' });
          toast.success('Password reset successfully');
          setTimeout(() => {
            history.push('/login');
          }, 2000);
        })
        .catch((err) => {
          console.log('Error ', err);
        });
    }
  };

  return (
    <>
      <div className='main-content' ref={mainContent}>
        <AuthNavbar />
        <div className='header bg-gradient-info py-7 py-lg-8'>
          <Container>
            <div className='header-body text-center mb-7'>
              <Row className='justify-content-center'>
                <Col lg='5' md='6'>
                  <h1 className='text-white'>Welcome!</h1>
                </Col>
              </Row>
            </div>
          </Container>
          <div className='separator separator-bottom separator-skew zindex-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon className='fill-default' points='2560 0 2560 100 0 100' />
            </svg>
          </div>
        </div>
        <Container className='mt--8 pb-4'>
          <Row className='justify-content-center'>
            {/* Page content */}
            <Col lg='5' md='7'>
              <Card className='bg-secondary shadow border-0'>
                <CardBody className='px-lg-5 py-lg-5'>
                  <div className='text-center text-muted mb-4'>
                    <small>Reset Password</small>
                  </div>
                  <Form role='form'>
                    <FormGroup>
                      <InputGroup className='input-group-alternative'>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='ni ni-lock-circle-open' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Password'
                          type='password'
                          name='password'
                          autoComplete='new-password'
                          onChange={handleInput}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className='input-group-alternative'>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='ni ni-lock-circle-open' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Confirm Password'
                          type='password'
                          name='confirmPassword'
                          autoComplete='new-password'
                          onChange={handleInput}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className='custom-control custom-control-alternative custom-checkbox'>
                      <input
                        className='custom-control-input'
                        id=' customCheckLogin'
                        type='checkbox'
                      />
                    </div>
                    <div className='text-center'>
                      <Button color='primary' type='button' onClick={handleSubmit}>
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ResetPassword;
