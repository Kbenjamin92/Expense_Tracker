import { FieldValues } from "react-hook-form";

interface ExpenseProps {
  expenseData: FieldValues[];
  removeExpense: (expenseDataId: number) => void;
}

export const ExpenseList: React.FC<ExpenseProps> = ({
  expenseData,
  removeExpense,
}) => {
  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      {expenseData.length ? (
        expenseData.map((item) => {
          return (
            <tbody key={item.id}>
              <tr>
                <td>{item.description}</td>
                <td>${item.amount}.00</td>
                <td>{item.category}</td>
                <td>
                  <button
                    className='btn btn-outline-danger'
                    onClick={() => removeExpense(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })
      ) : (
        <tbody>
          <tr>No Data Yet.</tr>
        </tbody>
      )}
    </table>
  );
};
