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
import { Store } from '../../StoreContext';
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
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

// core components
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';

const BrandCodes = () => {
  const [codes, setCodes] = useState([]);
  const [page] = useState(1);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const store = Store();
  const { user } = store;

  useEffect(() => {
    getCodes();
  }, []);

  const getCodes = async () => {
    const data = await api('get', `/codes?page=${page}&status=pending&brand=${user._id}`);
    setCodes(data.codes);
  };

  const handleSelectCodes = (e, id) => {
    const isSelected = selectedCodes.find((item) => item === id);
    if (isSelected) {
      return setSelectedCodes(selectedCodes.filter((code) => code !== id));
    }
    setSelectedCodes((prevState) => [...prevState, id]);
  };

  const handleValidate = (code) => {
    const dataToSend = {
      brandId: user._id,
      codeId: code,
    };
    api('post', `/codes/validate`, dataToSend).then((res) => {
      if (res.success) {
        getCodes();
      }
    });
  };

  const handleInValidate = () => {
    if (selectedCodes.length > 0) {
      api('put', `/codes/invalidate`, { codes: selectedCodes }).then((res) => {
        if (res.success) {
          toast.success(res?.message);
          setSelectedCodes([]);
          getCodes();
        }
      });
    } else {
      toast.error('Please select codes');
    }
  };

  // const handleDelete = (id) => {
  //   api('delete', `/users/${id}`).then(() => {
  //     toast.success('User deleted successfully');
  //     getCodes();
  //   });
  // };

  const btnDisabled = selectedCodes.length > 0 ? false : true;
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <div className='d-flex justify-content-between '>
                  <h3 className='mb-0'>All Codes</h3>
                  <div>
                    <Button
                      disabled={btnDisabled}
                      color='danger'
                      onClick={handleInValidate}
                      size='md'
                    >
                      InValidate
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col' />
                    <th scope='col'>Code</th>
                    <th scope='col'>Scan Attempts</th>
                    <th scope='col'>Validation Time</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Created At</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {codes?.map((item) => {
                    return (
                      <tr>
                        <td title={item.scan_attempts}>
                          <FormGroup check>
                            <Input
                              type='checkbox'
                              checked={selectedCodes.includes(item._id)}
                              onChange={(e) => handleSelectCodes(e, item._id)}
                            />
                          </FormGroup>
                        </td>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm' title={item.name}>
                                {item.code}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td title={item.scan_attempts}>{item.scan_attempts}</td>

                        <td>{item.active}</td>
                        <td>{item.status}</td>
                        <td>{new Date(item.createdAt).toDateString()}</td>

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
                              <DropdownItem onClick={() => handleValidate(item.code)}>
                                Validate
                              </DropdownItem>
                              {/* <DropdownItem
                                href='#pablo'
                                className='text-danger'
                                onClick={() => handleValidate(item._id)}
                              >
                                Delete
                              </DropdownItem> */}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BrandCodes;
