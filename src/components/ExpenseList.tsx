import { useForm } from "react-hook-form";
interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
}
interface ExpenseProps {
  expenseData: Expense[];
  removeExpense: (id: string) => void;
  filterListByCategory: (category: string) => void;
  filterCategory: Expense[];
  categoryValues: string;
}

export const ExpenseList: React.FC<ExpenseProps> = ({
  expenseData,
  removeExpense,
  filterListByCategory,
  filterCategory,
  categoryValues,
}) => {
  const { register } = useForm();
  return (
    <>
      {expenseData.length !== 0 ? (
        <>
          <div className='mb-4'>
            <label htmlFor='Filter' className='form-label'>
              Filter List by Category
            </label>
            <select
              {...(register("filter"),
              {
                onChange: (e) => filterListByCategory(e.target.value),
              })}
              name='filter'
              className='form-select'>
              <option
                id='All categories'
                value='All Categories'
                defaultValue='All Categories'>
                All Categories
              </option>
              <option id='Groceries' value='Groceries'>
                Groceries
              </option>
              <option id='Utility' value='Utility'>
                Utility
              </option>
              <option id='Entertainment' value='Entertainment'>
                Entertainment
              </option>
            </select>
          </div>

          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            {filterCategory.length !== 0 ? (
              filterCategory.map((expense) => {
                return (
                  <tbody key={expense.id}>
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
                );
              })
            ) : expenseData && categoryValues === "All Categories" ? (
              expenseData.map((expense) => {
                return (
                  <tbody key={expense.id}>
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
                );
              })
            ) : expenseData.every(
                (expense) => expense.category !== categoryValues
              ) ? (
              <>
                <p>There is no entry with the category name {categoryValues}</p>
              </>
            ) : null}
            <tfoot>
              <tr>
                <td className='fw-bold'>Total</td>
                <td>
                  $
                  {filterCategory.length !== 0
                    ? filterCategory
                        .reduce((acc, expense) => expense.amount + acc, 0)
                        .toFixed(2)
                    : expenseData
                        .reduce((acc, expense) => expense.amount + acc, 0)
                        .toFixed(2)}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </>
      ) : null}
    </>
  );
};
