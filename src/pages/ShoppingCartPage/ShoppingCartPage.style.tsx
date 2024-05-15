import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 36px;
  padding: 36px 24px;
  margin-bottom: 64px;
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const SelectAllButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;

  p {
    font-size: 12px;
  }
`;
