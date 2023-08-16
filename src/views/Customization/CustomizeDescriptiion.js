import { useState, useEffect } from "react";
import { Store, UpdateStore } from "../../StoreContext";
import uploadfevicon from "../../assets/img/uploadfevicon.svg";

import api from "api";
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
  CardFooter,
} from "reactstrap";
import Select from "react-select";

// import {ReactComponent as Facebook} from '../../assets/img/Facebook.svg';
import { mediaUrl } from "../../config";
// core components
import { toast } from "react-toastify";
import Loader from "components/Spinner/Spinner";

const CustomizeButton = () => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [favIcon, setFavicon] = useState(null);
  const [description, setDescription] = useState(null);
  const [favIcons, setFavicons] = useState([]);

  const store = Store();
  const updateStore = UpdateStore();
  const { user } = store;

  const getUser = () => {
    api("get", `/users/${user?._id}`)
      .then((res) => {
        setDescription(res?.user?.description);
        //   toast.success('Background Updated');
      })
      .catch(() => {
        console.log("error");
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (user) {
      setFavicons(user?.favIcons);
    }
    getUser();
  }, []);
  const handleIconChange = (e) => {
    const uploadedImg = e.target.files[0];
    setFavicon(uploadedImg);

    if (uploadedImg) {
      setPreviewImage(URL.createObjectURL(uploadedImg));
    }
  };
  const handleDeleteIcon = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFavicon(null);
    setPreviewImage(null);
  };
  const handleSubmitFavIcon = (e) => {
    e.preventDefault();
    if (!favIcon) {
      return toast.error("Please Select icon");
    }
    let formData = new FormData();
    formData.append("favIcon", favIcon);

    api("put", `/users/brand/favIcon/${user?._id}`, formData)
      .then((res) => {
        toast.success("Icon added successfully");
        setFavicon(null);
        setPreviewImage(null);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const handleSubmitDescription = (e) => {
    e.preventDefault();
   

    api("put", `/users/brand/description/${user?._id}`, { description })
      .then((res) => {
        toast.success("updated successfully");
        setFavicon(null);
        setPreviewImage(null);
      })
      .catch(() => {
        console.log("error");
      });
  };
  console.log("useruser", user);
  const handledelete = (icon) => {
    const newfav = favIcons.filter((fav) => fav !== icon);
    setFavicons(newfav);
    api("put", `/users/brand/delfavicon/${user?._id}`, { icon })
      .then((res) => {
        toast.success("Deleted successfully");

        // setFavicon(null);
        // setPreviewImage(null);
      })
      .catch(() => {
        console.log("error");
      });
    console.log("icon", icon);
  };

  return (
    <>
      <Card className="shadow" style={{ margin: "10px 0px" }}>
        <Row className="mobRow">
          <Col
            xs={12}
            // style={{ margin: "20px 0px 5px 0px", fontWeight: 900 }}
          >
            <h2 className="mb-0 headingbg">Add Your Description</h2>
          </Col>
          <Col xs={12} style={{ marginTop: "20px", fontWeight: 900 }}>
            <FormGroup>
              <Input
                className="form-control-alternative text-default descriptionInput"
                required={true}
                placeholder="Tell about your Business"
                type="text"
                value={description}
                name="name"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ justifyContent: "end", marginRight: "20px" }}>
          {/* <Col xs={5} lg="9" style={{ margin: "20px 10px", textAlign: "end" }}>
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
            }}
          >
            <Button color="primary" onClick={handleSubmitDescription}>
              Submit
            </Button>
          </Col>
        </Row>
      </Card>
      <Card className="shadow" style={{ margin: "10px 0px" }}>
        <Row
          style={{
            // justifyContent: "end",
            margin: "10px 20px 0 20px",
          }}
        >
          <Col xs={12} style={{ padding: "0" }}>
            <h2 className="mb-0 headingbg">Select Your Favicon</h2>

            <div className="HPimgprofiile">
              <label>
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    handleIconChange(e);
                  }}
                />
                <div style={{ cursor: "pointer" }}>
                  <img
                    src={previewImage ?? uploadfevicon}
                    className="faciconUpload"
                    onClick={(e) => {
                      previewImage && handleDeleteIcon(e);
                    }}
                  />
                </div>
              </label>
            </div>
          </Col>
          <Col xs={12} style={{ margin: "10px 0px", padding: "0" }}>
            <h4>Recent Icon</h4>
            <div className="favIconDiv">
              {favIcons?.length !== 0 &&
                favIcons.map((icon) => (
                  <>
                    <div className="favIconSubDiv">
                      <div
                        className="favDeleteIcon"
                        onClick={() => handledelete(icon)}
                      >
                        X
                      </div>
                      <img
                        src={`${mediaUrl + icon}`}
                        alt="logo"
                        className={`${"recentFavIcon"}`}
                        onClick={() => {
                          setPreviewImage(mediaUrl + icon);
                          setFavicon(icon);
                        }}
                      />
                    </div>
                  </>
                ))}
            </div>
          </Col>
        </Row>

        <Row style={{ justifyContent: "end", marginRight: "20px" }}>
          {/* <Col xs={5} lg="9" style={{ margin: "20px 10px", textAlign: "end" }}>
            <Button color="secondary" onClick={handleDeleteIcon}>
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
            }}
          >
            <Button color="secondary" onClick={handleDeleteIcon}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmitFavIcon}>
              Submit
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CustomizeButton;
