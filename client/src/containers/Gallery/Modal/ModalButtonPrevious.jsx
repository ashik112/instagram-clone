// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

// eslint-disable-next-line react/prop-types
const ModalButtonPrevious = ({ currentPostIndex = 0, onClick = () => {}, isMobile = false }) => (
  currentPostIndex > 0 && (
    <a
      onClick={onClick}
      type="button"
      className={`close ${isMobile ? 'text-dark' : 'text-light'}`}
      style={(!isMobile && { position: 'absolute', top: '48%', left: '-50px' }) || { color: 'black' }}
    >
      <MdKeyboardArrowLeft size={isMobile ? 32 : 48} />
    </a>
  )
) || ('');

export default ModalButtonPrevious;
