import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchOrdersAsync, selectEntities, selectLoading } from './orderSlice';
import Table from './Table';

interface OrdersData {
  order_number: number;
  customer_name: string;
  customer_address: string;
  order_value: number;
  order_date: Date;
  ship_date: Date;
  status: string;
}

export function Order() {
  const orders = useAppSelector(selectEntities);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const [modifiedList, setModifiedList] = useState<OrdersData[]>([]);

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, []);

  useEffect(() => {
    if (orders) {
      const list: any = orders.map((item) => ({
        order_number: item.order_number,
        customer_name: `${item.customer.last_name}, ${item.customer.first_name}`,
        customer_address: item.customer.address.line1,
        order_value: item.order_details.value,
        order_date: item.order_details.date,
        ship_date: item.shipping_details.date,
        status: item.status,
    }));
    setModifiedList(list);
    }
  }, [orders])

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={10} style={{marginTop: 30}}>
          <Table data={modifiedList} />
        </Grid>
      </Grid>
    </>
  );
}
