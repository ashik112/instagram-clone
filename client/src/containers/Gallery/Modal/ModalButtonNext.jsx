// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const ModalButtonNext = ({
  isMobile = false, currentPostIndex = 0, postLength = 0, onClick = () => {},
}) => (
  currentPostIndex < postLength - 1 && (
    <a
      onClick={onClick}
      type="button"
      className={`close ${isMobile ? 'text-dark' : 'text-light'}`}
      style={(!isMobile && { position: 'absolute', top: '48%', right: '-50px' }) || {}}
    >
      <MdKeyboardArrowRight size={isMobile ? 32 : 48} />
    </a>
  )
) || ('');

export default ModalButtonNext;
