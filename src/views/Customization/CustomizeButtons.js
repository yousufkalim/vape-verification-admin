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

// import {ReactComponent as Facebook} from '../../assets/img/Facebook.svg';
import { mediaUrl } from "../../config";
import ColorSelect from "../../assets/img/icons/common/colorSelector.svg";

// core components
import { toast } from "react-toastify";
import Loader from "components/Spinner/Spinner";

const colors = [
  "#219de3",
  "#CD01FB",
  "#01FBB7",
  "#9101FB",
  "#ADD010",
  "#FB014B",
  "#FB0171",
];
const Fonts = [
  { id: "1", name: "a" },
  { id: "2", name: "b" },
  { id: "3", name: "c" },
];
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

const CustomizeButton = () => {
  const [loading, setLoading] = useState(false);
  const [btnColor, setBtnColor] = useState("");
  const [btnRadius, setBtnRadius] = useState("");

  const [buttonType, setButtonType] = useState("solid");
  const [typography, setTypography] = useState({
    fontName: "",
    fontWeight: "",
    fontSize: "",
  });

  const store = Store();
  const updateStore = UpdateStore();
  const { user } = store;

  const handleSubmitCustomizeButton = (e) => {
    e.preventDefault();
    let customizeButton = {};
    customizeButton = {
      ...typography,
      btnType: buttonType,
      radius: btnRadius,
      bgColor: btnColor,
    };
    // if type is Outline then bg color is border
    api("put", `/users/brand/description/${user?._id}`, { customizeButton })
      .then((res) => {
        toast.success("Updated successfully");
        setTypography({ fontName: "", fontWeight: "", fontSize: "" });
        setButtonType("solid");
        setBtnRadius("");
        setBtnColor("");
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
            sm={12}
            md={12}
            lg={6}
            xl={8}
            // style={{ margin: "auto 0" }}
          >
            <h2 className="mb-0 heading22" style={{ fontWeight: "600" }}>
              Customizeable Button
            </h2>
          </Col>
          <Col xs={6} sm={5} lg={3} xl={2}>
            {buttonType == "solid" ? (
              <h5
                size="sm"
                style={{
                  background: "#0397EB1A",
                  color: "#219DE3",
                  borderRadius: "10px",
                  padding: "5px 5px",
                  margin: "7px 0px",
                  textAlign: "center",
                }}
                onClick={() => setButtonType("solid")}
              >
                Solid
              </h5>
            ) : (
              <h5
                style={{
                  borderRadius: "10px",
                  border: ".5px solid #e5e3e3",
                  color: "#b6afaf",
                  textAlign: "center",
                  margin: "7px 0px",
                  padding: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setButtonType("solid")}
              >
                Solid
              </h5>
            )}
          </Col>
          <Col xs={6} sm={5} lg={3} xl={2}>
            {buttonType == "outline" ? (
              <h5
                size="sm"
                style={{
                  background: "#0397EB1A",
                  color: "#219DE3",
                  borderRadius: "10px",
                  padding: "5px 5px",
                  margin: "7px 0px",
                  textAlign: "center",
                }}
                onClick={() => setButtonType("outline")}
              >
                Outline
              </h5>
            ) : (
              <h5
                style={{
                  borderRadius: "10px",
                  border: ".5px solid #e5e3e3",
                  color: "#b6afaf",
                  textAlign: "center",
                  margin: "7px 0px",
                  cursor: "pointer",
                  padding: "5px 5px",
                }}
                onClick={() => setButtonType("outline")}
              >
                Outline
              </h5>
            )}
          </Col>
        </Row>
        <>
          <div style={{ margin: "5px 0px 0px 30px", fontWeight: 600 }}>
            Select Button Style
          </div>
          <Row style={{ justifyContent: "end", margin: "5px 10px" }}>
            <Col sm={4} xs={10} style={{ margin: "auto" }}>
              <div
                className={`customeBtndiv1 ${
                  btnRadius === "10px" && "customeBtnSelected"
                }`}
              >
                <p
                  className={`${
                    buttonType === "solid"
                      ? "customebtnp1"
                      : "customebtnoutlinep1"
                  }`}
                  onClick={() => setBtnRadius("10px")}
                >
                  Add Your Text
                </p>
              </div>
            </Col>
            <Col sm={4} xs={10} style={{ margin: "auto" }}>
              <div
                className={`customeBtndiv1 ${
                  btnRadius === "25px" && "customeBtnSelected"
                }`}
              >
                <p
                  className={`${
                    buttonType === "solid"
                      ? "customebtnp2"
                      : "customebtnoutlinep2"
                  }`}
                  onClick={() => setBtnRadius("25px")}
                >
                  Add Your Text
                </p>
              </div>
            </Col>
            <Col sm={4} xs={10} style={{ margin: "auto" }}>
              <div
                className={`customeBtndiv1 ${
                  btnRadius === "1px" && "customeBtnSelected"
                }`}
              >
                <p
                  className={`${
                    buttonType === "solid"
                      ? "customebtnp3"
                      : "customebtnoutlinep3"
                  }`}
                  onClick={() => setBtnRadius("1px")}
                >
                  Add Your Text
                </p>
              </div>
            </Col>
          </Row>
        </>
        <Row style={{ margin: "5px 10px" }}>
          <Col xs={10} sm={5} style={{ margin: "auto" }}>
            <FormGroup>
              <label className="form-control-label">Select Font</label>
              <Select
                onChange={(e) =>
                  setTypography({ ...typography, fontName: e.value })
                }
                name="fontName"
                defaultValue={typography.fontName ? typography.fontName : ""}
                className="form-control-alternative"
                options={FontNames?.map((font) => ({
                  value: font,
                  label: `${font}`,
                }))}
              />
            </FormGroup>
          </Col>
          <Col xs={10} sm={5} style={{ margin: "auto" }}>
            <FormGroup>
              <label className="form-control-label">Font Weight</label>
              <Select
                onChange={(e) =>
                  setTypography({ ...typography, fontWeight: e.value })
                }
                defaultValue={
                  typography.fontWeight ? typography.fontWeight : ""
                }
                name="fontWeight"
                className="form-control-alternative"
                options={fontWeights?.map((font) => ({
                  value: font,
                  label: `${font}`,
                }))}
              />
            </FormGroup>
          </Col>
          <Col xs={10} sm={2} style={{ margin: "auto" }}>
            <FormGroup>
              <label className="form-control-label">Select Size</label>
              <Select
                onChange={(e) =>
                  setTypography({ ...typography, fontSize: e.value })
                }
                name="fontSize"
                defaultValue={typography.fontSize ? typography.fontSize : ""}
                className="form-control-alternative"
                options={fontSizes?.map((font) => ({
                  value: font,
                  label: `${font}`,
                }))}
              />
            </FormGroup>
          </Col>
        </Row>
        <div style={{ padding: "0px 50px" }}>
          <p>Select Color</p>
          <div className="colorDiv">
            {/* {colors.map((color) => (
              <>
                <div
                  className={`colorDiv1 ${
                    btnColor === color && "SelectedcolorDiv1"
                  }`}
                  style={{ background: color }}
                  onClick={() => {
                    setBtnColor(color);
                  }}
                >
                  {btnColor === color && "Selected"}
                </div>
              </>
            ))} */}
            <div className="colorDiv1">
              <Input
                type="color"
                value={btnColor}
                className="btnColorDiv"
                onChange={(e) => setBtnColor(e.target.value)}
              />
              <div
                className="IconGradient"
                style={{
                  background: btnColor
                    ? `linear-gradient(to right,#0017fb, ${btnColor})`
                    : "linear-gradient(147deg,#0017fb 0%, #8100fb 10.94%, #b000fb 21.88%,#e500fb 33.85%, #fb0099 43.75%, #fb006f 51.04%, #fb0038 60.94%,#fb4a00 70.83%, #fb6600 79.69%, #fb8300 85.94%,#fb7e00 93.75%,#fba900 98.44%)",
                }}
              >
                <img src={ColorSelect} alt="colorSelector" />
                <p>Add color</p>
              </div>
            </div>
          </div>
        </div>
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
              gap: "3%",
            }}
          >
            <Button color="secondary" onClick="">
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmitCustomizeButton}>
              Submit
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CustomizeButton;
