import React, { useState, useEffect } from 'react';
import BitcoinChart from './BitcoinChart';
import styles from './DatePicker.module.css'; // ייבוא קובץ ה-CSS

const DatePicker = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2024-01-01'); // תאריך התחלה ברירת מחדל
    const [endDate, setEndDate] = useState('2024-01-10');   // תאריך סיום ברירת מחדל

    useEffect(() => {
        if (startDate && endDate) {
            // קריאה ל-API עם התאריכים שנבחרו
            fetch(`http://localhost:5000/api/bitcoin?startDate=${startDate}&endDate=${endDate}`)
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [startDate, endDate]); // התעדכן כאשר התאריכים משתנים

    return (
        <div className={styles.container}>
            <h1>Bitcoin Price Viewer</h1>

            {/* טופס בחירת תאריכים */}
            <div className={styles.datePicker}>
                <label>
                    Start Date:
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                    />
                </label>
                <label>
                    End Date:
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={e => setEndDate(e.target.value)} 
                    />
                </label>
            </div>

            <BitcoinChart data={data} />
        </div>
    );
};

export default DatePicker;
