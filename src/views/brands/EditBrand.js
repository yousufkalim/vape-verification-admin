import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Select } from 'antd';
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
import FilePicker from 'components/FilePicker/FilePicker';
// core components

const { Option } = Select;

const EditBrand = ({ openModal, handleModal, user, setUser, getUsers, fileName, setFileName }) => {
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFileName('');
    setUser((prev) => ({ ...prev, preferences: { ...prev.preferences, logo: null } }));
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setUser((prev) => ({
        ...prev,
        logo: e.target.files[0],
      }));
      setFileName(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleColor = (e) => {
    setUser((prev) => ({ ...prev, preferences: { ...prev.preferences, color: e.target.value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.name === '') {
      return toast.error("Please enter user's name");
    }

    if (user.email === '') {
      return toast.error('Please enter email');
    }

    let formData = new FormData();

    for (let key in user) {
      if (key === 'preferences') {
        formData.append(key, JSON.stringify(user[key]));
      } else {
        formData.append(key, user[key]);
      }
    }

    api('put', `/users/brand/${user._id}`, formData).then((res) => {
      toast.success('Brand updated successfully');
      getUsers();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Edit a brand
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className='pl-lg-4'>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.name ? '' : '*'} </span>
                        <label className='form-control-label'>Name</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's name here"
                          type='text'
                          value={user.name}
                          name='name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.email ? '' : '*'} </span>
                        <label className='form-control-label'>Email</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's email here"
                          type='email'
                          value={user.email}
                          name='email'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label' htmlFor='input-password'>
                          Password
                        </label>
                        <Input
                          className='form-control-alternative'
                          id='input-password'
                          placeholder='Password'
                          type='password'
                          value={user.password}
                          name='password'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.number ? '' : '*'} </span>
                        <label className='form-control-label'>Contact no.</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's contact here"
                          type='phone'
                          value={user.number}
                          name='number'
                          onChange={handleInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>Logo</label>
                        <FilePicker
                          accept='image/*'
                          fileName={fileName}
                          isDelete={true}
                          handleDelete={handleDeleteImage}
                          type='file'
                          onChange={handleFile}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>Color</label>
                        <Input
                          className='form-control-alternative text-default color_field'
                          type='color'
                          value={user.preferences.color}
                          name='color'
                          onChange={handleColor}
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditBrand;
