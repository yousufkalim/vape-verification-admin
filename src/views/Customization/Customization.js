import { useState, useEffect } from 'react';
import { Store, UpdateStore } from '../../StoreContext';
import api from 'api';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Media,
  Table,
  Badge,
  Container,
  FormGroup,
  Input,
  Button,
  CardFooter
} from 'reactstrap';
import Select from 'react-select';
import FilePicker from 'components/FilePicker/FilePicker';
import selected1 from '../../assets/img/Filed.svg';
import selected2 from '../../assets/img/Filed2.svg';
import selected3 from '../../assets/img/Filed3.svg';
import Addyourpic from '../../assets/img/addyourpic.svg';
import Cancel from '../../assets/img/cancel.svg';
import Facebook from '../../assets/img/Facebook.svg';
// import {ReactComponent as Facebook} from '../../assets/img/Facebook.svg';
import LinkedIn from '../../assets/img/LinkedIn.svg';
import Reddit from '../../assets/img/Reddit.svg';
import { mediaUrl } from '../../config';

// core components
import { toast } from 'react-toastify';
import Loader from 'components/Spinner/Spinner';

const Fonts = [
  { id: '1', name: 'a' },
  { id: '2', name: 'b' },
  { id: '3', name: 'c' }
];
const FontNames = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Georgia',
  'Palatino',
  'Garamond',
  'Bookman',
  'Comic Sans MS',
  'Trebuchet MS',
  'Arial Black',
  'Impact',
  'Lucida Sans',
  'Tahoma'
];
const fontWeights = [
  'normal',
  'bold',
  'bolder',
  'lighter',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
];
const fontSizes = [
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '40px'
];

const socialMediaArray = [
  { name: 'facebook', icon: Facebook },
  { name: 'reddit', icon: Reddit },
  { name: 'linkedIn', icon: LinkedIn },
  { name: 'twitter', icon: Reddit },
  { name: 'telegram', icon: Reddit },
  { name: 'instagram', icon: Reddit },
  { name: 'youtube', icon: Reddit }
];

