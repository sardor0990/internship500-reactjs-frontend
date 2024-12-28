import styled from "styled-components";


export const InputBackground = styled.input`
    border-radius: 12px;
    background: var(--neutral-neutral-15, rgba(255, 255, 255, 0.05));
    ::placeholder {
        color: rgba(255, 255, 255, 0.7); /* Lighter placeholder color */
    }
`;
