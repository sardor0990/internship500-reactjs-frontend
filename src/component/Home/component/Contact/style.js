import styled from "styled-components";

export const CardBackground = styled.div`
    border-radius: 80px;
    border: 1px solid rgba(255, 255, 255, 0.40);
    background: radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02);
    box-shadow: 2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset;
`;

export const InputBackground = styled.input`
    border-radius: 12px;
    background: var(--neutral-neutral-15, rgba(255, 255, 255, 0.05));
    ::placeholder {
        color: rgba(255, 255, 255, 0.7); /* Lighter placeholder color */
    }
`;


export const TextAreaBackground = styled.textarea`
    border-radius: 12px;
    background: var(--neutral-neutral-15, rgba(255, 255, 255, 0.05));
    ::placeholder {
        color: rgba(255, 255, 255, 0.7); /* Lighter placeholder color */
    }
    height: 120px;
    max-height: 120px;
    resize: none;
`;