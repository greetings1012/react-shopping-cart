import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { selectedCartItemListState } from './selectedCartItemListState';
import { cartItemListMockData } from '../../../../data/cartItemListMockData';

describe('selectedCartItemListState', () => {
  it('초기 배열은 빈 배열이다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItemListState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0].length).toBe(0);
  });

  it('배열에 데이터를 삽입할 수 있다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItemListState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](cartItemListMockData));

    expect(result.current[0].length).toBe(5);
  });
});
