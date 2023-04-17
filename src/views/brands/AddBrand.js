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
  Col
} from 'reactstrap';
import FilePicker from 'components/FilePicker/FilePicker';
// core components

const AddBrand = ({
  openModal,
  handleModal,
  getUsers,
  setLoading,
  loading
}) => {
  let [user, setUser] = useState({
    name: '',
    email: '',
    url: '',
    logo: '',
    websiteLink: '',
    logoWidth: '',
    preferences: {
      color: '#000000',
      secondaryColor: 'black'
    }
  });
  const [fileName, setFileName] = useState('');

  const handleInput = (e) => {
   
      setUser({ ...user, [e.target.name]: e.target.value });
    
  };

  const handleColor = (e) => {
    setUser((prev) => ({
      ...prev,
      preferences: { ...user.preferences, [e.target.name]: e.target.value }
    }));
  };
  //   const handleSecondaryColor = (e) => {
  //   setUser((prev) => ({ ...prev, preferences: { secondaryColor: e.target.value } }));
  // };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFileName('');
    setUser((prev) => ({ ...prev, logo: null }));
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setUser((prev) => ({
        ...prev,
        logo: e.target.files[0]
      }));
      setFileName(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name === '') {
      return toast.error("Please enter user's name");
    }
    if (user.email === '') {
      return toast.error('Please enter email');
    }
   
      user={...user,url:`/${user.name}`}
    let formData = new FormData();

    for (let key in user) {
      if (key === 'preferences') {
        formData.append(key, JSON.stringify(user[key]));
      } else {
        formData.append(key, user[key]);
      }
    }
    setLoading(true);
    api('post', '/users/brand', formData)
      .then((res) => {
        toast.success(
          'Brand added successfully, Check your email to set password'
        );
        getUsers();
        handleModal();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal isOpen={openModal} size="md" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a brand
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="px-lg-2">
                  <Row>
                    <Col lg="12" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>
                            {user.name ? '' : '*'}{' '}
                          </span>
                          Brands Name
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter brand name"
                          type="text"
                          value={user.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="12" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>
                            {user.email ? '' : '*'}{' '}
                          </span>
                          Email
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter brand email"
                          type="email"
                          value={user.email}
                          name="email"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          {/* <span style={{ color: 'red' }}>{user.logoWidth ? '' : '*'} </span> */}
                          Website Link
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          placeholder="Enter website Link"
                          type="text"
                          value={user.websiteLink}
                          name="websiteLink"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row> */}
                  <Col lg="12" style={{ margin: 'auto' }}>
                    <FormGroup>
                      <label className="form-control-label">Logo</label>
                      <FilePicker
                        accept="image/*"
                        fileName={fileName}
                        isDelete={true}
                        handleDelete={handleDeleteImage}
                        type="file"
                        onChange={handleFile}
                      />
                    </FormGroup>
                  </Col>
                  <Row>
                    <Col lg="12" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          {/* <span style={{ color: 'red' }}>{user.logoWidth ? '' : '*'} </span> */}
                          Logo Width (Px)
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          placeholder="Enter Logo Width"
                          type="number"
                          value={user.logoWidth}
                          name="logoWidth"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6" style={{ marginRight: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Primary Color
                        </label>
                        <Input
                          className="form-control-alternative text-default color_field"
                          type="color"
                          value={user.preferences.color}
                          name="color"
                          onChange={handleColor}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ marginRight: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Secondary Color
                        </label>
                        <Input
                          className="form-control-alternative text-default color_field"
                          type="color"
                          value={user.preferences.secondaryColor}
                          name="secondaryColor"
                          onChange={handleColor}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* </Row> */}
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button disabled={loading} color="primary" onClick={handleSubmit}>
            Submit
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddBrand;
