import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { PATHS } from '../../constants/PATHS';
import * as S from './ErrorPage.style';
import { CART_ITEM_ERROR_MESSAGE } from '../../constants/MESSAGES';
import { TErrorType } from './Error.type';

const ErrorPage = () => {
  const location = useLocation();
  const errorType = (location.state?.errorType as TErrorType) || 'UNKNOWN';

  const errorMessage = CART_ITEM_ERROR_MESSAGE[errorType];
  return (
    <>
      <Header />
      <S.Main>
        <S.ErrorTextContainer>
          <h1>ERROR</h1>
          <h2>{errorMessage}</h2>
          <p>
            페이지의 주소가 잘못 입력되었거나,
            <br />
            주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없거나,
            <br />
            서버와의 연결 상태가 좋지 않습니다.
          </p>
        </S.ErrorTextContainer>
        <Link to={PATHS.ROOT}>
          <S.ConfirmButton>메인으로</S.ConfirmButton>
        </Link>
      </S.Main>
    </>
  );
};

export default ErrorPage;
