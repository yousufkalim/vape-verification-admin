import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, Table, Row, Media } from 'reactstrap';

const PendingRequests = ({ role, requests }) => {
  const history = useHistory();
  const handleNavigate = () => {
    role === 'brand'
      ? history.push('/brand/codes-requests')
      : history.push('/admin/codes-requests');
  };
  return (
    <>
      <Card className='shadow h-100'>
        <CardHeader className='border-0'>
          <Row className='align-items-center'>
            <div className='col'>
              <h3 className='mb-0'>Pending Requests</h3>
            </div>
            <div className='col text-right'>
              <Button color='primary' onClick={handleNavigate} size='sm'>
                See all
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className='align-items-center table-flush' responsive>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Number of Codes</th>
              <th scope='col'>Text</th>
              <th scope='col'>Status</th>
              <th scope='col'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((item) => {
              return (
                <tr>
                  <th scope='row'>
                    <Media className='align-items-center'>
                      <Media>
                        <span className='mb-0 text-sm' title={item.name}>
                          {item.name?.length > 30 ? item.name?.substring(0, 30) + '...' : item.name}
                        </span>
                      </Media>
                    </Media>
                  </th>
                  <td title={item.number_of_codes}>{item.number_of_codes}</td>
                  <td title={item.text}>
                    {item.text?.length > 45 ? item.text?.substring(0, 45) + '...' : item.text}
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
