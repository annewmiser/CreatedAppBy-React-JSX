import { useState, useEffect } from "react";

// Form รับค่า prop handleAddItem ผ่าน onAddItem
const Form = ({ onAddItem }) => {
  const Stylelable = "block my-[10px]";
  const Styleinput =
    "w-full border-1 border-stone-400 focus:outline-none px-[0.5rem] py-[0.5em] rounded-sm";
  // สร้าง State เพื่อรับค่าจาก input เมื่อกดปุ่ม เพิ่มข้อมูล
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  // สร้าง state เพื่อใช่้ในการตรวจสอบค่า และสั่ง เปิดปิด ปุ่ม
  const [formValid, setFormValid] = useState(false);

  // สร้าง function handleSubmit เพื่อรับค่าจาก State title,amount
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
    };
    //ส่ง objet newItem เป็น argument ส่งผ่าน prop onAddItem ไปให้ App.jsx
    onAddItem(newItem);
    setTitle("");
    setAmount(0);
  };

  // การใช้งาาน useEfftect สร้างตัวแปลเก็บค่าที่ต้องการและ ตรวจสอบเงื่อนไข
  useEffect(() => {
    const checkData = title.trim().length > 0 && amount !== 0;
    if (checkData) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [title, amount]);

  return (
    <div className="w-[500px] mx-auto">
      <div>
        {/* ส้งข้อมูล ไปให้ function handleSubmit ทำงาน */}
        <form onSubmit={handleSubmit}>
          <label className={Stylelable}>ชื่อรายการ</label>
          <input
            type="text"
            placeholder="ระบุชื่อรายการของคุณ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={Styleinput}
          />

          <label className={Stylelable}>จำนวนเงิน</label>
          <input
            type="text"
            placeholder="รายจ่าย(-),รายรับ(+)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={Styleinput}
          />

          <button
            type="submit"
            className="my-[10px] block w-full py-[0.5rem] bg-violet-600 text-white rounded-sm shadow-2xl hover:bg-white hover:text-black cursor-pointer"
            // เปิด ปิดปุ่มตามเงื่อนไข
            disabled={!formValid}
          >
            เพิ่มข้อมูล
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
