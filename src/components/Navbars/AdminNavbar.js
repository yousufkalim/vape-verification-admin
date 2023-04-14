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
import { useEffect, useState } from 'react';
import { Store } from 'StoreContext';
// reactstrap components
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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import FilePicker from 'components/FilePicker/FilePicker';
import { toast } from 'react-toastify';
import api from 'api';
import { mediaUrl } from '../../config';

const AdminNavbar = ({ brandText, getUser }) => {
  const { user } = Store();
  const [profile, setProfile] = useState();
  const [fileName, setFileName] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && user.role === 'brand') {
      setProfile({
        name: user?.name,
        email: user?.email,
        logo: user?.preferences?.logo,
        websiteLink: user.websiteLink ? user.websiteLink : '',
        logoWidth: user.logoWidth ? user.logoWidth : '',
        preferences: user?.preferences,
        password: '',
        confirmPassword: '',
      });

      setFileName(user?.preferences?.logo ? `${mediaUrl}${user?.preferences?.logo}` : '');
    } else if (user && user.role === 'admin') {
      setProfile({
        name: user?.name,
        email: user?.email,
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProfile((prof) => ({ ...prof, [name]: value }));
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setProfile((prev) => ({
        ...prev,
        logo: e.target.files[0],
      }));
      setFileName(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFileName('');
    setProfile((prev) => ({ ...prev, logo: null }));
  };

  const handleColor = (e) => {
    setProfile((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [e.target.name]: e.target.value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profile.name === '') {
      return toast.error("Please enter user's name");
    }

    if (profile.email === '') {
      return toast.error('Please enter email');
    }
    if (profile.password) {
      if (!profile?.confirmPassword) {
        return toast.error('Please enter confirm password');
      }
      if (profile?.password.length < 8 || profile?.confirmPassword?.length < 8) {
        return toast.error('Password should contains at least 8 characters');
      } else if (profile?.password !== profile?.confirmPassword) {
        return toast.error('Password and Confirm Password are not matching');
      }
    }

    if (user.role === 'brand') {
      updateBrand();
    } else {
      updateAdmin();
    }
  };

  const updateBrand = () => {
    let formData = new FormData();

    for (let key in profile) {
      if (key === 'preferences') {
        formData.append(key, JSON.stringify(profile[key]));
      } else {
        profile[key] && key !== 'confirmPassword' && formData.append(key, profile[key]);
      }
    }

    api('put', `/users/brand/${user._id}`, formData).then((res) => {
      getUser();
      toast.success('Brand updated successfully');
      handleModal();
    });
  };

  const updateAdmin = () => {
    const data = {
      name: profile.name,
      email: profile.email,
    };
    if (profile?.password) {
      data['password'] = profile?.password;
    }
    api('put', `/users/admin`, data).then((res) => {
      getUser();
      toast.success('Profile updated successfully');
      handleModal();
    });
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    window.location = '/auth/login';
  };

  return (
    <>
      <Navbar className='navbar-top navbar-dark' expand='md' id='navbar-main'>
        <Container fluid>
          <div
            className='h4 mb-0 text-white text-uppercase d-none d-lg-inline-block'
            // to='/admin/index'
          >
            {brandText}
          </div>
          <Nav className='align-items-center d-none d-md-flex' navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className='pr-0' nav>
                <Media className='align-items-center'>
                  <Media className='ml-2 d-none d-lg-block'>
                    <span className='mb-0 text-sm font-weight-bold'>{user?.name}</span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-arrow' right>
                <DropdownItem href='#pablo' onClick={handleModal}>
                  <i className='ni ni-single-02' />
                  <span>Profile</span>
                </DropdownItem>
                <DropdownItem href='#pablo' onClick={handleLogout}>
                  <i className='ni ni-user-run' />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
      {/*     PROFILE MODAL     */}
      <Modal isOpen={open} size='md' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Profile
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className='px-lg-2'>
                  <Row>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>{profile?.name ? '' : '*'} </span>
                          Name
                        </label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's name"
                          type='text'
                          value={profile?.name}
                          name='name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>{profile?.email ? '' : '*'} </span>
                          Email
                        </label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter user email'
                          type='text'
                          value={profile?.email}
                          name='email'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg='12' style={{ margin: 'auto' }}>
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
                            value={profile?.password}
                            autoComplete='new-password'
                            onChange={handleInput}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg='12' style={{ margin: 'auto' }}>
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
                            value={profile?.confirmPassword}
                            autoComplete='new-password'
                            onChange={handleInput}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  {user?.role === 'brand' && (
                    <>
                      <Row>
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
                      </Row>
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
                              value={profile?.websiteLink}
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
                              value={profile?.logoWidth}
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
                              value={profile?.preferences?.color}
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
                              value={
                                profile?.preferences?.secondaryColor
                                  ? profile?.preferences?.secondaryColor
                                  : ''
                              }
                              name='secondaryColor'
                              onChange={handleColor}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminNavbar;
