interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
}
interface ExpenseProps {
  expenseData: Expense[];
  removeExpense: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseProps> = ({
  expenseData,
  removeExpense,
}) => {
  return (
    <>
      {expenseData
        ? expenseData.map((expense) => {
            return (
              <table key={expense.id} className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{expense.description}</td>
                    <td>${expense.amount}.00</td>
                    <td>{expense.category}</td>
                    <td>
                      <button
                        className='btn btn-outline-danger'
                        onClick={() => removeExpense(expense.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <td className='fw-bold'>Total</td>
                    <td>
                      $
                      {expenseData
                        .reduce((acc, expense) => expense.amount + acc, 0)
                        .toFixed(2)}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            );
          })
        : null}
    </>
  );
};
