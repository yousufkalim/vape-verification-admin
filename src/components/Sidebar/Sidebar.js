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
/*eslint-disable*/
import { useState, useEffect } from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
// nodejs library to set properties for components
import { PropTypes } from 'prop-types';
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
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';
import FilePicker from 'components/FilePicker/FilePicker';
import api from 'api';
import { toast } from 'react-toastify';
import { mediaUrl } from '../../config';

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();

  const { user } = Store();
  const [profile, setProfile] = useState();
  const [fileName, setFileName] = useState('');
  const [open, setOpen] = useState(false);

  const { getUser } = props;

  useEffect(() => {
    if (user && user.role === 'brand') {
      setProfile({
        name: user?.name,
        email: user?.email,
        logo: user?.preferences?.logo,
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

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin' || prop.layout === '/brand') {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName='active'
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
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
      preferences: { ...prev.preferences, color: e.target.value },
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

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank',
    };
  }

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    window.location = '/auth/login';
  };

  return (
    <>
      <Navbar
        className='navbar-vertical fixed-left navbar-light bg-white'
        expand='md'
        id='sidenav-main'
      >
        <Container fluid>
          {/* Toggler */}
          <button className='navbar-toggler' type='button' onClick={toggleCollapse}>
            <span className='navbar-toggler-icon' />
          </button>
          {/* Brand */}

          {/* User */}
          <Nav className='align-items-center d-md-flex pr-4' navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className='align-items-center'>
                  <Media className='ml-2 d-lg-block'>
                    <span className='mb-0 text-sm font-weight-bold'>{user?.name}</span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-arrow mr-2' right>
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
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className='navbar-collapse-header d-md-none'>
              <Row>
                {logo ? (
                  <Col className='collapse-brand' xs='6'>
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className='collapse-close' xs='6'>
                  <button className='navbar-toggler' type='button' onClick={toggleCollapse}>
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Navigation */}
            <Nav navbar>{createLinks(routes)}</Nav>
          </Collapse>
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
                        <Col xs='6' style={{ marginRight: 'auto' }}>
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
                        <Col xs='6' style={{ marginRight: 'auto' }}>
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

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
