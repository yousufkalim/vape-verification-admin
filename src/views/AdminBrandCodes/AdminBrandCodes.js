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
import { Store, UpdateStore } from 'StoreContext';
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
import { toast } from 'react-toastify';
import moment from 'moment';

const AdminBrandCodes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { users } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await api('get', '/users');

    updateStore({ users: data.users });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setUser({
        _id: item._id,
        name: item.name,
        email: item.email,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api('delete', `/users/${id}`).then(() => {
      toast.success('User deleted successfully');
      getUsers();
    });
  };

  return (
    <>
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <div className='d-flex justify-content-between '>
                  <h3 className='mb-0'>All Codes</h3>
                  <Button color='primary' href='#pablo' onClick={handleModal} size='md'>
                    <i className='ni ni-fat-add'></i>
                    Request New Batch
                  </Button>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Active</th>
                    <th scope='col'>Created At</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item) => {
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
                        <td title={item.email}>
                          {item.email?.length > 30
                            ? item.email?.substring(0, 30) + '...'
                            : item.email}
                        </td>

                        <td>{item.active}</td>
                        <td>{moment(item.createdAt).format('MMMM DD, yyyy hh:mm A')}</td>
                        <td className='text-right'>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className='btn-icon-only text-light'
                              href='#pablo'
                              role='button'
                              size='sm'
                              color=''
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className='fas fa-ellipsis-v' />
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-arrow' right>
                              {item.test_conducted && (
                                <DropdownItem
                                  onClick={() => history.push(`/admin/users/${item._id}`)}
                                >
                                  View
                                </DropdownItem>
                              )}
                              <DropdownItem href='#pablo' onClick={() => handleEditModal(item)}>
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href='#pablo'
                                className='text-danger'
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </DropdownItem>
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
      </Container>
    </>
  );
};

export default AdminBrandCodes;
