/*!
=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

- This template is part of the Argon Dashboard React by Creative Tim.
- It provides a base structure for a React dashboard using Bootstrap.

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

- The copyright and permission notice should be included in all copies or 
  substantial portions of the Software.

=========================================================
*/

// Importing necessary libraries and components for this module
import { useState, useEffect } from 'react';
import 'jquery';  // Required dependency for jvectormap
import 'jvectormap-next';  // jvectormap library for rendering vector maps
import 'jvectormap-next/jquery-jvectormap.css';  // CSS for jvectormap
import { VectorMap } from 'react-jvectormap';  // React component for jvectormap
import api from 'api';  // API utility for making requests
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';  // Reactstrap components for layout and UI
import Loader from 'components/Spinner/Spinner';  // Spinner component to indicate loading state
import { Store } from 'StoreContext';  // Context for accessing user data
import moment from 'moment';  // Library for date and time manipulation
import { useLocation } from 'react-router-dom';  // Hook to access the current route location

  const aggregateDataByCountry = (data) => {
  const aggregated = {};
  data.forEach((location) => {
    if (location.country in aggregated) {
      aggregated[location.country] += 1;
    } else {
      aggregated[location.country] = 1;
    }
  });
  return aggregated;
};

const normalizeData = (data) => {
  const maxVal = Math.max(...Object.values(data));
  const normalized = {};
  for (const country in data) {
    normalized[country] = data[country] / maxVal;
  }
  return normalized;
};

