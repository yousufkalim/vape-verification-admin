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
// reactstrap components
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'api';
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Button,
} from 'reactstrap';

// core components
import { toast } from 'react-toastify';
import Loader from 'components/Spinner/Spinner';
import { capitalString } from 'utils/common';
import moment from 'moment';
import { exportToCSV } from 'utils/exportCodes';
import { handleExportCodes } from 'utils/exportCodes';

const CodeRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    try {
      setLoading(true);
      const data = await api('get', '/requests');
      setAllRequests(data.requests);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleApprove = (id) => {
    setLoading(true);
    api('patch', `/requests/approve/${id}`)
      .then(() => {
        toast.success('Request has been approved successfully');
        getRequests();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleInvalidateRequest = (id) => {
    setLoading(true);
    api('patch', `/requests/invalidate/${id}`)
      .then(() => {
        toast.success('Codes has been invalidated for this request');
        getRequests();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleActivateRequest = (id) => {
    setLoading(true);
    api('patch', `/requests/validate/${id}`)
      .then(() => {
        toast.success('Request has been activated successfully');
        getRequests();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleReject = (id) => {
    setLoading(true);
    api('patch', `/requests/reject/${id}`)
      .then(() => {
        toast.success('Request has been rejected.');
        getRequests();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    api('delete', `/requests/${id}`)
      .then(() => {
        toast.success('Request deleted successfully');
        getRequests();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  /*    Export Codes against request    */
  const handleExportForRequest = async (id, brandName) => {
    setLoading(true);
    api('get', `/codes/export?request=${id}`)
      .then((res) => {
        if (res.codes?.length > 0) {
          const codesToExport = res?.codes;
          if (codesToExport?.length > 0) {
            const currentDate = moment().format('MM DD yyyy');
            const fileName = `${brandName} ${currentDate}`;
            handleExportCodes(codesToExport, fileName);
          } else {
            toast.error('No code exists');
          }
          setLoading(false);
        } else {
          toast.error('No code exists');
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  /*    Export All Codes    */
  const handleExport = async () => {
    setLoading(true);
    api('get', `/codes/export`)
      .then((res) => {
        const codesToExport = res?.codes;
        if (codesToExport?.length > 0) {
          const currentDate = moment().format('MM DD yyyy hh mm');
          const fileName = `veriscan export ${currentDate}`;
          handleExportCodes(codesToExport, fileName);
        } else {
          toast.error('No code exists');
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container className='mt--7' fluid>
        {/* Table */}
        {loading && <Loader />}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <div className='d-flex justify-content-between '>
                  <h3 className='mb-0'>Batch Requests</h3>
                  <Button disabled={loading} color='primary' onClick={handleExport} size='md'>
                    Export all codes
                  </Button>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Code</th>
                    <th scope='col'>Number of Codes</th>
                    <th scope='col'>Text</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Created At</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {allRequests?.map((item) => {
                    return (
                      <tr>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm' title={item.name}>
                                {item.name?.length > 30
                                  ? item.name?.substring(0, 30) + '...'
                                  : item.name}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{item.number_of_codes}</td>
                        <td title={item.text}>
                          {item.text?.length > 45 ? item.text?.substring(0, 45) + '...' : item.text}
                        </td>
                        <td
                          // className={`${
                          //   item.status === 'pending'
                          //     ? 'text-info'
                          //     : item.status === 'approved'
                          //     ? 'text-success'
                          //     : 'text-danger'
                          // }`}
                          title={capitalString(item.status)}
                        >
                          {capitalString(item.status)}
                        </td>
                        <td>{moment(item.createdAt).format('MMMM DD, yyyy hh:mm A')}</td>
                        <td className='text-right'>
                          <UncontrolledDropdown>
                            {item.status !== 'rejected' && (
                              <DropdownToggle
                                className='btn-icon-only text-light'
                                role='button'
                                size='sm'
                                color=''
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className='fas fa-ellipsis-v' />
                              </DropdownToggle>
                            )}

                            {item.status === 'pending' ? (
                              <DropdownMenu className='dropdown-menu-arrow' right>
                                {item.test_conducted && (
                                  <DropdownItem
                                    onClick={() => history.push(`/admin/${item._id}/codes`)}
                                  >
                                    View Code
                                  </DropdownItem>
                                )}
                                <DropdownItem onClick={() => handleApprove(item._id)}>
                                  Approve
                                </DropdownItem>
                                <DropdownItem
                                  className='text-warning'
                                  onClick={() => handleReject(item._id)}
                                >
                                  Reject
                                </DropdownItem>
                                <DropdownItem
                                  className='text-danger'
                                  onClick={() => handleDelete(item._id)}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            ) : (
                              <DropdownMenu className='dropdown-menu-arrow' right>
                                {item.status === 'approved' ? (
                                  <DropdownItem
                                    style={{ color: item.status === 'approved' ? 'red' : 'green' }}
                                    onClick={() => handleInvalidateRequest(item._id)}
                                  >
                                    Invalidate
                                  </DropdownItem>
                                ) : (
                                  <DropdownItem
                                    style={{ color: item.status === 'approved' ? 'red' : 'green' }}
                                    onClick={() => handleActivateRequest(item._id)}
                                  >
                                    Activate
                                  </DropdownItem>
                                )}
                                <DropdownItem
                                  onClick={() => handleExportForRequest(item._id, item.brand.name)}
                                >
                                  Export codes
                                </DropdownItem>
                              </DropdownMenu>
                            )}
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CodeRequests;
