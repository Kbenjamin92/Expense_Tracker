import "./App.css";
import { ExpenseForm } from "./components/ExpenseForm";

function App() {
  return (
    <>
      <div>
        <h1 className='mb-5 fs-1'>Expense Tracker</h1>
      </div>
      <ExpenseForm />
    </>
  );
}

export default App;
