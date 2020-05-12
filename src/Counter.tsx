import React, { FC, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { increase, IAppState, decrease, reset } from './store';
import { increaseAsyncStartAction } from './store/counter/actions';

export const Counter: FC = () => {
  const numberInputRef = useRef<HTMLInputElement>();

  const dispatch = useDispatch();

  const { count, calculating } = useSelector((state: IAppState) => state.counter, shallowEqual);

  return (
    <div>
      <div>
        <span>Counter: {count}</span>
        {calculating && <span>{' calculating...'}</span>}
      </div>
      <div>
        <button onClick={() => dispatch(increase(parseInt(numberInputRef.current.value)))}>
          Increase
        </button>
        <button onClick={() => dispatch(decrease(parseInt(numberInputRef.current.value)))}>
          Decrease
        </button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button
          onClick={() => dispatch(increaseAsyncStartAction(parseInt(numberInputRef.current.value)))}
        >
          Increase async
        </button>
        <input type="number" ref={numberInputRef} />
      </div>
    </div>
  );
};
