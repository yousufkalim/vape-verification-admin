import React from 'react';
import DownloadIcon from '../../assets/img/Featured_icon.svg';
import crossIcon from '../../assets/img/close.png';

const FilePicker = (props) => {
  const fileName = props?.fileName;

  return (
    <div
      className='filepicker_main_div'
      style={{
        justifyContent: 'center',
      }}
    >
      <label htmlFor={`file` + props?.index}>
        <input
          id={`file` + props?.index}
          name={props?.name}
          accept={props.accept || 'image/*'}
          type='file'
          disabled={props?.disabled}
          onChange={props?.onChange}
          className='filepicker_input'
        />
        <div
          style={{
            alignItems: 'center',
          }}
          className='download_icon_div'
        >
          {fileName ? (
            <div
              className='filepicker_image'
              style={{ display: 'flex', alignItems: 'center', marginBlock: 5 }}
            >
              <img className='filepicker_image_img' alt='new_image' src={fileName} />
              {props.isDelete && (
                <img
                  className='delete_product_file'
                  onClick={(e) => props.handleDelete(e, fileName)}
                  src={crossIcon}
                  alt='cross'
                />
              )}
            </div>
          ) : (
            <>
              <img src={DownloadIcon} alt='' className='download_icon' />
              <div className='text_div'>
                 Upload logo
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default FilePicker;