const Customization = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  let [customeForm, setCustomeForm] = useState({
    name: '',
    url: '',
    logo: '',
    websiteLink: '',
    logoWidth: '',
    preferences: {
      color: '#000000',
      secondaryColor: 'black'
    }
  });
  const [typographyTitle, setTypographyTitle] = useState('Heading');
  const [typography, setTypography] = useState({
    fontName: '',
    fontWeight: '',
    fontSize: ''
  });

  const [background, setBackground] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState({
    type: '',
    selectedImg: '',
    img: '',
    color: ''
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: {
      link: '',
      platform: 'facebook',
      isOpen: false,
      haveData: false
    },
    reddit: { link: '', platform: 'reddit', isOpen: false, haveData: false },
    linkedIn: {
      link: '',
      platform: 'linkedIn',
      isOpen: false,
      haveData: false
    },
    twitter: { link: '', platform: 'twitter', isOpen: false, haveData: false },
    telegram: {
      link: '',
      platform: 'telegram',
      isOpen: false,
      haveData: false
    },
    instagram: {
      link: '',
      platform: 'instagram',
      isOpen: false,
      haveData: false
    },
    youtube: { link: '', platform: 'youtube', isOpen: false, haveData: false }
  });
  const [socialFlag, setSocialFlag] = useState(false);
  const getUser = () => {
    api('get', `/users/${user._id}`).then((userData) => {
      if (userData?.user && userData?.user?.active) {
        console.log('userData.user in geUser', userData.user.socialMedia);
        setSocialFlag(!socialFlag);
        const updatedSocialLinks = { ...socialLinks }; // Create a copy of the socialLinks object

        const { socialMedia } = userData.user;
console.log("socialMedia",socialMedia)
        socialMediaArray.forEach((item) => {
          console.log("socialMedia[item.name]",socialMedia[item.name], item.name)
          const media = socialMedia.find(socialvalue=>socialvalue.platform===item.name )
          console.log("media",media)
          updatedSocialLinks[item.name].link = media ? media?.link : '';
          updatedSocialLinks[item.name].haveData = media?.link ? true : false;
          updatedSocialLinks[item.name].id = media? media._id:"";
        });
        setSocialLinks(updatedSocialLinks);
      }
    });
  };
  useEffect(() => {
    console.log('user useeffect', user);
    getUser();
  }, []);

  const handleChangeSocial = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: { ...socialLinks[e.target.name], link: e.target.value }
    });
  };
  const handleActive = (name) => {
    setSocialLinks({
      ...socialLinks,
      [name]: { ...socialLinks[name], isOpen: true }
    });
  };
  const handleInActive = (name) => {
    setSocialLinks({
      ...socialLinks,
      [name]: { ...socialLinks[name], isOpen: false, link: '' }
    });
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setCustomeForm((prev) => ({
        ...prev,
        logo: e.target.files[0]
      }));
      setFileName(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleDeleteImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFileName('');
    setCustomeForm((prev) => ({ ...prev, logo: null }));
  };

  const handleInput = (e) => {
    setCustomeForm({ ...customeForm, [e.target.name]: e.target.value });
  };
  const handleColor = (e) => {
    setCustomeForm((prev) => ({
      ...prev,
      preferences: {
        ...customeForm.preferences,
        [e.target.name]: e.target.value
      }
    }));
  };

  // background image
  const handleBackgroundImageChange = (e) => {
    const uploadedImg = e.target.files[0];
    setBackgroundImg((prev) => ({
      ...prev,
      type: 'img',
      selectedImg: '',
      img: uploadedImg,
      color: ''
    }));

    if (uploadedImg) {
      setPreviewImage(URL.createObjectURL(uploadedImg));
    }
  };
  const handleBackgroundColor = (e) => {
    setPreviewImage(null);
    setBackground('color');
    setBackgroundImg((prev) => ({
      ...prev,
      type: 'color',
      selectedImg: '',
      img: '',
      color: e.target.value
    }));
  };
  const handleBackgroundImg = (type, selectedImg) => {
    setBackground(type);
    setBackgroundImg((prev) => ({
      ...prev,
      type,
      selectedImg,
      img: '',
      color: ''
    }));
  };

  const handleSubmitBakgroungImg = (e) => {
    e.preventDefault();
    if (!backgroundImg.type) {
      toast.success('Please Select');
    }
    let formData = new FormData();
    for (let key in backgroundImg) {
      formData.append(key, backgroundImg[key]);
    }
    api('put', `/users/brand/bgImg/${user?._id}`, formData)
      .then((res) => {
        toast.success('Background Updated');
      })
      .catch(() => {
        console.log('error');
      });
  };

  const handleSubmitSocial = (e, platform) => {
    e.preventDefault();
    if (socialLinks[platform].link == '') {
      return toast.error('Please Add Link');
    }

    const socialData = {
      platform: socialLinks[platform].platform,
      link: socialLinks[platform].link
    };
    api('put', `/users/brand/socialLinks/${user?._id}`, socialData)
      .then((res) => {
        getUser();
        //  handleInActive(platform)
        toast.success('Social Link Updated');
      })
      .catch(() => {
        console.log('error');
      });
  };
  const handleDeleteLink = (platform) => {
    api('delete', `/users/brand/socialLinks/${user?._id}/${platform.id}`)
      .then((res) => {
        getUser();
        //  handleInActive(platform)
        toast.success('Social Link Deleted Successfully');
      })
      .catch(() => {
        console.log('error');
      });
  };
  const handleCancelBakgroungImg = () => {
    setBackground('');
    setBackgroundImg({
      type: '',
      selectedImg: '',
      img: '',
      color: ''
    });
  };
  // background image End

  const store = Store();
  const updateStore = UpdateStore();
  const { user } = store;

  console.log('user', user);

  return (
    <>
      <Container className="mt--7" fluid>
        {loading && <Loader />}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col sm={3} xs={12}>
                    <h3 className="mb-0" style={{ fontWeight: '600' }}>
                      Page Customization
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col sm={3} xs={6} style={{ margin: '10px 0px 10px 30px' }}>
                  <h5 className="mb-0" style={{ fontWeight: '600' }}>
                    Logo
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={2} xs={6} style={{ margin: '10px 0px 20px 50px' }}>
                  <FilePicker
                    accept="image/*"
                    fileName={fileName}
                    isDelete={true}
                    handleDelete={handleDeleteImage}
                    type="file"
                    onChange={handleFile}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={10} lg="3" style={{ margin: 'auto' }}>
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
                      value={customeForm.name}
                      name="name"
                      onChange={handleInput}
                    />
                  </FormGroup>
                </Col>
                <Col xs={10} lg="3" style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className="form-control-label">
                      {' '}
                      <span style={{ color: 'red' }}>
                        {user.name ? '' : '*'}{' '}
                      </span>
                      Logo Width
                    </label>{' '}
                    <Input
                      className="form-control-alternative text-default"
                      required={true}
                      placeholder="600"
                      type="number"
                      value={customeForm.logoWidth}
                      name="logoWidth"
                      onChange={handleInput}
                    />
                  </FormGroup>
                </Col>
                <Col xs={10} lg="3" style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className="form-control-label">
                      {' '}
                      <span style={{ color: 'red' }}>
                        {user.name ? '' : '*'}{' '}
                      </span>
                      Logo Hyper Link
                    </label>{' '}
                    <Input
                      className="form-control-alternative text-default"
                      required={true}
                      placeholder="Enter website Link"
                      type="text"
                      value={customeForm.websiteLink}
                      name="websiteLink"
                      onChange={handleInput}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} lg="5" style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className="form-control-label"> Primary Color</label>{' '}
                    <Input
                      className="form-control-alternative text-default color_field"
                      type="color"
                      value={customeForm.preferences.color}
                      name="color"
                      onChange={handleColor}
                    />
                  </FormGroup>
                </Col>
                <Col xs={10} lg="5" style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className="form-control-label">
                      {' '}
                      Secondary Color
                    </label>{' '}
                    <Input
                      className="form-control-alternative text-default color_field"
                      type="color"
                      value={customeForm.preferences.secondaryColor}
                      name="secondaryColor"
                      onChange={handleColor}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ justifyContent: 'end', marginRight: '20px' }}>
                <Col
                  xs={10}
                  lg="9"
                  style={{ margin: '20px 10px', textAlign: 'end' }}
                >
                  <Button color="secondary" onClick="">
                    Cancel
                  </Button>
                </Col>
                <Col
                  xs={10}
                  lg="1"
                  style={{ margin: '20px 10px', textAlign: 'end' }}
                >
                  <Button color="primary" onClick="">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card>

            <Card className="shadow" style={{ margin: '10px 0px' }}>
              <Row style={{ margin: '10px 35px' }}>
                <Col sm={9} xs={10} style={{ margin: 'auto' }}>
                  <h4 className="mb-0" style={{ fontWeight: '600' }}>
                    Typography
                  </h4>
                </Col>
                <Col sm={1} xs={10}>
                  {typographyTitle == 'Heading' ? (
                    <h5
                      size="sm"
                      style={{
                        background: '#0397EB1A',
                        color: '#219DE3',
                        borderRadius: '10px',
                        padding: '5px 5px',
                        margin: '7px 0px',
                        textAlign: 'center'
                      }}
                      onClick={() => setTypographyTitle('Heading')}
                    >
                      Heading
                    </h5>
                  ) : (
                    <h5
                      style={{
                        color: 'gray',
                        margin: '7px 0px',
                        padding: '5px 5px'
                      }}
                      onClick={() => setTypographyTitle('Heading')}
                    >
                      Heading
                    </h5>
                  )}
                </Col>
                <Col sm={1} xs={10}>
                  {typographyTitle == 'Paragraph' ? (
                    <h5
                      size="sm"
                      style={{
                        background: '#0397EB1A',
                        color: '#219DE3',
                        borderRadius: '10px',
                        padding: '5px 5px',
                        margin: '7px 0px',
                        textAlign: 'center'
                      }}
                      onClick={() => setTypographyTitle('Paragraph')}
                    >
                      Paragraph
                    </h5>
                  ) : (
                    <h5
                      style={{
                        color: 'gray',
                        margin: '7px 0px',
                        cursor: 'pointer',
                        padding: '5px 5px'
                      }}
                      onClick={() => setTypographyTitle('Paragraph')}
                    >
                      Paragraph
                    </h5>
                  )}
                </Col>
                <Col sm={1} xs={10}>
                  {typographyTitle == 'Body' ? (
                    <h5
                      size="sm"
                      style={{
                        background: '#0397EB1A',
                        color: '#219DE3',
                        borderRadius: '10px',
                        padding: '5px 5px',
                        margin: '7px 0px',
                        textAlign: 'center'
                      }}
                      onClick={() => setTypographyTitle('Body')}
                    >
                      Body
                    </h5>
                  ) : (
                    <h5
                      style={{
                        color: 'gray',
                        margin: '7px 0px',
                        cursor: 'pointer',
                        padding: '5px 5px'
                      }}
                      onClick={() => setTypographyTitle('Body')}
                    >
                      Body
                    </h5>
                  )}
                </Col>
              </Row>
              <Row style={{ margin: '0px 5px' }}>
                <Col xs={10} lg="4" style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className="form-control-label">Select Font</label>
                    <Select
                      onChange={(e) =>
                        setTypography({ ...typography, fontName: e.value })
                      }
                      name="fontName"
                      className="form-control-alternative"
                      options={FontNames?.map((font) => ({
                        value: font,
                        label: `${font}`
                      }))}
                    />
                  </FormGroup>
                </Col>
                <Col xs={10} lg="4" style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className="form-control-label">Font Weight</label>
                    <Select
                      onChange={(e) =>
                        setTypography({ ...typography, fontWeight: e.value })
                      }
                      name="hospitals"
                      className="form-control-alternative"
                      options={fontWeights?.map((font) => ({
                        value: font,
                        label: `${font}`
                      }))}
                    />
                  </FormGroup>
                </Col>
                <Col xs={10} lg="2" style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className="form-control-label">Select Size</label>
                    <Select
                      onChange={(e) =>
                        setTypography({ ...typography, fontSize: e.value })
                      }
                      name="hospitals"
                      className="form-control-alternative"
                      options={fontSizes?.map((font) => ({
                        value: font,
                        label: `${font}`
                      }))}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ justifyContent: 'end', marginRight: '20px' }}>
                <Col
                  xs={10}
                  lg="9"
                  style={{ margin: '20px 10px', textAlign: 'end' }}
                >
                  <Button color="secondary" onClick="">
                    Cancel
                  </Button>
                </Col>
                <Col
                  xs={10}
                  lg="1"
                  style={{ margin: '20px 10px', textAlign: 'end' }}
                >
                  <Button color="primary" onClick="">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card>

            <Card className="shadow" style={{ margin: '10px 0px' }}>
              <Row>
                <Col xs={10} lg="2" style={{ margin: '10px 50px' }}>
                  <h4 style={{ fontWeight: '600', margin: '5px 10px' }}>
                    {' '}
                    Background Image
                  </h4>
                </Col>
              </Row>
              <Row style={{ justifyContent: 'center' }} className="bdcolorrow">
                <div className="colorDivWidth ">
                  <div
                    className={`defaultDiv ${
                      background == 'default' ? 'selectedBackground' : ''
                    }`}
                    onClick={() => handleBackgroundImg('default', '')}
                  >
                    Default
                  </div>
                </div>

                <div className="colorDivWidth">
                  <div
                    className={`defaultDiv ${
                      background == 'NoBG' ? 'selectedBackground' : ''
                    }`}
                    onClick={() => handleBackgroundImg('NoBG', '')}
                  >
                    No Background
                  </div>
                </div>
                <div className="colorDivWidth">
                  <img
                    src={`${
                      user?.backgroundimages[user?.backgroundimages.length - 3]
                        ? mediaUrl +
                          user?.backgroundimages[
                            user?.backgroundimages.length - 3
                          ]
                        : selected1
                    }`}
                    alt="logo"
                    className={`${
                      background == 'selected1'
                        ? 'selectedBackground1'
                        : 'uploadedBackgroundImg1'
                    }`}
                    onClick={() =>
                      handleBackgroundImg(
                        'selected1',
                        user?.backgroundimages[
                          user?.backgroundimages.length - 3
                        ]
                      )
                    }
                  />
                </div>
                <div className="colorDivWidth">
                  <img
                    src={`${
                      user?.backgroundimages[user?.backgroundimages.length - 2]
                        ? mediaUrl +
                          user?.backgroundimages[
                            user?.backgroundimages.length - 2
                          ]
                        : selected2
                    }`}
                    alt="logo"
                    className={`${
                      background == 'selected2'
                        ? 'selectedBackground1'
                        : 'uploadedBackgroundImg1'
                    }`}
                    onClick={() =>
                      handleBackgroundImg(
                        'selected2',
                        user?.backgroundimages[
                          user?.backgroundimages.length - 2
                        ]
                      )
                    }
                  />
                </div>
                <div className="colorDivWidth">
                  <img
                    src={`${
                      user?.backgroundimages[user?.backgroundimages.length - 1]
                        ? mediaUrl +
                          user?.backgroundimages[
                            user?.backgroundimages.length - 1
                          ]
                        : ''
                    }`}
                    alt="logo"
                    className={`${
                      background == 'selected3'
                        ? 'selectedBackground1'
                        : 'uploadedBackgroundImg1'
                    }`}
                    onClick={() =>
                      handleBackgroundImg(
                        'selected3',
                        user?.backgroundimages[
                          user?.backgroundimages.length - 1
                        ]
                      )
                    }
                  />
                </div>
                <div className="colorDivWidth">
                  <div className="HPimgprofiile">
                    <label>
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          handleBackgroundImageChange(e);
                        }}
                      />
                      <div style={{ cursor: 'pointer' }}>
                        <img
                          src={previewImage ?? Addyourpic}
                          className={`backGroundImgUpload ${
                            background == 'upload' ? '' : ''
                          } `}
                          onClick={(e) => setBackground('upload')}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="colorDivWidth2">
                  <Input
                    type="color"
                    value={backgroundImg.color}
                    className={`backgroungImgColor ${
                      background == 'color' ? 'selectedBackground' : ''
                    }`}
                    onChange={(e) => handleBackgroundColor(e)}
                  />
                  {/* <h4>Add color</h4> */}
                </div>
              </Row>
              <Row style={{ justifyContent: 'end', marginRight: '20px' }}>
                <Col
                  xs={10}
                  lg="9"
                  style={{ margin: '20px 10px', textAlign: 'end' }}
                >
                  <Button color="secondary" onClick={handleCancelBakgroungImg}>
                    Cancel
                  </Button>
                </Col>
                <Col
                  xs={10}
                  lg="1"
                  style={{ margin: '20px 10px', textAlign: 'end' }}
                >
                  <Button color="primary" onClick={handleSubmitBakgroungImg}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card>

            <Card className="shadow" style={{ margin: '10px 0px' }}>
              <Row style={{ margin: '10px 35px' }}>
                <Col sm={9} xs={10} style={{ margin: 'auto' }}>
                  <h4 className="mb-0" style={{ fontWeight: '600' }}>
                    Social Media
                  </h4>
                </Col>
              </Row>
              {socialMediaArray.map((platform) => (
                <>
                  <Row style={{ margin: '0px 5px', alignItems: 'center' }}>
                    <Col xs={10} lg="3" style={{ marginRight: 'auto' }}>
                      <img
                        src={platform.icon}
                        alt="Facebook"
                        style={{ margin: '5px 15px' }}
                      />
                      {/* <Facebook /> */}
                      <span style={{ fontWeight: '600', fontSize: '16px' }}>
                        {platform.name}
                      </span>
                    </Col>
                    {!socialLinks[platform.name].isOpen &&
                    !socialLinks[platform.name].link ? (
                      <>
                        <Col
                          xs={10}
                          lg="7"
                          style={{ margin: '20px auto', textAlign: 'right' }}
                        >
                          <Button
                            color="primary"
                            onClick={() => handleActive(platform.name)}
                          >
                            Link
                          </Button>
                        </Col>
                      </>
                    ) : (
                      <Col xs={10} lg="5" style={{ margin: 'auto 0 auto 0' }}>
                        <Row>
                          {socialLinks[platform.name].link &&
                          socialLinks[platform.name].haveData ? (
                            <>
                              <Col
                                xs={9}
                                lg="9"
                                style={{ margin: 'auto 0', textAlign: 'end' }}
                              >
                                {' '}
                                <h4 style={{ margin: '20px 0px' }}>
                                  {socialLinks[platform.name].link}
                                </h4>
                              </Col>
                              <Col
                                xs={3}
                                lg="1"
                                style={{
                                  margin: '22px auto auto 0',
                                  textAlign: 'end'
                                }}
                              >
                                <img
                                  src={Cancel}
                                  style={{
                                    marginBottom: '20px',
                                    cursor: 'pointer'
                                  }}
                                  alt="close"
                                  onClick={() => {
                                    handleDeleteLink(
                                      socialLinks[platform.name]
                                    );
                                    // handleInActive(platform.name);
                                  }}
                                />
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col
                                xs={3}
                                lg="2"
                                style={{ margin: 'auto 0', textAlign: 'end' }}
                              >
                                <button
                                  className="linkSaveBtn"
                                  color="primary"
                                  onClick={(e) =>
                                    handleSubmitSocial(e, platform.name)
                                  }
                                >
                                  Save
                                </button>
                              </Col>
                              <Col
                                xs={6}
                                lg="7"
                                style={{ margin: 'auto  auto ' }}
                              >
                                <FormGroup style={{ margin: '1rem 0px' }}>
                                  <Input
                                    className="form-control-alternative text-default"
                                    required={true}
                                    placeholder="Add Your Link"
                                    type="text"
                                    value={socialLinks[platform.name].link}
                                    name={platform.name}
                                    onChange={handleChangeSocial}
                                  />
                                </FormGroup>
                              </Col>
                              <Col
                                xs={1}
                                lg="1"
                                style={{
                                  margin: 'auto auto auto 0',
                                  textAlign: 'end'
                                }}
                              >
                                <img
                                  src={Cancel}
                                  style={{
                                    cursor: 'pointer'
                                  }}
                                  alt="close"
                                  onClick={() => {
                                    handleInActive(platform.name);
                                  }}
                                />
                              </Col>
                            </>
                          )}
                        </Row>
                      </Col>
                    )}
                  </Row>
                  <hr style={{ width: '96%', margin: '0px auto' }} />
                </>
              ))}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Customization;
