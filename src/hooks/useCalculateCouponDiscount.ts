import { useRecoilState, useRecoilValue } from 'recoil';

import { DiscountTypes } from '../constants/DiscountType';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/selectedCartItemListState';
import { selectedCartItemListTotalPriceSelector } from '../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { selectedCouponListState } from '../recoil/Coupon/atoms/selectedCouponListState';
import { selectedCouponTotalDiscountState } from '../recoil/Coupon/atoms/selectedCouponTotalDiscountState';
import { deliveryFeeState } from '../recoil/DeliveryFee/atoms/deliveryFeeState';

import type { Coupon } from '../types/Coupon';
export function useCalculateCouponDiscount() {
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);

  const calculateCouponDiscount = (currentTotalPrice: number, coupon: Coupon) => {
    switch (coupon.discountType) {
      case DiscountTypes.fixed: {
        return coupon.discount!;
      }
      case DiscountTypes.buyXgetY: {
        const x = coupon.buyQuantity!;
        const y = coupon.getQuantity!;
        const eligibleItems = selectedCartItemList.filter((item) => item.quantity >= x + y);
        const mostExpensiveItem = eligibleItems.reduce(
          (maxItem, item) => (item.product.price > maxItem.product.price ? item : maxItem),
          eligibleItems[0],
        );
        return mostExpensiveItem.product.price * y;
      }
      case DiscountTypes.freeShipping: {
        return deliveryFee;
      }
      case DiscountTypes.percentage: {
        return Math.round(currentTotalPrice * (coupon.discount! * 0.01));
      }
      default: {
        return 0;
      }
    }
  };

  return { calculateCouponDiscount };
}

export function useCalculateTotalCouponDiscount() {
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
  const { calculateCouponDiscount } = useCalculateCouponDiscount();
  const [selectedCouponTotalDiscount, setSelectedCouponTotalDiscount] = useRecoilState(
    selectedCouponTotalDiscountState,
  );
  const selectedCouponList = useRecoilValue(selectedCouponListState);

  const calculateTotalCouponDiscount = () => {
    const bogoCoupons = selectedCouponList.filter((coupon) => coupon.discountType === DiscountTypes.buyXgetY);
    const bogoDiscountedPrice = bogoCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, selectedCartItemTotalPrice);

    const percentageCoupons = selectedCouponList.filter((coupon) => coupon.discountType === DiscountTypes.percentage);
    percentageCoupons.sort((a, b) => b.discount! - a.discount!);
    const percentageDiscountedPrice = percentageCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, bogoDiscountedPrice);

    const fixedCoupons = selectedCouponList.filter(
      (coupon) => coupon.discountType !== DiscountTypes.percentage && coupon.discountType !== DiscountTypes.buyXgetY,
    );
    const totalDiscountedPrice = fixedCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, percentageDiscountedPrice);

    const totalCouponDiscount = selectedCartItemTotalPrice - totalDiscountedPrice;
    setSelectedCouponTotalDiscount(totalCouponDiscount);
  };

  return { selectedCouponTotalDiscount, calculateTotalCouponDiscount };
}
