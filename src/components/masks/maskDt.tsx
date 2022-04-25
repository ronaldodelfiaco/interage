import React from 'react';
import InputMask from 'react-input-mask';
import LightTextField from '../LightTextField';

const maskDt = ({ value, onChange, label, name }) => {
  return (
    <InputMask mask="99/99/9999" value={value} onChange={onChange}>
      <LightTextField fullWidth name={name} label={label} />
    </InputMask>
  );
};

export default maskDt;
