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
import Cookies from 'js-cookie';
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
  Col
} from 'reactstrap';
import { toast } from 'react-toastify';
import Loader from 'components/Spinner/Spinner';
import { useParams } from 'react-router-dom';

const VerifyOtp = () => {
  const [code, setCode] = useState('');
  const [reloadFlag, setRelodFlag] = useState(true);
  const [loading, setLoading] = useState(false);

  const param = useParams();

setTimeout(() => {
  setRelodFlag(false)
}, 600000);

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    const trimmedCode = code.trim();
    if (!param.email) {
      toast.error('No email provided. Please provide an email to proceed.');
    } else if (!trimmedCode) {
      toast.error(
        'No One-Time Password code provided. Please enter the code you received in your email.'
      );
    } else if (isNaN(trimmedCode)) {
      toast.error(
        'Invalid One-Time Password code. The code should only contain numbers. Please check the code and try again.'
      );
    } else {
      setLoading(true);
      const data = { email: param.email, code: parseInt(trimmedCode, 10) };
      api('post', '/auth/verify-code', data)
        .then((res) => {
          const { user } = res;
          console.log('user is', user);
          Cookies.set(user.email, user.email);
          localStorage.setItem('token', res.token);
          if (user?.role === 'admin') {
            window.location = '/admin/index';
          } else if (user?.role === 'brand') {
            window.location = '/brand/index';
          }
        })
        .catch((err) => {
          setLoading(false);
          // console.error('Error ', err);
          // if (err.response?.data?.code === 'invalid_code') { 
          //   toast.error(
          //     'Invalid One-Time Password code. Please check the code and try again.'
          //   );
          // } else {
          //   toast.error(
          //     'An unexpected error occurred. Please try again later.'
          //   );
          // }
        });
    }
  };
  const handleResend = () => {
    if (!param.email) {
      toast.error('No email provided. Please provide an email to proceed.');
    } else {
      setLoading(true);
      const data = { email: param.email };
      api('post', '/auth/resendotp', data)
        .then((res) => {
          setLoading(false);
          toast.success(res?.message);
        })
        .catch((err) => {
          setLoading(false);
          console.error('Error ', err);

          toast.error('An unexpected error occurred. Please try again later.');
        });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Col lg="5" md="7" style={{ position: 'relative' }}>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>
                Please check your email for the One-Time Password code and enter
                it below.
              </small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter One-Time Password"
                    type="text"
                    name="otp"
                    autoComplete="otp"
                    onChange={handleCode}
                    style={{ appearance: 'textfield' }}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  disabled={loading || reloadFlag}
                  onClick={handleResend}
                >
                  Resend
                </Button>
                <Button
                disabled={loading}
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={handleSubmit}
                >
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
