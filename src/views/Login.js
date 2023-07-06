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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
} from 'reactstrap';
import { toast } from 'react-toastify';
import Loader from 'components/Spinner/Spinner';
import { useHistory } from 'react-router-dom';

const Login = () => {
  let [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = () => {
    if (email) {
      setLoading(true);
      api('put', `/auth/forgot/${email}`, user)
        .then(() => {
          setIsModalOpen(false);
          toast.success('Reset Password link has been sent to your email');
          setLoading(false);
        })
        .catch((err) => {
          console.log('Error ', err);
          setLoading(false);
        });
    } else {
      toast.error('Please provide email');
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    api('post', '/auth/login', user)
      .then((res) => {
        console.log('Rrrrr ', res);
        toast.success(res?.message);
        setLoading(false);
        history.push(`/auth/verify-otp/${user.email}`);
        // const { user } = res;
        // localStorage.setItem('token', res.token);
        // if (user?.role === 'admin') {
        //   window.location = '/admin/index';
        // } else if (user?.role === 'brand') {
        //   window.location = '/brand/index';
        // }
      })
      .catch((err) => {
        setLoading(false);
        console.log('Error ', err);
      });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {loading && <Loader />}
      <Col lg='5' md='7' style={{ position: 'relative' }}>
        <Card className='bg-secondary shadow border-0'>
          <CardBody className='px-lg-5 py-lg-5'>
            <div className='text-center text-muted mb-4'>
              <small>Sign In</small>
            </div>
            <Form role='form'>
              <FormGroup className='mb-3'>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-email-83' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Email'
                    type='email'
                    name='email'
                    autoComplete='new-email'
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
                    name='password'
                    autoComplete='new-password'
                    onChange={handleInput}
                  />
                </InputGroup>
              </FormGroup>
              <div className='custom-control custom-control-alternative custom-checkbox'>
                <input className='custom-control-input' id=' customCheckLogin' type='checkbox' />
                <label className='custom-control-label' htmlFor=' customCheckLogin'>
                  <span className='text-muted'>Remember me</span>
                </label>
              </div>
              <div className='text-center'>
                <Button className='my-4' color='primary' type='button' onClick={handleSubmit}>
                  Sign in
                </Button>
              </div>
              <div className='text-primary text-center' color='primary'>
                <span type='button' onClick={toggleModal} className='d-inline-block'>
                  Forgot Password?
                </span>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Forgot Password</ModalHeader>
        <ModalBody>
          <Form role='form'>
            <FormGroup>
              <InputGroup className='input-group-alternative'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <i className='ni ni-lock-circle-open' />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder='Enter your Email'
                  type='email'
                  name='email'
                  autoComplete='new-password'
                  onChange={handleEmail}
                />
              </InputGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button disabled={loading} color='primary' onClick={handleForgotPassword}>
            Submit
          </Button>{' '}
          <Button color='secondary' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Login;
