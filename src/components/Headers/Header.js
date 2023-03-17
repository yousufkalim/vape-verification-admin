/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================
x
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { Store } from 'StoreContext';

const Header = () => {
  const store = Store();

  const { user, stats } = store;

  console.log('Current stats ', stats);
  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            {/* Card stats */}
            <Row>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      {user.role === 'brand' ? (
                        <div className='col'>
                          <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                            Codes
                          </CardTitle>
                          <span className='h2 font-weight-bold mb-0'>{stats?.allCodesCount}</span>
                        </div>
                      ) : (
                        <div className='col'>
                          <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                            Codes
                          </CardTitle>
                          <span className='h2 font-weight-bold mb-0'>{stats?.codesCount}</span>
                        </div>
                      )}
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                          <i className='fas fa-chart-bar' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                          Validated Codes
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>
                          {stats?.validatedCodesCount}
                        </span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-warning text-white rounded-circle shadow'>
                          <i className='fas fa-chart-pie' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      {user.role === 'brand' ? (
                        <div className='col'>
                          <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                            In-validated Codes
                          </CardTitle>
                          <span className='h2 font-weight-bold mb-0'>
                            {stats?.invalidatedCodesCount}
                          </span>
                        </div>
                      ) : (
                        <div className='col'>
                          <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                            Brands
                          </CardTitle>
                          <span className='h2 font-weight-bold mb-0'>{stats?.brandCount}</span>
                        </div>
                      )}
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-yellow text-white rounded-circle shadow'>
                          <i className='fas fa-users' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                          Codes Requests
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>{stats?.requestCount}</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
                          <i className='fas fa-percent' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
