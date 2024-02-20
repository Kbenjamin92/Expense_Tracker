import { useState } from "react";
import { useForm } from "react-hook-form";
import { ExpenseList } from "./ExpenseList";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import nextId from "react-id-generator";

// model for form validation
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
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const id = nextId();

  const [expenses, setExpenses] = useState<FormData[]>([]);
  const [filterCategory, setFilterCategory] = useState<FormData[]>([]);
  const [categoryValues, setCategoryValues] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // submit form
  const onHandleSubmit = (data: FormData) => {
    setExpenses([data, ...expenses]);
    reset();
  };

  //   remove expense and filtered items
  const removeExpense = (id: string) => {
    const removeExpenseData = expenses.filter((item) => item.id !== id);
    setExpenses(removeExpenseData);
    const removeDataFromFilterCategory = filterCategory.filter(
      (item) => item.id !== id
    );
    setFilterCategory(removeDataFromFilterCategory);
  };

  // Open and close the category
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  // filter list based on the category
  const filterListByCategory = (category: string) => {
    const filteredList = expenses.filter(
      (categoryItem) => categoryItem.category === category
    );
    setCategoryValues(category);
    setFilterCategory(filteredList);
    if (category === "All Categories") {
      handleCloseModal();
    } else {
      expenses.every((categoryItem) => categoryItem.category !== category) &&
        handleOpenModal();
    }
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
            className='form-select'>
            <option id='default'></option>
            <option id='Groceries'>Groceries</option>
            <option id='Utility'>Utility</option>
            <option id='Entertainment'>Entertainment</option>
          </select>
          {errors.amount && (
            <p className='text-danger'>{errors.category?.message}</p>
          )}
        </div>
        <input {...register("id")} name={id} type='hidden' value={id} />
        <input className='btn btn-primary' type='submit' />
      </form>
      <ExpenseList
        expenseData={expenses}
        removeExpense={removeExpense}
        filterListByCategory={filterListByCategory}
        filterCategory={filterCategory}
        categoryValues={categoryValues}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
