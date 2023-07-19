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
  Col,
} from 'reactstrap';
import { toast } from 'react-toastify';
import Loader from 'components/Spinner/Spinner';
import { useParams } from 'react-router-dom';

const VerifyOtp = () => {
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const param = useParams();

  const handleCode = (e) => {
    const trimmedCode = e.target.value.trim();
    setCode(trimmedCode);
  };

  const handleSubmit = () => {
    if (!param.email) {
      toast.error('Email is required');
    } else if (!code) {
      toast.error('Code is required');
    } else {
      setLoading(true);
      const data = { email: param.email, code: parseInt(code) };
      api('post', '/auth/verify-code', data)
        .then((res) => {
          const { user } = res;
          localStorage.setItem('token', res.token);
          if (user?.role === 'admin') {
            window.location = '/admin/index';
          } else if (user?.role === 'brand') {
            window.location = '/brand/index';
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log('Error ', err);
        });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Col lg='5' md='7' style={{ position: 'relative' }}>
        <Card className='bg-secondary shadow border-0'>
          <CardBody className='px-lg-5 py-lg-5'>
            <div className='text-center text-muted mb-4'>
              <small>Verify Code</small>
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
                    placeholder='Enter code here'
                    type='number'
                    name='otp'
                    autoComplete='otp'
                    onChange={handleCode}
                  />
                </InputGroup>
              </FormGroup>

              <div className='text-center'>
                <Button className='my-4' color='primary' type='button' onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default VerifyOtp;
