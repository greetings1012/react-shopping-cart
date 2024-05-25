import { RecoilRoot, useRecoilState } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { applyCouponModalState } from './applyCouponModalState';

describe('applyCouponModalState', () => {
  it('초기값이 제대로 설정되어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(applyCouponModalState), {
      wrapper: RecoilRoot,
    });

    const [value] = result.current;
    expect(value).toBe(false);
  });

  it('값을 설정할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(applyCouponModalState), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current[1](true);
    });

    const [value] = result.current;
    expect(value).toBe(true);
  });
});
