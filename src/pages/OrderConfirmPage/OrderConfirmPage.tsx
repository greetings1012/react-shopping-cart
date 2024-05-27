import { useEffect } from 'react';
import { Link, Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { createOrder } from '../../apis';
import ShowModalButton from '../../components/Button/ShowModalButton/ShowModalButton';
import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import CartItemContainer from '../../components/Container/CartItemContainer/CartItemContainer';
import TitleContainer from '../../components/Container/TitleContainer/TitleContainer';
import TotalPriceContainer from '../../components/Container/TotalPriceContainer/TotalPriceContainer';
import Header from '../../components/Header/Header';
import DeliveryInfoContainer from '../../components/List/DeliveryInfoList/DeliveryInfoList';
import { PATHS } from '../../constants/PATHS';
import { useCalculateTotalCouponDiscount } from '../../hooks/useCalculateCouponDiscount';
import { useCalculateDeliveryFee } from '../../hooks/useCalculateDeliveryFee';
import { useToggleModal } from '../../hooks/useToggleModal';
import ApplyCouponModal from '../../modals/ApplyCouponModal/ApplyCouponModal';
import { selectedCartItemListState } from '../../recoil/CartItem/atoms/selectedCartItemListState';
import { selectedCartItemListTotalCountSelector } from '../../recoil/CartItem/selectors/selectedCartItemListTotalCountSelector';
import { selectedCartItemListTotalPriceSelector } from '../../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { selectedCouponListState } from '../../recoil/Coupon/atoms/selectedCouponListState';
import { isCouponSelectedState } from '../../recoil/isCouponSelectedState/atoms/isCouponSelectedState';
import * as S from './OrderConfirmPage.style';

import type { Coupon } from '../../types/Coupon';
function OrderConfirmPage() {
  const couponList = useLoaderData() as Coupon[];

  // const selectedItemList = useRecoilValue(selectedCartItemListState);
  const [selectedItemList, setSelectedItemList] = useRecoilState(selectedCartItemListState);

  const setSelectedCouponList = useSetRecoilState(selectedCouponListState);

  const selectedCartItemTotalCount = useRecoilValue(selectedCartItemListTotalCountSelector);
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);

  const { selectedCouponTotalDiscount } = useCalculateTotalCouponDiscount();

  const { deliveryFee } = useCalculateDeliveryFee();

  const totalPrice = selectedCartItemTotalPrice + deliveryFee - selectedCouponTotalDiscount;

  const isOpen = useRecoilValue(isCouponSelectedState);
  const { openModal } = useToggleModal();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedCouponList([]);
  }, [setSelectedCouponList]);

  if (selectedItemList.length === 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

  const renderSelectedItemListSection = () => (
    <>
      {selectedItemList.map((el) => (
        <CartItemContainer key={el.id} item={el} />
      ))}
      <ShowModalButton content="쿠폰 적용" onClick={openModal} />
      <DeliveryInfoContainer />
      <TotalPriceContainer isOrderConfirmPage={true} />
    </>
  );
  const handleSubmitClick = async () => {
    try {
      await createOrder(selectedItemList.map((item) => item.id));
    } catch (error) {
      navigate('/error', { state: { errorType: 'CREATE_ORDER' } });
    }

    setSelectedItemList([]);

    window.localStorage.removeItem('selectedCartItemListState');
  };

  return (
    <>
      {isOpen && <ApplyCouponModal couponList={couponList} />}
      <Header />
      <S.Layout>
        <TitleContainer
          title="주문 확인"
          subTitle={`총 ${selectedItemList.length}종류의 상품 ${selectedCartItemTotalCount}개를 주문합니다. 최종 결제 금액을 확인해주세요.`}
        />
        {renderSelectedItemListSection()}
      </S.Layout>
      <Link
        to={PATHS.PAYMENT_CONFIRM}
        state={{
          typeCount: selectedItemList.length,
          quantityCount: selectedCartItemTotalCount,
          totalPrice: totalPrice,
        }}
      >
        <SubmitButton isActive={true} content="결제하기" onClick={handleSubmitClick} />
      </Link>
    </>
  );
}

export default OrderConfirmPage;
