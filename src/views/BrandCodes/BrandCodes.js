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
import Loader from 'components/Spinner/Spinner';
import moment from 'moment';
import { exportToCSV } from 'utils/exportCodes';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';

const headers = [
  'Code',
  'Scan Attempts',
  'Scanned Date and Time',
  'Status',
  'IP Address',
  'Created At',
  'User Agent',
];

const BrandCodes = () => {
  const [codes, setCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportCodes, setExportCodes] = useState([]);
  const [total, setTotal] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmActivate, setConfirmActivate] = useState(false);

  const store = Store();
  const { user } = store;

  useEffect(() => {
    getCodes();
  }, [page]);

  const getCodes = async () => {
    setLoading(true);

    try {
      const data = await api('get', `/codes?page=${page}&brand=${user._id}`);
      setCodes(data.codes);
      setTotal(data?.total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSelectCodes = (e, id) => {
    const isSelected = selectedCodes.find((item) => item === id);
    if (isSelected) {
      return setSelectedCodes(selectedCodes.filter((code) => code !== id));
    }
    setSelectedCodes((prevState) => [...prevState, id]);
  };

  // const handleValidate = (code) => {
  //   const dataToSend = {
  //     brandId: user._id,
  //     codeId: code,
  //   };
  //   api('post', `/codes/validate`, dataToSend).then((res) => {
  //     if (res.success) {
  //       toast.success('Product validated successfully');
  //       getCodes();
  //     }
  //   });
  // };

  const handleConfirmInvalidateCodes = () => {
    setConfirmModal(true);
  };

  const handleConfirmActivateCodes = () => {
    setConfirmActivate((prev) => !prev);
  };

  const handleInValidate = () => {
    if (selectedCodes.length > 0) {
      api('put', `/codes/invalidate`, { codes: selectedCodes }).then((res) => {
        if (res.success) {
          getCodes();
          setSelectedCodes([]);
          handleInvalidateModal();
          toast.success(res?.message);
        }
      });
    } else {
      toast.error('Please select codes');
    }
  };

  const handleActivate = () => {
    if (selectedCodes.length > 0) {
      api('put', `/codes/activate`, { codes: selectedCodes }).then((res) => {
        if (res.success) {
          getCodes();
          setSelectedCodes([]);
          handleConfirmActivateCodes();
          toast.success(res?.message);
        }
      });
    } else {
      toast.error('Please select codes');
    }
  };

  useEffect(() => {
    if (exportCodes?.length > 0) {
      setExportCodes([]);
    }
  }, [exportCodes]);

  const handleExport = async () => {
    setLoading(true);
    api('get', `/codes/export?brand=${user._id}`)
      .then((res) => {
        if (res.codes?.length > 0) {
          const codesToExport = res?.codes;
          if (codesToExport?.length > 0) {
            handleSubmitExcel(codesToExport);
          } else {
            toast.error('No codes exists');
          }
          setLoading(false);
        } else {
          toast.error('No codes exists');
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleSubmitExcel = (exportedCodes) => {
    const updatedExportCodes = exportedCodes.map((item) => ({
      Code: item.code,
      'Scan Attempts': item.scan_attempts,
      // eslint-disable-next-line no-underscore-dangle
      'Scanned Date and Time': moment(item?.validation_time).format('MMMM DD, yyyy hh:mm A'),
      Status: item.status,
      'IP Address': item?.ip_address,
      'Created At': moment(item?.createdAt).format('MMMM DD, yyyy hh:mm A'),
      'User Agent': item?.user_agent,
    }));

    const currentDate = moment().format('MM/DD/YYYY_HH:mm:ss');
    const fileName = `veriscan_export_${currentDate}`;
    exportToCSV(updatedExportCodes, headers, fileName);
  };

  const handleInvalidateModal = () => {
    setConfirmModal((prev) => !prev);
  };

  const onChangePage = (p) => {
    setPage(p);
  };

  const btnDisabled = selectedCodes.length > 0 ? false : true;
  const isCodesExist = codes?.length > 0 ? true : false;
  return (
    <>
      <Container className='mt--7' fluid>
        {loading && <Loader />}
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
                      onClick={handleConfirmActivateCodes}
                      size='md'
                    >
                      Activate
                    </Button>
                    <Button
                      disabled={btnDisabled}
                      color='danger'
                      onClick={handleConfirmInvalidateCodes}
                      size='md'
                    >
                      Invalidate
                    </Button>
                    <Button
                      disabled={!isCodesExist || loading}
                      color='primary'
                      onClick={handleExport}
                      size='md'
                    >
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col' />
                    <th scope='col' />
                    <th scope='col'>Code</th>
                    <th scope='col'>Scan Attempts</th>
                    <th scope='col'>Scanned Time</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Created At</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {codes?.map((item) => {
                    return (
                      <tr>
                        <td className='pr-0'>
                          {item.status !== 'validated' && (
                            <FormGroup check>
                              <Input
                                type='checkbox'
                                checked={selectedCodes.includes(item._id)}
                                onChange={(e) => handleSelectCodes(e, item._id)}
                              />
                            </FormGroup>
                          )}
                        </td>
                        <td className='p-0'>
                          <div
                            style={{
                              background:
                                item.status === 'pending'
                                  ? 'orange'
                                  : item.status === 'validated'
                                  ? '#22df22'
                                  : 'red',
                            }}
                            className='code_status'
                          ></div>
                        </td>
                        <th scope='row' className='pl-0'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm' title={item.name}>
                                {item.code}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td title={item.scan_attempts}>{item.scan_attempts}</td>

                        <td>
                          {item.validation_time &&
                            moment(item.validation_time).format('MMMM DD, yyyy hh:mm A')}
                        </td>
                        <td>
                          {item.status === 'pending'
                            ? 'Pending'
                            : item.status === 'validated'
                            ? 'Validated'
                            : 'Invalidated'}
                        </td>
                        <td>{moment(item.createdAt).format('MMMM DD, yyyy hh:mm A')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              <CardFooter className='py-4'>
                {isCodesExist && (
                  <Pagination
                    disabled={loading}
                    current={page}
                    onChange={onChangePage}
                    size='small'
                    pageSize={100}
                    total={total}
                    showSizeChanger={false}
                    showQuickJumper
                  />
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <ConfirmModal
        handleModal={handleInvalidateModal}
        openModal={confirmModal}
        description={`You are about to invalidate the selected codes.`}
        heading='Invalidate codes'
        handleSubmit={handleInValidate}
        loading={loading}
      />

      <ConfirmModal
        handleModal={handleConfirmActivateCodes}
        openModal={confirmActivate}
        description={`You are about to activate the selected codes.`}
        heading='Activate codes'
        handleSubmit={handleActivate}
        loading={loading}
      />
    </>
  );
};

export default BrandCodes;
