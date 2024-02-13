import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ExpenseList } from "./ExpenseList";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const schema = z.object({
  // figure out how to establish an id
  id: z.number(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." }),
  amount: z.number({ invalid_type_error: "Amount field is required." }).min(1),
  category: z.string().min(1, { message: "Selecting a category is required." }),
});

type FormData = z.infer<typeof schema>;

export const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [expenseListData, setExpenseListData] = useState<FieldValues[]>([]);

  const onSubmit = (data: FieldValues, id: number) => {
    const initialIdValue = 0;
    const counter = initialIdValue + 1;
    setExpenseListData((prevState) => [data, ...prevState]);
    console.log(data);
    console.log(counter);
    console.log(id);
    // figure out how to clear the input
    // data = {
    //     description: '',
    //     amount: 0,
    //     category: '',
    // }
  };

  //   remove expense item
  const removeExpense = (id: number) => {
    const removeExpenseData = expenseListData.filter((item) => item.id !== id);
    setExpenseListData(removeExpenseData);
    console.log(removeExpenseData);
  };

  return (
    <>
      <form
        className='mb-5'
        onSubmit={handleSubmit((data) => onSubmit(data, data.id))}>
        <div className='mb-4 w-100'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            {...register("description")}
            id='description'
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
            id='amount'
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
            id='category'
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
        <button className='btn btn-primary'>Submit</button>
      </form>
      <ExpenseList
        expenseData={expenseListData}
        removeExpense={removeExpense}
      />
    </>
  );
};
