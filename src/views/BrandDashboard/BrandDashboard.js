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
import { useState } from 'react';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Bar } from 'react-chartjs-2';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import { chartOptions, parseOptions, chartExample1, chartExample2 } from 'variables/charts.js';

import { Store } from 'StoreContext';
import PendingRequests from 'components/PendingRequests/PendingRequests';

const BrandDashboard = (props) => {
  const store = Store();
  const { stats, user } = store;

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  return (
    <>
      <Container className='mt--7' fluid>
        <Row>
          <Col xl='8'>
            <PendingRequests role={user?.role} requests={stats?.pendingCodeRequests} />
          </Col>
          <Col xl='4'>
            <Card className='shadow'>
              <CardHeader className='bg-transparent'>
                <Row className='align-items-center'>
                  <div className='col'>
                    <h6 className='text-uppercase text-muted ls-1 mb-1'>Performance</h6>
                    <h2 className='mb-0'>Total comments</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className='chart'>
                  <Bar data={chartExample2.data} options={chartExample2.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BrandDashboard;