// The main component for displaying the Vector Map for brands
const VectorMaps = () => {
  // Using useState to define and manage state variables
  const [loading, setLoading] = useState(false);  // State to handle loading indicator
  const [locations, setLocations] = useState([]);  // State to store fetched locations
  const [statusFilter, setStatusFilter] = useState('');  // State for status-based filtering
  const [durationFilter, setDurationFilter] = useState('day');  // State for duration-based filtering
  
  // Accessing the user context to get current user data
  const { user } = Store();
  
  // Accessing the current location using the `useLocation` hook to determine if the user is an admin
  const location = useLocation();

  // useEffect hook to fetch user locations once the component mounts
  useEffect(() => {
    getUserLocations();
  }, []);

  // Function to fetch locations based on user ID or all locations for admin
  const getUserLocations = async () => {
    try {
      setLoading(true);
      const url = location.pathname.includes('admin')
        ? 'all-locations'
        : `locations/${user._id}`;
      const res = await api('get', `/codes/${url}`);
      const data = res.data.locations?.filter(item => item.country !== 'undefined').map((item) => {
        // Destructuring the data items for better readability
        const {
      code,
      batch,
      region,
      timestamp
    } = item;
    
    // Formatting the timestamp using moment.js for a friendlier display
    const time = moment(timestamp).format('MMM D, YYYY, h:mm A');
    
    // Constructing the tooltip. Only add fields if they have a value.
    let tooltipItems = [];
    if (code) tooltipItems.push(`Code: ${code}`);
    if (batch) tooltipItems.push(`Batch: ${batch}`);
    if (region) tooltipItems.push(`Region: ${region}`);
    tooltipItems.push(`Time: ${time}`);
    const name = tooltipItems.join('\n');

    return { ...item, name };
      });
      setLocations(data);
      setLoading(false);
    } catch (err) {
      // Handle any errors during the data fetching process
      setLoading(false);
    }
  };

  
  // Function to handle status-based filtering on the map
  const handleFilterWithStatus = (check) => {
    setStatusFilter(check);
  };

const isMobile = window.innerWidth <= 768;

  // Function to handle duration-based filtering on the map
  const handleDurationFilter = (duration) => {
    setDurationFilter(duration);
  };

  // Function to get locations based on the duration filter (e.g., week, month, year)
  const getLocationsByDuration = () => {
    if (durationFilter) {
      // Determine the time span based on duration filter
      const subtractBy =
        durationFilter === 'day'
          ? { type: 'days', value: 1 }
          : durationFilter === 'week'
          ? { type: 'days', value: 7 }
          : durationFilter === 'month'
          ? { type: 'months', value: 1 }
          : { type: 'years', value: 1 };
      
      const getDate = moment().subtract(subtractBy.value, subtractBy.type);
      
      // Filter out locations based on the time span
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
  
  // Get filtered locations based on the duration
  const subtract = getLocationsByDuration();

  // Applying the status filter on the duration-filtered data
  const filteredData = statusFilter
    ? subtract?.filter((item) => item.status === statusFilter)
    : subtract;

    const aggregatedData = aggregateDataByCountry(filteredData);
const normalizedData = normalizeData(aggregatedData);
  
// Return statement to render the component UI
  return (
    // JSX layout for the map component
    <>
      <Container className="mt--7" fluid>
        {loading && <Loader />}  // Display loading spinner if data is still being fetched
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                {/* JSX layout for the map header with filters and legends */}
<CardHeader className="border-0">
  <div className="d-flex justify-content-between align-items-center">
    
    {/* Filter controls */}
    <div className="d-flex align-items-center">
      <span className="mr-2">Duration:</span>
      <div className="btn-group">
        <button 
          onClick={() => handleDurationFilter('day')}
          className={`btn btn-sm ${durationFilter === 'day' ? 'btn-primary' : 'btn-outline-primary'}`}
          title="Show data from the past day"
        >
          Day
        </button>
        <button 
          onClick={() => handleDurationFilter('week')}
          className={`btn btn-sm ${durationFilter === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
          title="Show data from the past week"
        >
          Week
        </button>
        <button 
          onClick={() => handleDurationFilter('month')}
          className={`btn btn-sm ${durationFilter === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
          title="Show data from the past month"
        >
          Month
        </button>
        <button 
          onClick={() => handleDurationFilter('year')}
          className={`btn btn-sm ${durationFilter === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
          title="Show data from the past year"
        >
          Year
        </button>
      </div>
    </div>

    {/* Drop-down for additional filtering */}
    <UncontrolledDropdown className="ml-3">
      <DropdownToggle
        className="btn-icon-only text-light btn btn-sm btn-secondary"
        role="button"
        title="Additional filters"
      >
        <i className="fas fa-filter" />
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem onClick={() => handleFilterWithStatus('repeated')}>
          <span className="map_legend_color mr-2" style={{ background: '#FFA500', width: '10px', height: '10px' }}></span>
          Repeated Attempts
        </DropdownItem>
        <DropdownItem onClick={() => handleFilterWithStatus('invalid_attempt')}>
          <span className="map_legend_color mr-2" style={{ background: '#FF0000', width: '10px', height: '10px' }}></span>
          Invalid Attempts
        </DropdownItem>
        <DropdownItem onClick={() => handleFilterWithStatus('valid')}>
          <span className="map_legend_color mr-2" style={{ background: '#00ff00', width: '10px', height: '10px' }}></span>
          Valid Attempts
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
</CardHeader>








              </CardHeader>
              <CardBody style={{ height: '80vh' }}>
                <VectorMap
                  // Configuration for the VectorMap using jvectormap options
                  map="us_aea" // Defines the map to be displayed. "world_mill" represents a world map.
                    focusOn={isMobile ? {x: 0.10, y: 0.5, scale: 4} : undefined}
                  backgroundColor="#FFFFFF" // Sets the background color of the map.
                  hoverOpacity="0.7" // Opacity for regions/markers on hover.
                  zoomMax={200} // Maximum zoom level the user can zoom in to.
                  containerStyle={{
                    width: '100%',
                    height: '100%'
                  }} // Style for the map container.
                  markerStyle={{
                    initial: {
                      fill: '#F8E23B', // Initial color for markers.
                      stroke: '#383f47' // Initial border color for markers.
                    }
                  }}
markers={filteredData?.filter(location => location.country !== 'undefined').map((location) => ({                    latLng: location.latLng, // Latitude and longitude for placing the marker.
                    name: location.name, // Tooltip information for the marker.
                    style: {
                      fill: location.color, // Color for the marker based on its status (Valid, Invalid, Repeated).
                      stroke: '#383f47' // Border color for the marker.
                    }
                  }))}
                  regionStyle={{
                    initial: {
                      fill: '#e4e4e4', // Initial color for map regions.
                      'fill-opacity': 1,
                      stroke: 'none',
                      'stroke-width': 0,
                      'stroke-opacity': 1
                    }
                  }} 
                  series={{
                    regions: [
      {
        values: normalizedData,
        scale: ['#C8EEFF', '#0071A4'],  // Light blue to dark blue
        normalizeFunction: 'polynomial'
      }
                    ],
                    markers: [
                      {
                        attribute: 'fill',
                        scale: ['#ff0000', '#00ff00'], // Color scale for markers.
                        normalizeFunction: 'polynomial' // Function to normalize marker data values to a range of colors.
                      }
                    ]
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

// Exporting the VectorMaps component to be used elsewhere in the application.
export default VectorMaps;
