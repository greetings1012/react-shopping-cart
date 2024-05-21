import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  p {
    text-align: center;
  }
`;

export const QuantityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.primary.light};

  img {
    width: 12px;
    height: 12px;
  }
`;
