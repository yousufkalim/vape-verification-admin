import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';
// core components

const RequestNewCodes = ({ openModal, handleModal, getUsers, setLoading }) => {
  let [request, setRequest] = useState({
    name: '',
    text: '',
    numberOfCodes: 0,
  });

  const handleInput = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (request.name === '') {
      return toast.error("Please enter user's name");
    } else if (!request.numberOfCodes) {
      return toast.error('Please enter number of codes you want to request');
    }

    const data = {
      ...request,
      number_of_codes: request.numberOfCodes,
    };
    setLoading(true);
    api('post', '/requests', data)
      .then((res) => {
        toast.success('Request has been submitted successfully');
        handleModal();
        getUsers();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal isOpen={openModal} size='md' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Request New Batch
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className='pl-lg-4'>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>{request.name ? '' : '*'} </span>
                          Name
                        </label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Batch-ID'
                          type='text'
                          value={request.name}
                          name='name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>{request.name ? '' : '*'} </span>
                          Number of Batch
                        </label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter number of codes'
                          type='number'
                          value={request.numberOfCodes}
                          name='numberOfCodes'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>Text</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Describe what product batch these codes will be used for'
                          type='textarea'
                          maxLength={300}
                          value={request.text}
                          name='text'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RequestNewCodes;
