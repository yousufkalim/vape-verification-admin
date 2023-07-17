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
import 'jquery';
import 'jvectormap-next';
import 'jvectormap-next/jquery-jvectormap.css';
import { VectorMap } from 'react-jvectormap';
import api from 'api';
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

// core components
import Loader from 'components/Spinner/Spinner';
import { Store } from 'StoreContext';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const mapData = {
  US: 100,
  CA: 50,
  MX: 200,
  BR: 150,
  GB: 120,
  DE: 180,
  RU: 300,
  CN: 250,
  IN: 220,
  PK: 300,
  JP: 20070,
};

const VectorMaps = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const { user } = Store();
  const location = useLocation();

  useEffect(() => {
    getUserLocations();
  }, []);

  const getUserLocations = async () => {
    try {
      setLoading(true);
      const url = location.pathname.includes('admin') ? 'all-locations' : `locations/${user._id}`;
      const res = await api('get', `/codes/${url}`);
      const data = res.data.locations?.map((item) => {
        const { code, city, country, timestamp, ipAddress, batch } = item;
        const time = moment(timestamp).format('DD-MM-YYYY HH:MM');
        const name = `Batch = "${batch}", 
                               Code = "${code}"
                      City = "${city}",
                      Country = "${country}",
                      IP Address = "${ipAddress}",
                      Timestamp = "${time}" `;
        return { ...item, name };
      });
      setLocations(data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  // const handleClick = (e, code) => {
  //   console.log('Clicked====> ', e);
  //   console.log('CODEEEe ', code);
  // };

  const handleFilterWithStatus = (check) => {
    // const filteredData = locations?.filter((item) => item.status === check);
    // setLocations([...filteredData]);
    setStatusFilter(check);
  };

  const handleDurationFilter = (duration) => {
    setDurationFilter(duration);
  };

  // const handleTip = (e, code, str) => {
  //   return {
  //     label: 'hello',
  //   };
  // };

  const getLocationsByDuration = () => {
    if (durationFilter) {
      const subtractBy =
        durationFilter === 'week'
          ? { type: 'days', value: 7 }
          : durationFilter === 'month'
          ? { type: 'months', value: 1 }
          : { type: 'years', value: 1 };
      const getDate = moment().subtract(subtractBy.value, subtractBy.type);
      const filter = locations.filter((item) => {
        const recordDate = moment(item.timestamp);

        if (recordDate.isAfter(getDate)) {
          return item;
        }
      });
      return filter;
    } else {
      return locations;
    }
  };
  const subtract = getLocationsByDuration();

  const filteredData = statusFilter
    ? subtract?.filter((item) => item.status === statusFilter)
    : subtract;

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
                  <h3 className='mb-0'>Map</h3>
                  <div className='d-md-flex d-none gap-5'>
                    <div
                      onClick={() => handleDurationFilter('week')}
                      className={`duration_filter ${
                        durationFilter === 'week' && 'selected_duration_filter'
                      }`}
                    >
                      Week
                    </div>
                    <div
                      onClick={() => handleDurationFilter('month')}
                      className={`duration_filter ${
                        durationFilter === 'month' && 'selected_duration_filter'
                      }`}
                    >
                      Month
                    </div>
                    <div
                      onClick={() => handleDurationFilter('year')}
                      className={`duration_filter ${
                        durationFilter === 'year' && 'selected_duration_filter'
                      }`}
                    >
                      Year
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div>
                      Invalid:{' '}
                      <span className='map_legend_color' style={{ background: '#ff0000' }}></span>
                    </div>
                    <div className='ml-4 mr-6'>
                      Valid:{' '}
                      <span className='map_legend_color' style={{ background: '#00ff00' }}></span>
                    </div>

                    <UncontrolledDropdown>
                      <DropdownToggle
                        className='btn-icon-only text-light'
                        role='button'
                        size='sm'
                        color=''
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className='fas fa-ellipsis-v' />
                      </DropdownToggle>

                      <DropdownMenu className='dropdown-menu-arrow' right>
                        <DropdownItem onClick={() => handleFilterWithStatus('invalid')}>
                          Invalid Attempts
                        </DropdownItem>
                        <DropdownItem onClick={() => handleFilterWithStatus('valid')}>
                          Valid Attempts
                        </DropdownItem>
                      </DropdownMenu>
                      {/* <DropdownMenu className='dropdown-menu-arrow' right>
                      </DropdownMenu> */}
                    </UncontrolledDropdown>
                  </div>
                </div>
                <div className='d-flex d-md-none gap-5 justify-content-center mt-2'>
                  <div
                    onClick={() => handleDurationFilter('week')}
                    className={`duration_filter ${
                      durationFilter === 'week' && 'selected_duration_filter'
                    }`}
                  >
                    Week
                  </div>
                  <div
                    onClick={() => handleDurationFilter('month')}
                    className={`duration_filter ${
                      durationFilter === 'month' && 'selected_duration_filter'
                    }`}
                  >
                    Month
                  </div>
                  <div
                    onClick={() => handleDurationFilter('year')}
                    className={`duration_filter ${
                      durationFilter === 'year' && 'selected_duration_filter'
                    }`}
                  >
                    Year
                  </div>
                </div>
              </CardHeader>
              <CardBody style={{ height: '80vh' }}>
                <VectorMap
                  map='world_mill' // Choose the map type (world, world_mill, etc.)
                  backgroundColor='#FFFFFF'
                  hoverOpacity='0.7'
                  zoomMax={200}
                  containerStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                  markerStyle={{
                    initial: {
                      fill: '#F8E23B',
                      stroke: '#383f47',
                    },
                  }}
                  //   onMarkerClick={handleClick}
                  markers={filteredData?.map((location) => ({
                    latLng: location.latLng,
                    name: location.name,
                    style: {
                      fill: location.color, // Use the color property from your locations data
                      stroke: '#383f47',
                    },
                  }))}
                  // onMarkerTipShow={handleTip}
                  containerClassName='map'
                  regionStyle={{
                    initial: {
                      fill: '#e4e4e4',
                      'fill-opacity': 1,
                      stroke: 'none',
                      'stroke-width': 0,
                      'stroke-opacity': 1,
                    },
                  }}
                  series={{
                    regions: [
                      {
                        values: mapData,
                        scale: ['#C8EEFF', '#0071A4', '#223A2f'],
                        normalizeFunction: 'polynomial',
                      },
                    ],
                    markers: [
                      {
                        attribute: 'fill',
                        scale: ['#ff0000', '#00ff00'], // Define the range of colors
                        // values: ['#ff0000', '#00ff00'],
                        normalizeFunction: 'polynomial',
                      },
                    ],
                  }}
                />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default VectorMaps;
