type Props = {
  acc_name: string;
  acc_type: string;
  acc_num: string | number;
};

const PaymentMethodData = ({ acc_name, acc_type, acc_num }: Props) => {
  return (
    <tr>
      <td>{acc_name}</td>
      <td>{acc_type}</td>
      <td>{acc_num}</td>
    </tr>
  );
};

export default PaymentMethodData;
