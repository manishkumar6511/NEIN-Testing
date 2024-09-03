import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BranchChart = () => {
  const navigate = useNavigate();

  // Static data
  const branchData = [
    { branchName: 'Branch 1', totalEntries: 100, pendingEntries: 30, completedEntries: 70 },
    { branchName: 'Branch 2', totalEntries: 120, pendingEntries: 20, completedEntries: 100 },
    { branchName: 'Branch 3', totalEntries: 90, pendingEntries: 40, completedEntries: 50 },
    { branchName: 'Branch 4', totalEntries: 80, pendingEntries: 25, completedEntries: 55 },
    { branchName: 'Branch 5', totalEntries: 110, pendingEntries: 10, completedEntries: 100 },
    { branchName: 'Branch 6', totalEntries: 130, pendingEntries: 60, completedEntries: 70 },
    { branchName: 'Branch 7', totalEntries: 95, pendingEntries: 15, completedEntries: 80 },
    { branchName: 'Branch 8', totalEntries: 105, pendingEntries: 35, completedEntries: 70 },
  ];

  // Prepare chart data
  const labels = branchData.map(item => item.branchName);
  const totalEntries = branchData.map(item => item.totalEntries);
  const pendingEntries = branchData.map(item => item.pendingEntries);
  const completedEntries = branchData.map(item => item.completedEntries);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Entries',
        data: totalEntries,
        backgroundColor: '#8EC400',
      },
      {
        label: 'Pending Entries',
        data: pendingEntries,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Completed Entries',
        data: completedEntries,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const handleBarClick = (elems) => {
    if (elems.length > 0) {
      const datasetIndex = elems[0].datasetIndex;
      const index = elems[0].index;
      const branchName = labels[index];

      if (datasetIndex === 1) { // Clicked on Pending Entries
        navigate(`/Operation/Pending`, { state: { type: 'Air Export' } });
      } else if (datasetIndex === 2) { // Clicked on Completed Entries
        navigate(`/ViewEdit`);
      }
    }
  };

  return (
    <div style={{ width: '1106px', height: '500px' }}>
      <Bar
        data={chartData}
        options={{
          onClick: (evt, elems) => handleBarClick(elems),
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Branch Entries Overview',
            },
          },
        }}
      />
    </div>
  );
};

export default BranchChart;
