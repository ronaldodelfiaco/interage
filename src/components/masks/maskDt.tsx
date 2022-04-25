import React from "react";
import InputMask from "react-input-mask";
import LightTextField from "../LightTextField";

const maskDt = (props) => {
  return (
    <InputMask mask="99/99/9999" value={props.value} onChange={props.onChange}>
      {(inputProps) => (
        <LightTextField
          {...inputProps}
          fullWidth
          name={props.name}
          label={props.label}
        />
      )}
    </InputMask>
  );
};

export default maskDt;
