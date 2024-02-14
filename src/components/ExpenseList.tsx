interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
interface ExpenseProps {
  expenseData: Expense[];
  removeExpense: (id: number) => void;
}

export const ExpenseList: React.FC<ExpenseProps> = ({
  expenseData,
  removeExpense,
}) => {
  return (
    <>
      {expenseData.length !== 0 ? (
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          {expenseData
            ? expenseData.map((expense, index) => {
                return (
                  <>
                    <tbody key={index}>
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
                    {/* <tfoot>
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
                    </tfoot> */}
                  </>
                );
              })
            : null}
        </table>
      ) : null}
    </>
  );
};
