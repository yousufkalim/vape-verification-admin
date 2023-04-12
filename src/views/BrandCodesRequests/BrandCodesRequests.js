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
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from 'reactstrap';

// core components
import RequestNewCodes from './RequestNewCodes';
import { toast } from 'react-toastify';
import Loader from 'components/Spinner/Spinner';
import { capitalString } from 'utils/common';
import moment from 'moment';

const BrandCodesRequests = () => {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
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
                  <h3 className='mb-0'>Code Requests</h3>
                  <Button color='primary' onClick={handleModal} size='md'>
                    <i className='ni ni-fat-add'></i>
                    Request New Codes
                  </Button>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Name</th>
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
                        <td title={item.number_of_codes}>{item.number_of_codes}</td>
                        <td title={item.text}>
                          {item.text?.length > 45 ? item.text?.substring(0, 45) + '...' : item.text}
                        </td>
                        <td title={capitalString(item.status)}>{capitalString(item.status)}</td>
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
                            <DropdownMenu className='dropdown-menu-arrow' right>
                              {item.test_conducted && (
                                <DropdownItem
                                  onClick={() => history.push(`/admin/users/${item._id}`)}
                                >
                                  View
                                </DropdownItem>
                              )}

                              {item.status === 'pending' ? (
                                <DropdownItem
                                  className='text-danger'
                                  onClick={() => handleInvalidateRequest(item._id)}
                                >
                                  Invalidate
                                </DropdownItem>
                              ) : item.status === 'approved' ? (
                                <DropdownItem
                                  className='text-danger'
                                  onClick={() => handleInvalidateRequest(item._id)}
                                >
                                  Invalidate
                                </DropdownItem>
                              ) : (
                                item.status === 'invalidated' && (
                                  <DropdownItem
                                    className='text-success'
                                    onClick={() => handleActivateRequest(item._id)}
                                  >
                                    Activate
                                  </DropdownItem>
                                )
                              )}
                            </DropdownMenu>
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
        {openModal && (
          <RequestNewCodes
            setLoading={setLoading}
            openModal={openModal}
            handleModal={handleModal}
            getUsers={getRequests}
          />
        )}
      </Container>
    </>
  );
};

export default BrandCodesRequests;
