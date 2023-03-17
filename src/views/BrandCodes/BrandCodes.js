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
  CardFooter,
} from 'reactstrap';
import { Pagination } from 'antd';

// core components
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';

const BrandCodes = () => {
  const [codes, setCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportCodes, setExportCodes] = useState([]);
  const [total, setTotal] = useState(0);
  const store = Store();
  const { user } = store;

  useEffect(() => {
    getCodes();
  }, [page]);

  const getCodes = async () => {
    const data = await api('get', `/codes?page=${page}&status=pending&brand=${user._id}`);
    setCodes(data.codes);
    setTotal(data?.total);
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
        toast.success('Product validated successfully');
        getCodes();
      }
    });
  };

  const headers = [
    {
      label: 'Code',
      key: 'code',
    },
    {
      label: 'Scan Attempts',
      key: 'scan_attempts',
    },
    {
      label: 'Validation Time',
      key: 'validation_time',
    },
    {
      label: 'Status',
      key: 'status',
    },
  ];

  const handleInValidate = () => {
    if (selectedCodes.length > 0) {
      api('put', `/codes/invalidate`, { codes: selectedCodes }).then((res) => {
        if (res.success) {
          getCodes();
          setSelectedCodes([]);
          toast.success(res?.message);
        }
      });
    } else {
      toast.error('Please select codes');
    }
  };

  useEffect(() => {
    if (exportCodes.length > 0) {
      document.getElementById('export_codes').click();
      setExportCodes([]);
    }
  }, [exportCodes]);

  const exportData = () => {
    setExportCodes([]);
  };

  const handleExport = async () => {
    setLoading(true);
    api('get', `/codes/export?brand=${user._id}&status=pending`)
      .then((res) => {
        if (res.codes?.length > 0) {
          setExportCodes(res?.codes);
          setLoading(false);
          // done(true);
        } else {
          toast.error('No codes exists');
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onChangePage = (p) => {
    setPage(p);
  };

  const btnDisabled = selectedCodes.length > 0 ? false : true;
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
                  <div className='d-flex'>
                    <Button
                      disabled={btnDisabled}
                      color='danger'
                      onClick={handleInValidate}
                      size='md'
                    >
                      In Validate
                    </Button>
                    <Button onClick={handleExport} color='primary' size='md'>
                      <CSVLink
                        headers={headers}
                        onClick={exportData}
                        id='export_codes'
                        data={exportCodes}
                        separator={';'}
                        // asyncOnClick={true}
                        // onClick={handleExport}
                      ></CSVLink>
                      Export
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
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              <CardFooter className='py-4'>
                <Pagination
                  current={page}
                  onChange={onChangePage}
                  size='small'
                  pageSize={100}
                  total={total}
                  showSizeChanger={false}
                  showQuickJumper
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BrandCodes;
