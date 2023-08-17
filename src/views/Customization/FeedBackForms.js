import { useState, useEffect } from "react";
import { Store, UpdateStore } from "../../StoreContext";
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
import Switch from "react-switch";

// import {ReactComponent as Facebook} from '../../assets/img/Facebook.svg';
import { mediaUrl } from "../../config";
// core components
import { toast } from "react-toastify";
import Loader from "components/Spinner/Spinner";
import Addfeedbackbtn from "../../assets/img/addfeedbackbtn.svg";
import Delete from "../../assets/img/delete.svg";

const FeedBackForm = () => {
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Add text");
  const [label, setLabel] = useState("Add label");
  const [checked, setChecked] = useState(false);
  const [isRequired, setRequired] = useState(false);
  const [feedbackForms, setFeedbackForms] = useState([]);
  const [formInputs, setFormInputs] = useState([]);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const [showAll, setShowAll] = useState(false);

  const visibleForms = showAll ? feedbackForms : feedbackForms.slice(0, 1);
  const toggleShowAll = () => {
    setShowAll((prevState) => !prevState);
  };
  const store = Store();
  const updateStore = UpdateStore();
  const { user } = store;
  const getFeedbackForms = () => {
    setLoading(true);
    api("get", `/feedbackForm`)
      .then((res) => {
        setLoading(false);
        setFeedbackForms(res.feedbackForms);
      })
      .catch(() => {
        setLoading(false);
        console.log("error");
      });
  };
  useEffect(() => {
    getFeedbackForms();
  }, []);

  const handleChangeinput = (e, i, field) => {
    const updatedForm = feedbackForms?.map((feedbackForm, ind) => {
      if (ind === i) {
        return { ...feedbackForm, [field]: e.target.value };
      } else {
        return { ...feedbackForm };
      }
    });
    setFeedbackForms(updatedForm);
  };
  const handleChangeActive = (value, i, field) => {
    const updatedForm = feedbackForms?.map((feedbackForm, ind) => {
      if (ind === i) {
        return { ...feedbackForm, [field]: value };
      } else {
        return { ...feedbackForm };
      }
    });
    setFeedbackForms(updatedForm);
  };
  const handleCreateFeedback = () => {
    console.log("placeholder", placeholder);
    console.log("label", label);
    console.log("checked", checked);
    console.log("isRequired", isRequired);
    let feedbackForm = { label, placeholder, isRequired, isActive: checked };
    api("post", `/feedbackForm`, feedbackForm)
      .then((res) => {
        setFeedbackForms([...feedbackForms, res.newForm]);
        // getFeedbackForms();
        // toast.success('Updated successfully');
      })
      .catch(() => {
        console.log("error");
      });
  };
  const handleUpdateFeedback = () => {
    console.log("feedbackForms", feedbackForms);

    for (const form of feedbackForms) {
      if (!form.label) {
        return toast.error("Please fill all labels");
      }
      if (!form.placeholder) {
        return toast.error("Please fill all placeholders");
      }
    }
    api("put", `/feedbackForm/${user?._id}`, feedbackForms)
      .then((res) => {
        getFeedbackForms();
        toast.success("Updated successfully");
      })
      .catch(() => {
        console.log("error");
      });
  };
  const handleDeleteFeedback = (feedbackId) => {
    api("delete", `/feedbackForm/${user?._id}/${feedbackId}`)
      .then((res) => {
        const updatedforms = feedbackForms.filter(
          (form) => form._id !== res?.deletedForm?._id
        );
        setFeedbackForms(updatedforms);
        toast.success("Deleted successfully");
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <>
      <Card className="shadow" style={{ margin: "10px 0px" }}>
        <Row className="mobRow">
          <Col
            xs={12}
            // style={{ margin: "20px 0px 5px 0px", fontWeight: 900 }}
          >
            <h3 className="mb-0 headingbg" style={{ fontWeight: "600" }}>
              Feedback Form
            </h3>
          </Col>
        </Row>
        <Row className="addFeedback_Desktop" style={{ margin: "0px 20px" }}>
          <Col
            xs={12}
            sm={6}
            // md={6}
            lg={4}
            style={{
              margin: "5px 0px",
              fontWeight: 900,
            }}
          >
            <FormGroup style={{ margin: "0 0 -20px 0" }}>
              <div className="SwitchDiv">
                <Input
                  className="labelInput"
                  required={true}
                  type="text"
                  placeholder="Email"
                  name="label"
                  disabled
                />
              </div>
              <Input
                className="text-default inpuFiledfeedback"
                required={true}
                type="text"
                placeholder="example@veriscan.com"
                name="placeholder"
                disabled
              />
            </FormGroup>
          </Col>
          <Col
            xs={12}
            sm={6}
            // md={6}
            lg={4}
            style={{
              margin: "5px 0px",
              fontWeight: 900,
            }}
          >
            <FormGroup style={{ margin: "0 0 -20px 0" }}>
              <div className="SwitchDiv">
                <Input
                  className="labelInput"
                  required={true}
                  type="text"
                  placeholder="Phone Number"
                  name="label"
                  disabled
                />
              </div>
              <Input
                className="text-default inpuFiledfeedback"
                required={true}
                type="text"
                placeholder="(999) 999+999"
                name="placeholder"
                disabled
              />
            </FormGroup>
          </Col>
          {!loading ? (
            feedbackForms.length !== 0 &&
            feedbackForms.map((feedbackForm, i) => (
              <>
                {console.log("i", i)}
                <Col
                  xs={12}
                  sm={6}
                  // md={6}
                  lg={4}
                  style={{
                    margin: "5px 0px",
                    fontWeight: 900,
                  }}
                >
                  <FormGroup style={{ margin: "0 0 -20px 0" }}>
                    <div className="SwitchDiv">
                      <Input
                        className="labelInput"
                        required={true}
                        type="text"
                        placeholder="Enter Label"
                        value={feedbackForm.label}
                        name="label"
                        onChange={(e) => handleChangeinput(e, i, "label")}
                      />
                      <Switch
                        onChange={(value) =>
                          handleChangeActive(value, i, "isActive")
                        }
                        checked={feedbackForm.isActive}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#219de3"
                        className="react-switch"
                      />
                    </div>
                    <Input
                      className="text-default inpuFiledfeedback"
                      required={true}
                      type="text"
                      placeholder="Add placeholder"
                      value={feedbackForm.placeholder}
                      name="placeholder"
                      onChange={(e) => handleChangeinput(e, i, "placeholder")}
                      //   onBlur={(e) => handleonBlurinput(e, i, 'placeholder')}
                      //   onClick={(e) => handleonClickinput(e, i, 'placeholder')}
                    />
                    <img
                      src={Delete}
                      alt="Delete"
                      className="deleteIcon"
                      onClick={() => handleDeleteFeedback(feedbackForm?._id)}
                    />
                  </FormGroup>
                  <div
                    className="custom-control custom-control-alternative custom-checkbox"
                    style={{ padding: "0px" }}
                  >
                    <input
                      className="checkboxInput"
                      id=" customCheckLogin"
                      type="checkbox"
                      name="isRequired"
                      checked={feedbackForm.isRequired}
                      onClick={(e) =>
                        handleChangeActive(e.target.checked, i, "isRequired")
                      }
                    />
                    <label
                      style={{ marginBottom: "0" }}
                      htmlFor=" customCheckLogin"
                    >
                      <p>Required</p>
                    </label>
                  </div>
                </Col>
              </>
            ))
          ) : (
            <div>Loading...</div>
          )}

          <Col
            xs={12}
            sm={6}
            lg={4}
            style={{
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="addFeedbackForm">
              <img
                src={Addfeedbackbtn}
                alt="Addfeedbackbtn"
                className="addfeedbackimg"
                onClick={handleCreateFeedback}
              />
            </div>
          </Col>
        </Row>
        <Row className="addFeedback_Mobile" style={{ margin: "0px 20px" }}>
          <Col
            xs={12}
            sm={6}
            // md={6}
            lg={4}
            style={{
              margin: "5px 0px",
              fontWeight: 900,
            }}
          >
            <FormGroup style={{ margin: "0 0 -20px 0" }}>
              <div className="SwitchDiv">
                <Input
                  className="labelInput"
                  required={true}
                  type="text"
                  placeholder="Email"
                  name="label"
                  disabled
                />
              </div>
              <Input
                className="text-default inpuFiledfeedback staticmobileview1"
                required={true}
                type="text"
                placeholder="example@veriscan.com"
                name="placeholder"
                disabled
              />
            </FormGroup>
          </Col>
          <Col
            xs={12}
            sm={6}
            // md={6}
            lg={4}
            style={{
              margin: "5px 0px",
              fontWeight: 900,
            }}
          >
            <FormGroup style={{ margin: "0 0 -20px 0" }}>
              <div className="SwitchDiv">
                <Input
                  className="labelInput"
                  required={true}
                  type="text"
                  placeholder="Phone Number"
                  name="label"
                  disabled
                />
              </div>
              <Input
                className="text-default inpuFiledfeedback staticmobileview2"
                required={true}
                type="text"
                placeholder="(999) 999+999"
                name="placeholder"
                disabled
              />
            </FormGroup>
          </Col>
          {!loading ? (
            <>
              {visibleForms.map((feedbackForm, i) => (
                <>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    style={{
                      margin: "5px 0px",
                      fontWeight: 900,
                    }}
                  >
                    <FormGroup style={{ margin: "0 0 -20px 0" }}>
                      <div className="SwitchDiv">
                        <Input
                          className="labelInput"
                          required={true}
                          type="text"
                          placeholder="Enter Label"
                          value={feedbackForm.label}
                          name="label"
                          onChange={(e) => handleChangeinput(e, i, "label")}
                        />
                        <Switch
                          onChange={(value) =>
                            handleChangeActive(value, i, "isActive")
                          }
                          checked={feedbackForm.isActive}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          onColor="#219de3"
                          className="react-switch"
                        />
                      </div>
                      <Input
                        className="text-default inpuFiledfeedback"
                        required={true}
                        type="text"
                        placeholder="Add placeholder"
                        value={feedbackForm.placeholder}
                        name="placeholder"
                        onChange={(e) => handleChangeinput(e, i, "placeholder")}
                        //   onBlur={(e) => handleonBlurinput(e, i, 'placeholder')}
                        //   onClick={(e) => handleonClickinput(e, i, 'placeholder')}
                      />
                      <img
                        src={Delete}
                        alt="Delete"
                        className="deleteIcon"
                        onClick={() => handleDeleteFeedback(feedbackForm?._id)}
                      />
                    </FormGroup>
                    <div
                      className="custom-control custom-control-alternative custom-checkbox"
                      style={{ padding: "0px" }}
                    >
                      <input
                        className="checkboxInput"
                        id=" customCheckLogin"
                        type="checkbox"
                        name="isRequired"
                        checked={feedbackForm.isRequired}
                        onClick={(e) =>
                          handleChangeActive(e.target.checked, i, "isRequired")
                        }
                      />
                      <label
                        style={{ marginBottom: "0" }}
                        htmlFor=" customCheckLogin"
                      >
                        <p>Required</p>
                      </label>
                    </div>
                  </Col>
                </>
              ))}
              {feedbackForms.length >= 2 && (
                <div className="showFeedbackBtun">
                  <button onClick={toggleShowAll}>
                    {showAll ? "Show Less" : "Load More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div>Loading...</div>
          )}
          {showAll || feedbackForms.length < 2 ? (
            <Col
              xs={12}
              sm={6}
              lg={4}
              style={{
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="addFeedbackForm">
                <img
                  src={Addfeedbackbtn}
                  alt="Addfeedbackbtn"
                  className="addfeedbackimg"
                  onClick={handleCreateFeedback}
                />
              </div>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Row style={{ justifyContent: "end", marginRight: "20px" }}>
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
            <Button color="primary" onClick={handleUpdateFeedback}>
              Submit
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default FeedBackForm;
