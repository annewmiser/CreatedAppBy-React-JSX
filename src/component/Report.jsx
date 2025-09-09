import { useContext } from "react";
import DataContext from "../Data/DataContext";

const Report = () => {
  // useContext multivalue
  const { income, expense } = useContext(DataContext);
  //function comma
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <div className="font-bold text-[20px] my-[5px]">
      <h4 className="text-2xl">ยอดคงเหลือ (บาท)</h4>
      <h1 className="text-4xl">
        {formatNumber((income - expense).toFixed(2))}
      </h1>

      <div className="flex justify-between bg-stone-200 p-[15px] my-[15px]">
        <div className="flex-1/2 text-center border-r-1 border-stone-500 ">
          <h4>รายได้ทั้งหมด</h4>
          <p className="text-green-600">{formatNumber(income.toFixed(2))}</p>
        </div>
        <div className="flex-1/2 text-center">
          <h4>รายจ่ายทั้งหมด</h4>
          <p className="text-red-500">{formatNumber(expense.toFixed(2))}</p>
        </div>
      </div>

      {/*  consumer multivalue
      <DataContext.Consumer>
        {(context) => (
          <p>
            รายรับ : {context.income} รายจ่าย : {context.expense}
          </p>
        )}
      </DataContext.Consumer>
       */}
    </div>
  );
};

export default Report;
