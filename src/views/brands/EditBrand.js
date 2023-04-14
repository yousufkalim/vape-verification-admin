import React from 'react';
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
import FilePicker from 'components/FilePicker/FilePicker';
// core components

const EditBrand = ({
  openModal,
  handleModal,
  user,
  setUser,
  getUsers,
  fileName,
  setFileName,
  setLoading,
}) => {
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
    setUser((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [e.target.name]: e.target.value },
    }));
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
    setLoading(true);
    api('put', `/users/brand/${user._id}`, formData)
      .then((res) => {
        toast.success('Brand updated successfully');
        getUsers();
        setLoading(false);
        handleModal();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal isOpen={openModal} size='md' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Edit a brand
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className='px-lg-2'>
                  <Row>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.name ? '' : '*'} </span>
                        <label className='form-control-label'>Brands Name</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's name"
                          type='text'
                          value={user.name}
                          name='name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.email ? '' : '*'} </span>
                        <label className='form-control-label'>Email</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's email"
                          type='email'
                          value={user.email}
                          name='email'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col lg='12' style={{ margin: 'auto' }}>
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
                  <Row>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          {/* <span style={{ color: 'red' }}>{user.logoWidth ? '' : '*'} </span> */}
                          Website Link
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          placeholder='Enter website Link'
                          type='text'
                          value={user.websiteLink}
                          name='websiteLink'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          {/* <span style={{ color: 'red' }}>{user.logoWidth ? '' : '*'} </span> */}
                          Logo Width (Px)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          placeholder='Enter Logo Width'
                          type='number'
                          value={user.logoWidth}
                          name='logoWidth'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' style={{ marginRight: 'auto' }}>
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
                    <Col lg='6' style={{ marginRight: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>Secondary Color</label>
                        <Input
                          className='form-control-alternative text-default color_field'
                          type='color'
                          value={user.preferences.secondaryColor}
                          name='secondaryColor'
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
