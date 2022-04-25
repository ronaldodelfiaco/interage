import React from 'react';
import InputMask from 'react-input-mask';
import LightTextField from '../LightTextField';

const maskCPFCNPJ = ({ value, onChange }) => {
  return (
    <InputMask mask="999.999.999-99" value={value} onChange={onChange}>
      <LightTextField fullWidth label="cpf ou cnpj" name='cpf'/>
    </InputMask>
  );
};

export default maskCPFCNPJ;
