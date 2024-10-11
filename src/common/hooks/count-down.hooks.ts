import { useEffect, useState, useRef } from "react";

export const useCountdown = (start: number, end: number, key: string) => {
   const [timeLeft, setTimeLeft] = useState(0);
   const intervalRef = useRef<NodeJS.Timeout | null>(null);

   // Hàm start countdown, được gọi khi nhấn nút bắt đầu
   const startCountdown = () => {
      const storedEndTime = localStorage.getItem(key);

      if (!storedEndTime) {
         const endTime = Date.now() + start * 1000;
         localStorage.setItem(key, `${endTime}`);
      }

      // Hiển thị ngay giá trị bắt đầu
      const endTime = localStorage.getItem(key);
      const initialTimeLeft = Math.max(0, Math.floor((Number(endTime) - Date.now()) / 1000));
      setTimeLeft(initialTimeLeft); // Cập nhật ngay khi nhấn nút

      // Thiết lập interval chỉ nếu chưa có
      if (!intervalRef.current) {
         intervalRef.current = setInterval(() => {
            const endTime = localStorage.getItem(key);
            const timeLeft = Math.max(0, Math.floor((Number(endTime) - Date.now()) / 1000));

            setTimeLeft(timeLeft);

            if (timeLeft <= end) {
               clearInterval(intervalRef.current || 0);
               intervalRef.current = null;
               localStorage.removeItem(key); // Xoá khi hoàn thành
            }
         }, 1000);
      }
   };

   // Lấy thời gian kết thúc từ localStorage khi component mount
   useEffect(() => {
      const storedEndTime = localStorage.getItem(key);
      if (storedEndTime) {
         const timeLeft = Math.max(0, Math.floor((Number(storedEndTime) - Date.now()) / 1000));
         setTimeLeft(timeLeft);

         // Nếu vẫn còn thời gian thì tiếp tục đếm ngược
         if (timeLeft > end) {
            startCountdown();
         } else {
            localStorage.removeItem(key);
         }
      }
   }, []);

   // Hàm dọn dẹp khi component unmount
   useEffect(() => {
      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
      };
   }, []);

   return { timeLeft, startCountdown };
};
