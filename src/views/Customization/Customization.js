import { useState, useEffect } from "react";
import { Store, UpdateStore } from "../../StoreContext";
import api from "api";
import {
  Row,
  Col,
  Card,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
// import Select from 'react-select';
import FilePicker from "components/FilePicker/FilePicker";
import selected1 from "../../assets/img/Filed.svg";
import selected2 from "../../assets/img/Filed2.svg";
// import selected3 from '../../assets/img/Filed3.svg';
import Addyourpic from "../../assets/img/addyourpic.svg";
import Cancel from "../../assets/img/cancel.svg";
import { ReactComponent as Facebook } from "../../assets/img/Facebook.svg";
import { ReactComponent as Twitter } from "../../assets/img/Twitter.svg";
import { ReactComponent as YouTube } from "../../assets/img/YouTube.svg";
import { ReactComponent as Instagram } from "../../assets/img/Instagram.svg";
import { ReactComponent as LinkedIn } from "../../assets/img/LinkedIn.svg";
import { ReactComponent as Reddit } from "../../assets/img/Reddit.svg";
import { ReactComponent as Telegram } from "../../assets/img/Telegram.svg";
import { mediaUrl } from "../../config";
import CustomizeButton from "./CustomizeButtons";
import CustomizeDescriptiion from "./CustomizeDescriptiion";

// core components
import { toast } from "react-toastify";
import Loader from "components/Spinner/Spinner";
import FeedBackForm from "./FeedBackForms";
import PageAnimation from "./PageAnimation";
import LayoutDesign from "./LayoutDesign";

// const Fonts = [
//   { id: '1', name: 'a' },
//   { id: '2', name: 'b' },
//   { id: '3', name: 'c' },
// ];
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];
const FontNames = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
  "Lucida Sans",
  "Tahoma",
];
const fontWeights = [
  "normal",
  "bold",
  "bolder",
  "lighter",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const fontSizes = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "40px",
];

const socialMediaArray = [
  { name: "facebook", Icon: Facebook, defaultColor: "#1877F2" },
  { name: "reddit", Icon: Reddit, defaultColor: "#FF4500" },
  { name: "linkedIn", Icon: LinkedIn, defaultColor: "#0A66C2" },
  { name: "twitter", Icon: Twitter, defaultColor: "#919B9B" },
  { name: "telegram", Icon: Telegram, defaultColor: "#919B9B" },
  { name: "instagram", Icon: Instagram, defaultColor: "#919B9B" },
  { name: "youtube", Icon: YouTube, defaultColor: "#919B9B" },
];

const colors = [
  "#219de3",
  "#CD01FB",
  "#01FBB7",
  "#9101FB",
  "#ADD010",
  "#FB014B",
  "#FB0171",
];

