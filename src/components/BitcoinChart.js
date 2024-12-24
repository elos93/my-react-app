import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController } from 'chart.js';

// רישום כל הרכיבים הדרושים, כולל PointElement
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,  // רישום האלמנט PointElement
  Title,
  Tooltip,
  Legend,
  LineController // רישום ה-controller עבור גרף קו
);

const BitcoinChart = ({ data = [] }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            // אם יש גרף קיים, נמחק אותו
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // יצירת גרף חדש
            const chartData = {
                labels: data.map(item => item.date),
                datasets: [
                    {
                        label: 'Bitcoin Price (USD)',
                        data: data.map(item => item.value),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        fill: true,
                    },
                ],
            };

            const options = {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price (USD)',
                        },
                    },
                },
            };

            // יצירת גרף חדש
            chartInstanceRef.current = new ChartJS(chartRef.current, {
                type: 'line',
                data: chartData,
                options: options,
            });
        }

        // מחזירים פונקציה לנקות את הגרף כאשר רכיב לא פעיל
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]); // התעדכן מחדש כאשר הנתונים משתנים

    if (!data || !data.length) {
        return <p>No data available for the selected dates.</p>;
    }

    return <canvas ref={chartRef} />;
};

export default BitcoinChart;
