import api from 'api';
import React, { useEffect, useState } from 'react';
import { Card, Col } from 'reactstrap';
import { Store } from 'StoreContext';
import Temp1 from '../../assets/img/temp1.svg';
import Temp2 from '../../assets/img/temp2.svg';
import Temp3 from '../../assets/img/temp3.svg';
import Temp4 from '../../assets/img/temp4.svg';
import Check from '../../assets/img/brand/check.svg';
import { toast } from 'react-toastify';

const layoutImages = [
  {
    image: Temp1,
    value: '1',
  },
  {
    image: Temp2,
    value: '2',
  },
  {
    image: Temp3,
    value: '3',
  },
  {
    image: Temp4,
    value: '4',
  },
];

const PageAnimation = () => {
  const [layout, setLayout] = useState('1');
  const store = Store();

  const { user } = store;

  const getUser = () => {
    api('get', `/users/${user?._id}`)
      .then((res) => {
        setLayout(res?.user?.layout);
        //   toast.success('Background Updated');
      })
      .catch(() => {
        console.log('error');
      });
  };

  const updateAnimation = async (temp) => {
            setLayout(temp);
    await api('put', `/users/brand/layout/${user?._id}`, { layout: temp })
      .then((res) => {
        getUser();
          toast.success('Layout Updated');
      })
      .catch(() => {
        console.log('error');
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card className='shadow' style={{ margin: '10px 0px' }}>
      <Col xs={11} sm={11} style={{ margin: '20px 0px 5px 0px', fontWeight: 900 }}>
        <h2>Layout Design</h2>
      </Col>
      <div className='layouts px-4 pb-4'>
        {layoutImages?.map(({ image, value }) => (
          <div style={{ position: 'relative' }} className="singleLayout">
            <img
              key={value}
              className={value === layout && 'selected_layout'}
              onClick={() => updateAnimation(value)}
              style={{ width: '100%' }}
              src={image}
              alt={value}
            />
            {value === layout && <img className='layout_check' src={Check} alt='check' />}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PageAnimation;
