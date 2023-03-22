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
import { useState } from 'react';
import api from 'api';
import { toast } from 'react-toastify';
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
  Col,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Register = () => {
  let [user, setUser] = useState({});
  const history = useHistory();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      toast.error('Please fill all the fields');
    } else if (user.password.length < 8 || user.confirmPassword.length < 8) {
      toast.error("Password's min length should be greater than 8");
    } else if (user.password !== user.confirmPassword) {
      toast.error('Password and Confirm Password are not same');
    } else {
      const { confirmPassword, ...rest } = user;
      api('post', '/users/admin', rest)
        .then((res) => {
          setUser({ name: '', email: '', password: '', confirmPassword: '' });
          toast.success('Account created successfully');
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
      <Col lg='6' md='8'>
        <Card className='bg-secondary shadow border-0'>
          <CardBody className='px-lg-5 py-lg-5'>
            <div className='text-center text-muted mb-4'>
              <small>Sign up</small>
            </div>
            <Form role='form'>
              <FormGroup>
                <InputGroup className='input-group-alternative mb-3'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-hat-3' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Name'
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={handleInput}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className='input-group-alternative mb-3'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-email-83' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Email'
                    type='email'
                    autoComplete='new-email'
                    name='email'
                    value={user.email}
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
                    placeholder='Password'
                    type='password'
                    autoComplete='new-password'
                    name='password'
                    value={user.password}
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
                    autoComplete='new-password'
                    name='confirmPassword'
                    value={user.confirmPassword}
                    onChange={handleInput}
                  />
                </InputGroup>
              </FormGroup>
              <div className='text-center'>
                <Button className='mt-4' color='primary' type='button' onClick={handleSubmit}>
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
