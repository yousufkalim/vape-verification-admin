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

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: 'white' }}>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{' '}
            <a
              className="font-weight-bold ml-1"
              href="https://www.passtotrip.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Admin Panel
            </a>
            &nbsp;Developed by{' '}
            <a
              className="font-weight-bold ml-1"
              href="https://www.falconconsulting.fr"
              rel="noopener noreferrer"
              target="_blank"
            >
              Falcon Consulting
            </a>{' '}
            - All rights reserved.
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
