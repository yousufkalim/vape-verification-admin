import api from 'api';
import React, { useEffect, useState } from 'react';
import { Card, Col } from 'reactstrap';
import { Store } from 'StoreContext';
import Anim1 from '../../assets/img/brand/anim1.png';
import Anim2 from '../../assets/img/brand/anim2.png';
import Anim3 from '../../assets/img/brand/anim3.png';
import Anim4 from '../../assets/img/brand/anim4.png';
import Check from '../../assets/img/brand/check.svg';

const animationImages = [
  {
    image: Anim1,
    value: 'none',
  },
  {
    image: Anim2,
    value: 'moveIn',
  },
  {
    image: Anim3,
    value: 'zoomIn',
  },
  {
    image: Anim4,
    value: 'bottom',
  },
];

const PageAnimation = () => {
  const [animation, setAnimation] = useState('none');
  const store = Store();

  const { user } = store;

  const getUser = () => {
    api('get', `/users/${user?._id}`)
      .then((res) => {
        setAnimation(res?.user?.pageAnimation);
        //   toast.success('Background Updated');
      })
      .catch(() => {
        console.log('error');
      });
  };

  const updateAnimation = async (anim) => {
    await api('put', `/users/brand/animation/${user?._id}`, { animation: anim })
      .then((res) => {
        getUser();
        //   toast.success('Background Updated');
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
      <Col xs={5} sm={11} style={{ margin: '20px 0px 5px 0px', fontWeight: 900 }}>
        <h2>Page Animations</h2>
      </Col>
      <div className='animations px-4 pb-4'>
        {animationImages?.map(({ image, value }) => (
          <div style={{ position: 'relative' }}>
            <img
              key={value}
              className={value === animation && 'selected_animation'}
              onClick={() => updateAnimation(value)}
              style={{ width: '100%' }}
              src={image}
              alt={value}
            />
            {value === animation && <img className='animation_check' src={Check} alt='check' />}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PageAnimation;
