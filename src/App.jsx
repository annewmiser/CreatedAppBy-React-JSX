import { useState } from "react";
import { useEffect } from "react";
// import { useReducer } from "react";
// Link
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form from "./component/Form.jsx";
import Transection from "./component/transection.jsx";
import DataContext from "./Data/DataContext.jsx";
import Report from "./component/Report.jsx";

import "./App.css";

// reducer state แยก logic ออกจาก UI เป็น pure function
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SHOW":
//       return true;
//     case "HIDE":
//       return false;
//     default:
//       return state;
//   }
// };

function App() {
  const styleLi =
    "mx-[0.5rem] relative  after:content-[''] after:absolute after:w-0 hover:after:w-full after:transition-all after:duration-300 after:h-[4px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-red-400";
  const initData = [
    { id: 1, title: "ค่าเช่าบ้าน", amount: -3000 },
    { id: 2, title: "เงินเดือน", amount: 50000 },
  ];

  //สร้าง State มีค่าเป็น arr ว่าง เพื่อรอรับ prop จาก Form
  const [items, setItem] = useState(initData);
  //State คำนวณรายรับ - รายจ่าย
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  //ใช้ useEffect เพื่อคำนวน amount
  useEffect(() => {
    const amounts = items.map((item) => item.amount);
    const income = amounts
      .filter((ele) => ele > 0)
      .reduce((total, ele) => (total += ele), 0);

    const expense =
      amounts
        .filter((ele) => ele < 0)
        .reduce((total, ele) => (total += ele), 0) * -1;

    setReportIncome(income);
    setReportExpense(expense);
  }, [items, reportIncome, reportExpense]);

  // handleAddItem รับ prop จาก Form ผ่าน onAddItem เมื่อกด Submit
  //สร้างตัวแปล เพื่อส่ง prop ไปแสดงผลที่ Transection
  const handleAddItem = (item) => {
    console.log(item);
    setItem((prevItems) => [item, ...prevItems]);
  };

  // useReducer รบค่าจาก function reducer และกำหนดค่าเริ่มต้นเป็น false
  // const [showReport, dispatch] = useReducer(reducer, false);
  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="w-[500px] mx-auto mt-[2rem] h-screen">
        <h1 className="text-center text-3xl font-bold text-red-500 my-[1rem]">
          แอพรายรับ-รายจ่าย
        </h1>

        <Router>
          <nav>
            <ul className="flex justify-center bg-gray-700 text-white p-[1rem]">
              <li className={styleLi}>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li className={styleLi}>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<Report />}></Route>
              <Route
                path="/insert"
                element={
                  <>
                    <Form onAddItem={handleAddItem} />
                    <Transection items={items} />{" "}
                  </>
                }
              ></Route>
            </Routes>
          </nav>
        </Router>

        {/* Report component จะแสดงก็ต่อเมื่อ showreport เป้ร true */}
        {/* {showReport && <Report />} */}
        {/* <Report /> */}
        {/* ส่ง prop handleAddItem ไปให้ Form  */}
        {/* <Form onAddItem={handleAddItem} /> */}
        {/* ส่ง prop items จาก State ไปให้ Transection เพื่อแสดงผล*/}
        {/* <Transection items={items} /> */}

        {/* dispatch ส่งค่า type  */}
        {/* <div className="flex justify-center my-[1rem]">
          <button
            onClick={() => dispatch({ type: "SHOW" })}
            className="mx-[0.5rem] bg-green-500 px-[0.5rem]"
          >
            แสดง
          </button>
          <button
            onClick={() => dispatch({ type: "HIDE" })}
            className="mx-[0.5rem] bg-red-400 px-[0.5rem]"
          >
            ซ่อน
          </button>
        </div> */}
      </div>
    </DataContext.Provider>
  );
}

export default App;
