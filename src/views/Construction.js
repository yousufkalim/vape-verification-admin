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
import React from 'react';

// reactstrap components
import { Card, Container, Row } from 'reactstrap';

const Construction = () => {
  return (
    <>
      <Container className='mt--7' fluid>
        <Row>
          <div className='col'>
            <Card className='shadow border-0'>
              <h1 style={{ margin: '100px', textAlign: 'center' }}>
                This page is under construction...
              </h1>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Construction;
