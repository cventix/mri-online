import React from 'react';
import { getComparator, stableSort } from './Table';
import { mockDataUnsorted, mockDataAscSorted, mockDataDescSorted } from './mock-data';
import { IOrder } from './orderSlice';

describe('Sorting', () => {
  it('Array should be sortedby order_number', () => {
    const sortedByAsc = stableSort<IOrder>(mockDataUnsorted, getComparator('asc', 'order_number'));
    const sortedByDesc = stableSort<IOrder>(
      mockDataUnsorted,
      getComparator('desc', 'order_number')
    );

    expect(sortedByAsc).toEqual(mockDataAscSorted);
    expect(sortedByDesc).toEqual(mockDataDescSorted);
  });
});
