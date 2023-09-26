import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentStatus = ()=> {
  const params = useParams();
  const { collection_id, collection_status, payment_id, status } = params;

  console.log('collection_id:', collection_id);
  console.log('collection_status:', collection_status);
  console.log('payment_id:', payment_id);
  console.log('status:', status);
  status?
  console.log('status:', status)
  : console.log('status:', status);

  return (
    <div>
        <h2>Pago Confirmado</h2>
    </div>
  );
}

export default PaymentStatus;
