import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, Table, Row, Media } from 'reactstrap';

const PendingRequests = ({ role, requests }) => {
  console.log('requets', requests);
  const history = useHistory();
  const handleNavigate = () => {
    role === 'brand'
      ? history.push('/brand/batch-requests')
      : history.push('/admin/batch-requests');
  };
  return (
    <>
      <Card className="shadow h-100">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              {/* <h3 className="mb-0">Pending Requests</h3> */}
              <h3 className="mb-0">All Requests</h3>
            </div>
            <div className="col text-right">
              <Button color="primary" onClick={handleNavigate} size="sm">
                See all
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>

              <th scope="col">Brand Name</th>
              <th scope="col">Batch</th>
              <th scope="col">Number of Batch</th>
              <th scope="col">Text</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>

            </tr>
          </thead>
          <tbody>
            {requests?.map((item) => {
              return (
                <tr>
                  <th scope="row">
                    <Media className="align-items-center">
                      <Media>
                        <span className="mb-0 text-sm" title={item.name}>
                          {item.brand.name?.length > 30
                            ? item.brand.name?.substring(0, 30) + '...'
                            : item.brand.name}
                        </span>
                      </Media>
                    </Media>
                  </th>
                  <td scope="row">
                    <Media className="align-items-center">
                      <Media>
                        <span className="mb-0 text-sm" title={item.name}>
                          {item.name?.length > 30
                            ? item.name?.substring(0, 30) + '...'
                            : item.name}
                        </span>
                      </Media>
                    </Media>
                  </td>
                  <td title={item.number_of_codes}>{item.number_of_codes}</td>
                  <td title={item.text}>
                    {item.text?.length > 45
                      ? item.text?.substring(0, 45) + '...'
                      : item.text}
                  </td>
                  <td title={item.status}>{item.status}</td>
                  <td>{new Date(item.createdAt).toDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default PendingRequests;
