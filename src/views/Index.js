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
import { Card, CardHeader, CardBody, Container, Row, Col } from 'reactstrap';

// core components
import { chartOptions, parseOptions, chartExample2 } from 'variables/charts.js';
import { Store } from 'StoreContext';
import PendingRequests from 'components/PendingRequests/PendingRequests';

export const options = {
  responsive: true,
  datasets: {
    bar: {
      barThickness: 22,
      borderRadius: {
        topRight: 5,
        topLeft: 5,
      },
    },
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        border: {
          display: false,
        },
        // ticks: {
        //   stepSize: 5,
        // },
        suggestedMin: 0,
        suggestedMax: 300,
        ticks: {
          // forces step size to be 50 units
          stepSize: 5,
        },
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState('data1');

  const store = Store();
  const { stats, user } = store;

  const labels = stats?.stats ? Object.keys(stats?.stats) : [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Requests',
        data: stats?.stats ? Object.values(stats?.stats) : [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // minBarLength: 20,
      },
    ],
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data('data' + index);
  };
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
                    <h2 className='mb-0'>Brands Registrations</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className='chart'>
                  <Bar data={data} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
