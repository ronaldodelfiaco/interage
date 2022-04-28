import React from "react";
import InputMask from "react-input-mask";
import LightTextField from "../LightTextField";

const MaskCPFCNPJ = (props: any) => {
  return (
    <InputMask
      mask="999.999.999-99"
      value={props.value}
      onChange={props.onChange}
    >
      {(inputProps) => (
        <LightTextField
          {...inputProps}
          fullWidth
          label={props.label}
          name={props.name}
        />
      )}
    </InputMask>
  );
};

export default MaskCPFCNPJ;
