import styled from "styled-components";


export const StyledInput = styled.input`
&::-webkit-outer-spin-button,
&::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

& {
  -moz-appearance: textfield; /* for Firefox */
}

outline: none;
padding: 5px;
`;
