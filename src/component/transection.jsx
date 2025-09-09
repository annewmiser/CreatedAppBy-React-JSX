// เรียกใช้ DataContext
import DataContext from "../Data/DataContext";
// เรียกใช้งาน useContext
import { useContext } from "react";

//  รับ prop items จาก State ของ App.jsx มีค่าเป็น array
const Transection = ({ items }) => {
  // const { income, expense } = useContext(DataContext);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <div className="mt-[2rem]">
      <h2 className="text-xl font-semibold mb-[1rem] text-center">
        ประวัติรายการ
      </h2>
      <ul>
        {/* condition ตรวจสอบค่าที่ส่งมาแสดงผล */}
        {items.length === 0 ? (
          <p className="text-center text-gray-500">ไม่มีข้อมูล</p>
        ) : (
          items.map((item) => (
            <li
              // รับ key
              key={item.id}
              className="flex justify-between border-b py-2 text-lg"
            >
              {/* แสดงผล item ที่ map array แล้ว */}
              <span>{item.title}</span>
              <span
                // conditon จำแนกประเภท ค่า item
                className={item.amount < 0 ? "text-red-500" : "text-green-600"}
              >
                {/* condition แสดงเครื่องหมายตาม item.amount */}
                {item.amount < 0 ? "-" : "+"}
                {formatNumber(Math.abs(item.amount).toFixed(2))} บาท
              </span>
              {/* {name} */}
            </li>
          ))
        )}
      </ul>
      {/*เรียกใช้แบบ consumer <DataContext.Consumer>{(value) => <p>{value}</p>}</DataContext.Consumer> */}

      {/* <p>รายรับ :{income}</p>
      <p>รายรับ :{expense}</p> */}
    </div>
  );
};

export default Transection;
