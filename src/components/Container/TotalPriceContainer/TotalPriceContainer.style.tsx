import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

export const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  p {
    padding-top: 2px;
  }
`;

export const PriceDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 15px 0px;
  border-top: 1px solid ${({ theme }) => theme.color.primary.light};
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.light};
`;
