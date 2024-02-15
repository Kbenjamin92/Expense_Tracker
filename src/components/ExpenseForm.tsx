import { useState } from "react";
import { useForm } from "react-hook-form";
import { ExpenseList } from "./ExpenseList";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import nextId from "react-id-generator";

const schema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." }),
  amount: z.number({ invalid_type_error: "Amount field is required." }).min(1),
  category: z.string().min(1, { message: "Selecting a category is required." }),
});

type FormData = z.infer<typeof schema>;

export const ExpenseForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const htmlId = nextId();

  const [expenses, setExpenses] = useState<FormData[]>([
    { id: "1", description: "Electric", amount: 20, category: "Utility" },
    // { id: 2, description: "Water Bill", amount: 20, category: "Utility" },
    // { id: 3, description: "Heat", amount: 20, category: "Utility" },
    // { id: 4, description: "Gas", amount: 20, category: "Utility" },
  ]);

  const onHandleSubmit = (data: FormData) => {
    console.log(data);
    console.log(htmlId);
    // setExpenses([...expenses, { ...data, id: htmlId }]);
    // console.log(data, expenses);
    // console.log(htmlId);
  };

  //   remove expense item
  const removeExpense = (id: string) => {
    const removeExpenseData = expenses.filter((item) => item.id !== id);
    setExpenses(removeExpenseData);
    console.log(id);
  };

  return (
    <>
      <form
        className='mb-5'
        onSubmit={handleSubmit((data) => onHandleSubmit(data))}>
        <div className='mb-4 w-100'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            {...register("description")}
            name='description'
            type='text'
            className='form-control'
          />
          {errors.description && (
            <p className='text-danger'>{errors.description.message}</p>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='Amount' className='form-label'>
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            name='amount'
            type='number'
            className='form-control'
          />
          {errors.amount && (
            <p className='text-danger'>{errors.amount.message}</p>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='Category' className='form-label'>
            Category
          </label>
          <select
            {...register("category")}
            name='category'
            className='form-control'>
            <option id='default'></option>
            <option id='All categories'>All categories</option>
            <option id='Groceries'>Groceries</option>
            <option id='Utility'>Utility</option>
            <option id='Entertainment'>Entertainment</option>
          </select>
          {errors.amount && (
            <p className='text-danger'>{errors.category?.message}</p>
          )}
        </div>
        <input className='btn btn-primary' type='submit' />
      </form>
      <ExpenseList expenseData={expenses} removeExpense={removeExpense} />
    </>
  );
};
