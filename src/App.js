import React, { useState } from 'react';
import BitcoinChart from './components/BitcoinChart';
import DatePicker from './components/DatePicker';

const App = () => {
    const [data, setData] = useState([]);

    const fetchData = async (startDate, endDate) => {
        const response = await fetch(`/api/bitcoin?startDate=${startDate}&endDate=${endDate}`);
        const result = await response.json();
        setData(result);
    };

    return (
        <div>
            <h1>Bitcoin Price Viewer</h1>
            <DatePicker onFetch={fetchData} />
            <BitcoinChart data={data} />
        </div>
    );
};

export default App;
