import { selectorFamily } from 'recoil';

import { selectedDeliveryInfoListState } from '../atoms/selectedDeliveryInfoListState';

import type { DeliveryInfo } from '../../../types/DeliveryInfo';

export const selectedDeliveryInfoListSelector = selectorFamily<boolean, DeliveryInfo>({
  key: 'selectedDeliveryInfoListSelector',
  get:
    (newItem: DeliveryInfo) =>
    ({ get }) => {
      const selectedDeliveryInfoList = get(selectedDeliveryInfoListState);
      return selectedDeliveryInfoList.some((item) => item.title === newItem.title);
    },
  set:
    (newItem: DeliveryInfo) =>
    ({ set, get }) => {
      const selectedDeliveryInfoList = get(selectedDeliveryInfoListState);
      if (!selectedDeliveryInfoList.some((item) => item.title === newItem.title)) {
        set(selectedDeliveryInfoListState, [...selectedDeliveryInfoList, newItem]);
      } else {
        set(
          selectedDeliveryInfoListState,
          selectedDeliveryInfoList.filter((item) => item.title !== newItem.title),
        );
      }
    },
});