const Customization = () => {
  const [loading, setLoading] = useState(false);
  const [btnColor, setBtnColor] = useState("");
  const [fileName, setFileName] = useState("");
  let [customeForm, setCustomeForm] = useState({
    name: "",
    email: "",
    logo: "",
    websiteLink: "",
    logoWidth: "",
    preferences: {
      logo: "",
      color: "#000000",
      secondaryColor: "black",
    },
  });
  const [typographyTitle, setTypographyTitle] = useState("Heading");
  const [typography, setTypography] = useState({
    fontName: "",
    fontWeight: "",
    fontSize: "",
  });

  const [background, setBackground] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState({
    type: "",
    selectedImg: "",
    img: "",
    color: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: {
      link: "",
      platform: "facebook",
      isOpen: false,
      haveData: false,
    },
    reddit: { link: "", platform: "reddit", isOpen: false, haveData: false },
    linkedIn: {
      link: "",
      platform: "linkedIn",
      isOpen: false,
      haveData: false,
    },
    twitter: { link: "", platform: "twitter", isOpen: false, haveData: false },
    telegram: {
      link: "",
      platform: "telegram",
      isOpen: false,
      haveData: false,
    },
    instagram: {
      link: "",
      platform: "instagram",
      isOpen: false,
      haveData: false,
    },
    youtube: { link: "", platform: "youtube", isOpen: false, haveData: false },
  });

  useEffect(() => {
    if (user) {
      setCustomeForm({
        ...customeForm,
        name: user?.name ? user?.name : "",
        email: user?.email ? user?.email : "",
        websiteLink: user?.websiteLink ? user?.websiteLink : "",
        logoWidth: user?.logoWidth ? user?.logoWidth : "",
        logo: user?.logo ? user?.logo : "",
        preferences: {
          color: user?.preferences?.color ? user?.preferences?.color : "",
          secondaryColor: user?.preferences?.secondaryColor
            ? user?.preferences?.secondaryColor
            : "",
        },
      });
      setFileName(user?.logo ? `${mediaUrl}${user?.logo}` : "");
    }
  }, []);
  useEffect(() => {
    if (user) {
      // typography
      if (typographyTitle === "Paragraph") {
        setTypography({
          ...typography,
          fontName: user?.textTypography?.Paragraph?.fontName
            ? user?.textTypography?.Paragraph?.fontName
            : "",
          fontWeight: user?.textTypography?.Paragraph?.fontWeight ?? "",
          fontSize: user?.textTypography?.Paragraph?.fontSize ?? "",
        });
      } else if (typographyTitle === "Body") {
        setTypography({
          ...typography,
          fontName: user?.textTypography?.Body?.fontName
            ? user?.textTypography?.Body?.fontName
            : "",
          fontWeight: user?.textTypography?.Body?.fontWeight ?? "",
          fontSize: user?.textTypography?.Body?.fontSize ?? "",
        });
      } else {
        setTypography({
          ...typography,
          fontName: user?.textTypography?.Heading?.fontName
            ? user?.textTypography?.Heading?.fontName
            : "",
          fontWeight: user?.textTypography?.Heading?.fontWeight ?? "",
          fontSize: user?.textTypography?.Heading?.fontSize ?? "",
        });
      }
    }
  }, [typographyTitle]);
  console.log("user11", user);
  const getUser = () => {
    api("get", `/users/${user._id}`).then((userData) => {
      if (userData?.user && userData?.user?.active) {
        const updatedSocialLinks = { ...socialLinks }; // Create a copy of the socialLinks object
        const { socialMedia, socialMediaColor } = userData.user;
        setBtnColor(socialMediaColor);
        socialMediaArray.forEach((item) => {
          const media = socialMedia.find(
            (socialvalue) => socialvalue.platform === item.name
          );
          updatedSocialLinks[item.name].link = media ? media?.link : "";
          updatedSocialLinks[item.name].haveData = media?.link ? true : false;
          updatedSocialLinks[item.name].id = media ? media._id : "";
        });
        setSocialLinks(updatedSocialLinks);
        updateStore({
          user: userData.user,
        });
      }
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleChangeSocial = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: { ...socialLinks[e.target.name], link: e.target.value },
    });
  };
  const handleActive = (name) => {
    setSocialLinks({
      ...socialLinks,
      [name]: { ...socialLinks[name], isOpen: true },
    });
  };
  const handleInActive = (name) => {
    setSocialLinks({
      ...socialLinks,
      [name]: { ...socialLinks[name], isOpen: false, link: "" },
    });
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setCustomeForm((prev) => ({
        ...prev,
        logo: e.target.files[0],
      }));
      setFileName(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleDeleteImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFileName("");
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
        [e.target.name]: e.target.value,
      },
    }));
  };

  // background image
  const handleBackgroundImageChange = (e) => {
    const uploadedImg = e.target.files[0];
    setBackgroundImg((prev) => ({
      ...prev,
      type: "img",
      selectedImg: "",
      img: uploadedImg,
      color: "",
    }));

    if (uploadedImg) {
      setPreviewImage(URL.createObjectURL(uploadedImg));
    }
  };
  const handleBackgroundColor = (e) => {
    setPreviewImage(null);
    setBackground("color");
    setBackgroundImg((prev) => ({
      ...prev,
      type: "color",
      selectedImg: "",
      img: "",
      color: e.target.value,
    }));
  };
  const handleBackgroundImg = (type, selectedImg) => {
    setBackground(type);
    setBackgroundImg((prev) => ({
      ...prev,
      type,
      selectedImg,
      img: "",
      color: "",
    }));
  };

  const handleUpdateBrand = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (customeForm.logoWidth > 300) {
      return toast.error("Please add logo width less then 300");
    }

    for (let key in customeForm) {
      if (key === "preferences") {
        formData.append(key, JSON.stringify(customeForm[key]));
      } else {
        formData.append(key, customeForm[key]);
      }
    }
    api("put", `/users/brand/${user._id}`, formData)
      .then((res) => {
        toast.success("Brand updated successfully");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSubmitBakgroungImg = (e) => {
    e.preventDefault();
    if (!backgroundImg.type) {
      toast.success("Please Select");
    }
    let formData = new FormData();
    for (let key in backgroundImg) {
      formData.append(key, backgroundImg[key]);
    }
    api("put", `/users/brand/bgImg/${user?._id}`, formData)
      .then((res) => {
        setPreviewImage(null);
        toast.success("Background Updated");
      })
      .catch(() => {
        console.log("error");
      });
  };

  const handleSubmitSocial = (e, platform) => {
    e.preventDefault();
    if (socialLinks[platform].link == "") {
      return toast.error("Please Add Link");
    }

    const socialData = {
      platform: socialLinks[platform].platform,
      link: socialLinks[platform].link,
    };
    api("put", `/users/brand/socialLinks/${user?._id}`, socialData)
      .then((res) => {
        getUser();
        //  handleInActive(platform)
        toast.success("Social Link Updated");
      })
      .catch(() => {
        console.log("error");
      });
  };

  const handleSocialMediaColor = (item) => {
    api("patch", `/users/brand/socialMediaColor/${user?._id}`, {
      socialMediaColor: item,
    })
      .then((res) => {
        getUser();
        //  handleInActive(platform)
        toast.success("Social Link Updated");
        setBtnColor(item);
      })
      .catch(() => {
        console.log("error");
      });
  };
  const handleSubmitTypography = (e) => {
    e.preventDefault();
    let textTypography = {};
    textTypography = { [typographyTitle]: typography };

    api("put", `/users/brand/typography/${user?._id}`, { textTypography })
      .then((res) => {
        toast.success("Updated successfully");
        // setTypography({ fontName: '', fontWeight: '', fontSize: '' });
        // setTypographyTitle('Heading');
      })
      .catch(() => {
        console.log("error");
      });
  };
  const handleDeleteLink = (platform) => {
    api("delete", `/users/brand/socialLinks/${user?._id}/${platform.id}`)
      .then((res) => {
        getUser();
        //  handleInActive(platform)
        toast.success("Social Link Deleted Successfully");
      })
      .catch(() => {
        console.log("error");
      });
  };
  const handleCancelBakgroungImg = () => {
    setBackground("");
    setBackgroundImg({
      type: "",
      selectedImg: "",
      img: "",
      color: "",
    });
  };
  // background image End
  const store = Store();
  const updateStore = UpdateStore();
  const { user } = store;

  return (
    <>
      <Container className="mt--7" fluid>
        {loading && <Loader />}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col xl={12}>
                    <h3 className="mb-0" style={{ fontWeight: "600" }}>
                      Page Customization
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col sm={3} xs={10} style={{ margin: "10px 0px 10px 30px" }}>
                  <h5 className="mb-0" style={{ fontWeight: "600" }}>
                    Logo
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={2} xs={6} style={{ margin: "10px 0px 20px 50px" }}>
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
                <Col xs={10} lg="3" style={{ margin: "auto" }}>
                  <FormGroup>
                    <label className="form-control-label">
                      {" "}
                      <span style={{ color: "red" }}>
                        {user.name ? "" : "*"}{" "}
                      </span>
                      Brand Name
                    </label>{" "}
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
                <Col xs={10} lg="3" style={{ margin: "auto" }}>
                  <FormGroup>
                    <label className="form-control-label">
                      {" "}
                      <span style={{ color: "red" }}>
                        {user.name ? "" : "*"}{" "}
                      </span>
                      Logo Width
                    </label>{" "}
                    <Input
                      className="form-control-alternative text-default"
                      required={true}
                      placeholder="600"
                      type="number"
                      value={customeForm.logoWidth}
                      name="logoWidth"
                      onChange={handleInput}
                      max={300}
                    />
                  </FormGroup>
                </Col>
                <Col xs={10} lg="3" style={{ margin: "auto" }}>
                  <FormGroup>
                    <label className="form-control-label">
                      {" "}
                      <span style={{ color: "red" }}>
                        {user.name ? "" : "*"}{" "}
                      </span>
                      Logo Hyper Link
                    </label>{" "}
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
              {/* <Row>
                <Col xs={10} lg='5' style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className='form-control-label'> Primary Color</label>{' '}
                    <Input
                      className='form-control-alternative text-default color_field'
                      type='color'
                      value={customeForm.preferences.color}
                      name='color'
                      onChange={handleColor}
                    />
                  </FormGroup>
                </Col>
                <Col xs={10} lg='5' style={{ margin: 'auto' }}>
                  <FormGroup>
                    <label className='form-control-label'> Secondary Color</label>{' '}
                    <Input
                      className='form-control-alternative text-default color_field'
                      type='color'
                      value={customeForm.preferences.secondaryColor}
                      name='secondaryColor'
                      onChange={handleColor}
                    />
                  </FormGroup>
                </Col>
              </Row> */}
              <Row
                style={{
                  justifyContent: "end",
                  marginRight: "20px",
                }}
              >
                {/* <Col
                  xl={12}
                  lg="9"
                  style={{ textAlign: "end" }}
                > */}
                {/* <Button color="secondary" onClick="">
                    Cancel
                  </Button> */}
                {/* </Col> */}
                <Col
                  // xs={5}
                  xl={5}
                  style={{
                    padding: "20px 10px",
                    textAlign: "end",
                  }}
                >
                  <Button color="primary" onClick={handleUpdateBrand}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card>

            <Card className="shadow" style={{ margin: "10px 0px" }}>
              <Row className="mobRow">
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={8}
                  // style={{ margin: "auto", marginLeft: 0 }}
                >
                  <h3 className="mb-0 heading22" style={{ fontWeight: "600" }}>
                    Typography
                  </h3>
                </Col>
                <Col xs={6} sm={5} lg={3} xl={2}>
                  {typographyTitle == "Heading" ? (
                    <h5
                      size="sm"
                      style={{
                        background: "#0397EB1A",
                        color: "#219DE3",
                        borderRadius: "10px",
                        padding: "5px",
                        margin: "7px 0px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setTypographyTitle("Heading")}
                    >
                      Headline
                    </h5>
                  ) : (
                    <h5
                      style={{
                        borderRadius: "10px",
                        border: ".5px solid #e5e3e3",
                        color: "#b6afaf",
                        margin: "7px 0px",
                        padding: "5px",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                      onClick={() => setTypographyTitle("Heading")}
                    >
                      Headline
                    </h5>
                  )}
                </Col>
                <Col xs={6} sm={5} lg={3} xl={2}>
                  {typographyTitle == "Paragraph" ? (
                    <h5
                      size="sm"
                      style={{
                        background: "#0397EB1A",
                        color: "#219DE3",
                        borderRadius: "10px",
                        padding: "5px",
                        margin: "7px 0px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setTypographyTitle("Paragraph")}
                    >
                      Body Text
                    </h5>
                  ) : (
                    <h5
                      style={{
                        borderRadius: "10px",
                        border: ".5px solid #e5e3e3",
                        color: "#b6afaf",
                        margin: "7px 0px",
                        cursor: "pointer",
                        padding: "5px",
                        textAlign: "center",
                      }}
                      onClick={() => setTypographyTitle("Paragraph")}
                    >
                      Body Text
                    </h5>
                  )}
                </Col>
                {/* <Col md={1} xs={10} lg={1} xl={2}>
                  {typographyTitle == 'Body' ? (
                    <h5
                      size='sm'
                      style={{
                        background: '#0397EB1A',
                        color: '#219DE3',
                        borderRadius: '10px',
                        padding: '5px 5px',
                        margin: '7px 0px',
                        textAlign: 'center',
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
                        padding: '5px 5px',
                      }}
                      onClick={() => setTypographyTitle('Body')}
                    >
                      Body
                    </h5>
                  )}
                </Col> */}
              </Row>
              <Row style={{ margin: "0px 5px" }}>
                <Col xs={11} lg={4} style={{ margin: "auto" }}>
                  <FormGroup>
                    <label className="form-control-label">Select Font</label>
                    <div>
                      <select
                        placeholder={"Select..."}
                        onChange={(e) =>
                          setTypography({
                            ...typography,
                            fontName: e.target.value,
                          })
                        }
                        name="fontName"
                        value={typography.fontName}
                        className="selectCustome"
                      >
                        <option value="">Select...</option>
                        {FontNames.map((font) => (
                          <option
                            key={font}
                            value={font}
                            style={{ background: "white", color: "black" }}
                          >
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <Select
                      placeholder={'Select...'}
                      onChange={(e) => setTypography({ ...typography, fontName: e.value })}
                      name='fontName'
                      value={
                         typography?.fontName &&{
                          value: typography?.fontName,
                         
                        }
                      }
                      className='form-control-alternative'
                      options={FontNames?.map((font) => ({
                        value: font,
                        label: font,
                      }))}
                    /> */}
                  </FormGroup>
                </Col>
                <Col xs={11} lg={4} style={{ margin: "auto" }}>
                  <FormGroup>
                    <label className="form-control-label">Font Weight</label>
                    <div>
                      <select
                        placeholder={"Select..."}
                        onChange={(e) =>
                          setTypography({
                            ...typography,
                            fontWeight: e.target.value,
                          })
                        }
                        name="fontWeight"
                        value={typography.fontWeight}
                        className="selectCustome"
                      >
                        <option value="">Select...</option>
                        {fontWeights.map((font) => (
                          <option
                            key={font}
                            value={font}
                            style={{ background: "white", color: "black" }}
                          >
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <Select
                      onChange={(e) =>
                        setTypography({ ...typography, fontWeight: e.value })
                      }
                      name="fontWeight"
                      className="form-control-alternative"
                      defaultValue={
                        typography.fontWeight ? typography.fontWeight : ''
                      }
                      options={fontWeights?.map((font) => ({
                        value: font,
                        label: `${font}`
                      }))}
                    /> */}
                  </FormGroup>
                </Col>
                <Col xs={11} lg="2" style={{ margin: "auto" }}>
                  <FormGroup>
                    <label className="form-control-label">Select Size</label>
                    <div>
                      <select
                        placeholder={"Select..."}
                        onChange={(e) =>
                          setTypography({
                            ...typography,
                            fontSize: e.target.value,
                          })
                        }
                        name="fontSize"
                        value={typography.fontSize}
                        className="selectCustome"
                      >
                        <option value="">Select...</option>
                        {fontSizes.map((font) => (
                          <option
                            key={font}
                            value={font}
                            style={{ background: "white", color: "black" }}
                          >
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <Select
                      onChange={(e) =>
                        setTypography({ ...typography, fontSize: e.value })
                      }
                      name="hospitals"
                      className="form-control-alternative"
                      defaultValue={
                        typography.fontSize ? typography.fontSize : ''
                      }
                      options={fontSizes?.map((font) => ({
                        value: font,
                        label: `${font}`
                      }))}
                    /> */}
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ justifyContent: "end", marginRight: "20px" }}>
                {/* <Col
                  xl={1}
                  style={{
                    margin: "20px 10px",
                    textAlign: "end",
                    background: "green",
                  }}
                >
                  <Button color="secondary" onClick="">
                    Cancel
                  </Button>
                </Col> */}
                <Col
                  xs={12}
                  style={{
                    padding: "20px 10px",
                    textAlign: "end",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "3%",
                  }}
                >
                  <Button color="secondary" onClick="">
                    Cancel
                  </Button>
                  <Button color="primary" onClick={handleSubmitTypography}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card>

            <Card className="shadow" style={{ margin: "10px 0px" }}>
              <Row className="mobRow">
                <Col xs={12}>
                  <h3 className="mb-0 headingbg" style={{ fontWeight: "600" }}>
                    {" "}
                    Background Image
                  </h3>
                </Col>
              </Row>

              <Row style={{ justifyContent: "center" }} className="bdcolorrow">
                <div className="colorDivWidth ">
                  <div
                    className={`defaultDiv ${
                      background == "default" ? "selectedBackground" : ""
                    }`}
                    onClick={() => handleBackgroundImg("default", "")}
                  >
                    Default
                  </div>
                </div>

                <div className="colorDivWidth">
                  <div
                    className={`defaultDiv ${
                      background == "NoBG" ? "selectedBackground" : ""
                    }`}
                    onClick={() => handleBackgroundImg("NoBG", "")}
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
                      background == "selected1"
                        ? "selectedBackground1"
                        : "uploadedBackgroundImg1"
                    }`}
                    onClick={() =>
                      handleBackgroundImg(
                        "selected1",
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
                      background == "selected2"
                        ? "selectedBackground1"
                        : "uploadedBackgroundImg1"
                    }`}
                    onClick={() =>
                      handleBackgroundImg(
                        "selected2",
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
                        : ""
                    }`}
                    alt="logo"
                    className={`${
                      background == "selected3"
                        ? "selectedBackground1"
                        : "uploadedBackgroundImg1"
                    }`}
                    onClick={() =>
                      handleBackgroundImg(
                        "selected3",
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
                      <div style={{ cursor: "pointer" }}>
                        <img
                          src={previewImage ?? Addyourpic}
                          className={`backGroundImgUpload ${
                            background == "upload" ? "" : ""
                          } `}
                          onClick={(e) => setBackground("upload")}
                          alt="."
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
                      background == "color" ? "selectedBackground" : ""
                    }`}
                    onChange={(e) => handleBackgroundColor(e)}
                  />
                  {/* <h4>Add color</h4> */}
                </div>
              </Row>
              <Row style={{ justifyContent: "end", marginRight: "20px" }}>
                {/* <Col
                  xs={5}
                  lg="9"
                  style={{ margin: "20px 10px", textAlign: "end" }}
                >
                  <Button color="secondary" onClick={handleCancelBakgroungImg}>
                    Cancel
                  </Button>
                </Col> */}
                <Col
                  xs={12}
                  // style={{ margin: "20px 10px", textAlign: "end" }}
                  style={{
                    padding: "20px 10px",
                    textAlign: "end",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "3%",
                  }}
                >
                  <Button color="secondary" onClick={handleCancelBakgroungImg}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={handleSubmitBakgroungImg}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card>

            <Card className="shadow" style={{ margin: "10px 0px" }}>
              <Row style={{ margin: "10px 35px" }}>
                <Col sm={9} xs={10} style={{ margin: "10px 0px" }}>
                  <h4 className="mb-0 headingbg" style={{ fontWeight: "600" }}>
                    Social Media
                  </h4>
                </Col>
              </Row>
              {socialMediaArray.map(({ Icon, name, defaultColor }) => (
                <>
                  <Row style={{ margin: "0px 5px", alignItems: "center" }}>
                    <Col xs={10} lg="3" style={{ marginRight: "auto" }}>
                      <Icon
                        fill={btnColor ? btnColor : defaultColor}
                        alt="Facebook"
                        style={{ margin: "5px 15px" }}
                      />
                      {/* <Facebook /> */}
                      <span style={{ fontWeight: "600", fontSize: "16px" }}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </span>
                    </Col>
                    {!socialLinks[name].isOpen && !socialLinks[name].link ? (
                      <>
                        <Col
                          xs={10}
                          lg="7"
                          style={{ margin: "20px auto", textAlign: "right" }}
                        >
                          <Button
                            color="primary"
                            onClick={() => handleActive(name)}
                          >
                            Link
                          </Button>
                        </Col>
                      </>
                    ) : (
                      <Col xs={10} lg="5" style={{ margin: "auto 0 auto 0" }}>
                        <Row>
                          {socialLinks[name].link &&
                          socialLinks[name].haveData ? (
                            <>
                              <Col
                                xs={9}
                                lg="9"
                                style={{ margin: "auto 0", textAlign: "end" }}
                              >
                                {" "}
                                <h4 style={{ margin: "20px 0px" }}>
                                  {socialLinks[name].link}
                                </h4>
                              </Col>
                              <Col
                                xs={3}
                                lg="1"
                                style={{
                                  margin: "22px auto auto 0",
                                  textAlign: "end",
                                }}
                              >
                                <img
                                  src={Cancel}
                                  style={{
                                    marginBottom: "20px",
                                    cursor: "pointer",
                                  }}
                                  alt="close"
                                  onClick={() => {
                                    handleDeleteLink(socialLinks[name]);
                                    // handleInActive(name);
                                  }}
                                />
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col
                                xs={3}
                                lg="2"
                                style={{ margin: "auto 0", textAlign: "end" }}
                              >
                                <button
                                  className="linkSaveBtn"
                                  color="primary"
                                  onClick={(e) => handleSubmitSocial(e, name)}
                                >
                                  Save
                                </button>
                              </Col>
                              <Col
                                xs={6}
                                lg="7"
                                style={{ margin: "auto  auto " }}
                              >
                                <FormGroup style={{ margin: "1rem 0px" }}>
                                  <Input
                                    className="form-control-alternative text-default"
                                    required={true}
                                    placeholder="Add Your Link"
                                    type="text"
                                    value={socialLinks[name].link}
                                    name={name}
                                    onChange={handleChangeSocial}
                                  />
                                </FormGroup>
                              </Col>
                              <Col
                                xs={1}
                                lg="1"
                                style={{
                                  margin: "auto auto auto 0",
                                  textAlign: "end",
                                }}
                              >
                                <img
                                  src={Cancel}
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  alt="close"
                                  onClick={() => {
                                    handleInActive(name);
                                  }}
                                />
                              </Col>
                            </>
                          )}
                        </Row>
                      </Col>
                    )}
                  </Row>
                  <hr style={{ width: "96%", margin: "0px auto" }} />
                </>
              ))}

              <div style={{ padding: "20px 50px" }}>
                <p>Select Icons Color</p>
                <div className="colorDiv">
                  {colors.map((color) => (
                    <>
                      <div
                        className={`colorDiv1 ${
                          btnColor === color && "SelectedcolorDiv1"
                        }`}
                        style={{ background: color }}
                        onClick={() => {
                          handleSocialMediaColor(color);
                        }}
                      >
                        {btnColor === color && "Selected"}
                      </div>
                    </>
                  ))}
                  <div className="colorDiv1">
                    <Input
                      type="color"
                      // value={backgroundImg.color}
                      className="btnColorDiv"
                      onChange={(e) => handleSocialMediaColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Card>
            <FeedBackForm />
            <CustomizeButton />
            <CustomizeDescriptiion />
            <PageAnimation />
            <LayoutDesign />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Customization;
