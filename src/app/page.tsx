'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hello');
        setData(response.data);
      } catch (error : any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>DATA112224443: {data}</h1>
    </div>
  );
};

export default DataFetcher;
