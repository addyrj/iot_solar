export const medianChartOption = {
    series: [67],
    options: {
        chart: {
            height: 350,
            type: "radialBar",
            offsetY: -10,
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: "16px",
                        color: undefined,
                        offsetY: 120,
                    },
                    value: {
                        offsetY: 76,
                        fontSize: "22px",
                        color: undefined,
                        formatter: function (val) {
                            return val + "%";
                        },
                    },
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91],
            },
        },
        stroke: {
            dashArray: 4,
        },
        labels: ["Median Ratio"],
    },
};

export const chartOptionList = [
    {
        id: 1,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 2,
        path: "src/images/charts/chart2.png",
        title: "Gradient Circle Chart",
    },
    {
        id: 3,
        path: "src/images/charts/chart3.png",
        title: "Strocked Chart",
    },
    {
        id: 4,
        path: "src/images/charts/chart4.png",
        title: "Semi Circle Chart",
    },
    {
        id: 5,
        path: "src/images/charts/chart5.png",
        title: "Semi Circle Chart",
    },
    {
        id: 6,
        path: "src/images/charts/chart6.png",
        title: "Radia Chart",
    },
    {
        id: 7,
        path: "src/images/charts/chart7.png",
        title: "Pie Chart",
    },
    {
        id: 8,
        path: "src/images/charts/chart8.png",
        title: "Filled Cicle Chart",
    },
];

export const canvasChatOption = (data, chartData) => {
    let option;
    option = {
        series: [
            {
                type: "gauge",
                  min: 0, // starting point
                max: 40, 
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [
                            [0.3, "#ff9920"],
                            [0.7, "#51ce8a"],
                            [1, "#fc696a"],
                        ],
                    },
                },
                pointer: {
                    itemStyle: {
                        color: "auto",
                    },
                },

                splitLine: {
                    distance: -75,
                    length: 20,
                    lineStyle: {
                        color: "#fff",
                        width: 0,
                    },
                },
                axisLabel: {
                    color: "inherit",
                    distance: 40,
                    fontSize: 10,
                },
                detail: {
                    valueAnimation: true,
                    formatter: `{value} ${chartData.id === 1
                        ? 'V'
                        : chartData.id === 2
                            ? 'A'
                            : chartData.id === 3
                                ? 'W'
                                : chartData.id === 4
                                    ? 'C'
                                    : chartData.id === 5
                                        ? 'V'
                                        : chartData.id === 6
                                            ? 'A'
                                            : chartData.id === 7
                                                ? 'V'
                                                : chartData.id === 8
                                                    ? 'A'
                                                    : ""}`,
                    fontSize: 15,
                    color: "inherit",
                    offsetCenter: [0, "75%"],
                },
                data: [
                    {
                        value:
                            chartData.id === 1
                                ? data[0]?.PvVolt / 1
                                : chartData.id === 2
                                    ? data[0]?.PvCur / 1
                                    : chartData.id === 3
                                        ? data[0]?.PVKWh / 1
                                        : chartData.id === 4
                                            ? data[0]?.Temperature / 1
                                            : chartData.id === 5
                                                ? data[0]?.BatVoltage / 1
                                                : chartData.id === 6
                                                    ? data[0]?.BatCurrent / 1
                                                    : chartData.id === 7
                                                        ? data[0]?.LoadVoltage / 1
                                                        : chartData.id === 8
                                                            ? data[0]?.LoadCurrent / 1
                                                            : "",
                        fontSize: 10,
                    },
                ],
            },
        ],
    };
    return option;
};

export const chrtListOpt2 = [
    {
        id: 1,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 2,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 3,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 4,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 5,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 6,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 7,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 8,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
];

export const sourcerChartOption = (filterData, selectDate, seriesState) => {
    let graphData = [];
    let startTime = "";
    let endTime = "";

    if (filterData.length !== 0) {
        if (seriesState) {
            const { pvVoltage, pvCurrent, bVoltage, bCurrent, lVoltage, lCurrent, temp } = seriesState;
            if (pvVoltage === true) {
                graphData = filterData.map((item) => {
                    return [new Date(item.RecordTime).getTime(), item.PvVolt / 1]
                });
            } else if (pvCurrent === true) {
                graphData = filterData.map((item) => {
                    return [new Date(item.RecordTime).getTime(), item.PvCur / 1]
                });
            } else if (bVoltage === true) {
                graphData = filterData.map((item) => {
                    return [new Date(item.RecordTime).getTime(), item.BatVoltage / 1]
                });
            } else if (bCurrent === true) {
                graphData = filterData.map((item) => {
                    return [new Date(item.RecordTime).getTime(), item.BatCurrent / 1]
                });
            } else if (lVoltage === true) {
                graphData = filterData.map((item) => {
                    return [new Date(item.RecordTime).getTime(), item.LoadVoltage / 1]
                });
            } else if (lCurrent === true) {
                graphData = filterData.map((item) => {
                    return [new Date(item.RecordTime).getTime(), item.LoadCurrent / 1]
                });
            } else if (temp === true) {
                graphData = filterData.map((item) => {
                    return [new Date(item.RecordTime).getTime(), item.Temperature / 1]
                });
            } else {
                graphData = filterData.map((item) => {
                    return [new Date(item.RecordTime).getTime(), item.PvVolt / 1]
                });
            }
        } else {
            graphData = filterData.map((item) => {
                return [new Date(item.Time).getTime(), item.PvVolt / 1]
            });
        }

        if (selectDate) {
            const { today, yesterday, last2Day, last7Day, initDate, endDay } = selectDate;
            if (today !== "") {
                startTime = new Date().getTime();
                endTime = new Date().getTime();

            } else if (yesterday !== "") {
                let date = new Date();
                date.setDate(date.getDate() - 1);
                startTime = new Date(date).getTime();
                endTime = new Date().getTime();

            } else if (last2Day !== "") {
                let date = new Date();
                date.setDate(date.getDate() - 2);
                startTime = new Date(date).getTime();
                endTime = new Date().getTime();

            } else if (last7Day !== "") {
                let date = new Date();
                date.setDate(date.getDate() - 7);
                startTime = new Date(date).getTime();
                endTime = new Date().getTime();

            } else if (initDate !== "") {
                startTime = new Date(initDate).getTime();
                endTime = new Date(endDay).getTime();
            } else {
                startTime = new Date().getTime();
                endTime = new Date().getTime();
            }
        } else {
            startTime = new Date().getTime();
            endTime = new Date().getTime();
        }

    } else {
        graphData = [];
    }
    let barChartOption = {
        series: [{
            data: graphData
        }],
        options: {
            chart: {
                id: 'area-datetime',
                type: 'area',
                height: 350,
                zoom: {
                    autoScaleYaxis: true
                }
            },
            annotations: {
                yaxis: [{
                    y: 30,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Support',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                }],
                xaxis: [{
                    x: endTime,
                    borderColor: '#999',
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        text: 'Rally',
                        style: {
                            color: "#fff",
                            background: '#775DD0'
                        }
                    }
                }]
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
                style: 'hollow',
            },
            xaxis: {
                type: 'datetime',
                min: startTime,
                tickAmount: 6,
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100]
                }
            },
        },
        selection: 'one_year',
    }
    return barChartOption;
}


// chartMain.js.............................



// import moment from "moment";
// import ReactApexChart from "react-apexcharts";

// import React, { useState } from "react"; // Add React and useState import

// // Color palette for different series
// const colorPalette = {
//   pvVoltage: '#FF4560',
//   pvCurrent: '#008FFB',
//   bVoltage: '#00E396',
//   lVoltage: '#FEB019',
//   lCurrent: '#775DD0',
//   temp: '#FF66C3',
//   PVKWh: '#546E7A'
// };

// // Generate combined chart with all selected series
// export const generateCombinedChart = (filterData, selectDate, seriesState) => {
//   const activeSeries = [];
  
//   if (seriesState.pvVoltage && filterData.some(d => d.PvVolt != null)) {
//     activeSeries.push({
//       name: 'PV Voltage (V)',
//       data: filterData.map(d => [new Date(d.RecordTime).getTime(), d.PvVolt]),
//       color: colorPalette.pvVoltage
//     });
//   }
  
//   if (seriesState.pvCurrent && filterData.some(d => d.PvCur != null)) {
//     activeSeries.push({
//       name: 'PV Current (A)',
//       data: filterData.map(d => [new Date(d.RecordTime).getTime(), d.PvCur]),
//       color: colorPalette.pvCurrent
//     });
//   }
  
//   if (seriesState.bVoltage && filterData.some(d => d.BatVoltage != null)) {
//     activeSeries.push({
//       name: 'Battery Voltage (V)',
//       data: filterData.map(d => [new Date(d.RecordTime).getTime(), d.BatVoltage]),
//       color: colorPalette.bVoltage
//     });
//   }
  
//   if (seriesState.lVoltage && filterData.some(d => d.LoadVoltage != null)) {
//     activeSeries.push({
//       name: 'Load Voltage (V)',
//       data: filterData.map(d => [new Date(d.RecordTime).getTime(), d.LoadVoltage]),
//       color: colorPalette.lVoltage
//     });
//   }
  
//   if (seriesState.lCurrent && filterData.some(d => d.LoadCurrent != null)) {
//     activeSeries.push({
//       name: 'Load Current (A)',
//       data: filterData.map(d => [new Date(d.RecordTime).getTime(), d.LoadCurrent]),
//       color: colorPalette.lCurrent
//     });
//   }
  
//   if (seriesState.temp && filterData.some(d => d.Temperature != null)) {
//     activeSeries.push({
//       name: 'Temperature (°C)',
//       data: filterData.map(d => [new Date(d.RecordTime).getTime(), d.Temperature]),
//       color: colorPalette.temp
//     });
//   }
  
//   if (seriesState.PVKWh && filterData.some(d => d.PVKWh != null)) {
//     activeSeries.push({
//       name: 'PV Energy (kWh)',
//       data: filterData.map(d => [new Date(d.RecordTime).getTime(), d.PVKWh]),
//       color: colorPalette.PVKWh
//     });
//   }

//   // Calculate date range
//   let startTime, endTime;
//   if (selectDate.today) {
//     startTime = moment().startOf('day').valueOf();
//     endTime = moment().valueOf();
//   } else if (selectDate.last7Day) {
//     startTime = moment().subtract(7, 'days').startOf('day').valueOf();
//     endTime = moment().valueOf();
//   } else if (selectDate.last30Day) {
//     startTime = moment().subtract(30, 'days').startOf('day').valueOf();
//     endTime = moment().valueOf();
//   } else if (selectDate.last60Day) {
//     startTime = moment().subtract(60, 'days').startOf('day').valueOf();
//     endTime = moment().valueOf();
//   } else if (selectDate.initDate && selectDate.endDay) {
//     startTime = moment(selectDate.initDate).startOf('day').valueOf();
//     endTime = moment(selectDate.endDay).endOf('day').valueOf();
//   } else {
//     startTime = moment().subtract(7, 'days').startOf('day').valueOf();
//     endTime = moment().valueOf();
//   }

//   return {
//     series: activeSeries,
//     options: {
//       chart: {
//         type: 'line',
//         height: 350,
//         zoom: { 
//           enabled: true,
//           autoScaleYaxis: true 
//         },
//         toolbar: {
//           show: true,
//           tools: {
//             download: true,
//             selection: true,
//             zoom: true,
//             zoomin: true,
//             zoomout: true,
//             pan: true,
//             reset: true
//           }
//         }
//       },
//       colors: activeSeries.map(s => s.color),
//       stroke: {
//         width: 2,
//         curve: 'smooth'
//       },
//       markers: {
//         size: 3,
//         hover: {
//           size: 5
//         }
//       },
//       xaxis: {
//         type: 'datetime',
//         min: startTime,
//         max: endTime,
//         labels: {
//           format: 'dd MMM yyyy'
//         }
//       },
//       yaxis: {
//         labels: {
//           formatter: function(val) {
//             return val != null ? val.toFixed(2) : '0';
//           }
//         },
//         tooltip: {
//           enabled: true
//         }
//       },
//       tooltip: {
//         shared: true,
//         intersect: false,
//         x: {
//           format: 'dd MMM yyyy HH:mm'
//         },
//         y: {
//           formatter: function(val, { seriesIndex }) {
//             const unit = activeSeries[seriesIndex]?.name?.match(/\((.*?)\)/)?.[1] || '';
//             return val != null ? `${val.toFixed(2)} ${unit}` : 'N/A';
//           }
//         }
//       },
//       legend: {
//         position: 'top',
//         horizontalAlign: 'center'
//       },
//       grid: {
//         borderColor: '#f1f1f1'
//       }
//     }
//   };
// };

// // Generate single chart showing one series at a time
// export const generateSingleChart = (filterData, selectDate, seriesState) => {
//   let graphData = [];
//   let yaxisTitle = '';
  
//   if (seriesState.pvVoltage) {
//     graphData = filterData.map(item => [new Date(item.RecordTime).getTime(), item.PvVolt]);
//     yaxisTitle = 'PV Voltage (V)';
//   } else if (seriesState.pvCurrent) {
//     graphData = filterData.map(item => [new Date(item.RecordTime).getTime(), item.PvCur]);
//     yaxisTitle = 'PV Current (A)';
//   } else if (seriesState.bVoltage) {
//     graphData = filterData.map(item => [new Date(item.RecordTime).getTime(), item.BatVoltage]);
//     yaxisTitle = 'Battery Voltage (V)';
//   } else if (seriesState.lVoltage) {
//     graphData = filterData.map(item => [new Date(item.RecordTime).getTime(), item.LoadVoltage]);
//     yaxisTitle = 'Load Voltage (V)';
//   } else if (seriesState.lCurrent) {
//     graphData = filterData.map(item => [new Date(item.RecordTime).getTime(), item.LoadCurrent]);
//     yaxisTitle = 'Load Current (A)';
//   } else if (seriesState.temp) {
//     graphData = filterData.map(item => [new Date(item.RecordTime).getTime(), item.Temperature]);
//     yaxisTitle = 'Temperature (°C)';
//   } else if (seriesState.PVKWh) {
//     graphData = filterData.map(item => [new Date(item.RecordTime).getTime(), item.PVKWh]);
//     yaxisTitle = 'PV Energy (kWh)';
//   } else {
//     // Default to PV Voltage if no series is selected
//     graphData = filterData.map(item => [new Date(item.RecordTime).getTime(), item.PvVolt]);
//     yaxisTitle = 'PV Voltage (V)';
//   }

//   // Calculate date range (same as combined chart)
//   let startTime, endTime;
//   if (selectDate.today) {
//     startTime = moment().startOf('day').valueOf();
//     endTime = moment().valueOf();
//   } else if (selectDate.last7Day) {
//     startTime = moment().subtract(7, 'days').startOf('day').valueOf();
//     endTime = moment().valueOf();
//   } else if (selectDate.last30Day) {
//     startTime = moment().subtract(30, 'days').startOf('day').valueOf();
//     endTime = moment().valueOf();
//   } else if (selectDate.last60Day) {
//     startTime = moment().subtract(60, 'days').startOf('day').valueOf();
//     endTime = moment().valueOf();
//   } else if (selectDate.initDate && selectDate.endDay) {
//     startTime = moment(selectDate.initDate).startOf('day').valueOf();
//     endTime = moment(selectDate.endDay).endOf('day').valueOf();
//   } else {
//     startTime = moment().subtract(7, 'days').startOf('day').valueOf();
//     endTime = moment().valueOf();
//   }

//   return {
//     series: [{
//       name: yaxisTitle,
//       data: graphData,
//       color: colorPalette[yaxisTitle.split(' ')[0].toLowerCase()]
//     }],
//     options: {
//       chart: {
//         type: 'line',
//         height: 350,
//         zoom: { 
//           enabled: true,
//           autoScaleYaxis: true 
//         },
//         toolbar: {
//           show: true
//         }
//       },
//       stroke: {
//         width: 2,
//         curve: 'smooth'
//       },
//       markers: {
//         size: 3,
//         hover: {
//           size: 5
//         }
//       },
//       xaxis: {
//         type: 'datetime',
//         min: startTime,
//         max: endTime,
//         labels: {
//           format: 'dd MMM yyyy'
//         }
//       },
//       yaxis: {
//         title: {
//           text: yaxisTitle
//         },
//         labels: {
//           formatter: function(val) {
//             return val != null ? val.toFixed(2) : '0';
//           }
//         }
//       },
//       tooltip: {
//         x: {
//           format: 'dd MMM yyyy HH:mm'
//         },
//         y: {
//           formatter: function(val) {
//             const unit = yaxisTitle.match(/\((.*?)\)/)?.[1] || '';
//             return val != null ? `${val.toFixed(2)} ${unit}` : 'N/A';
//           }
//         }
//       },
//       grid: {
//         borderColor: '#f1f1f1'
//       }
//     }
//   };
// };

// // Remove this entire component from ChartMain.js:
// const GraphView = ({ filterData, selectDate, seriesState }) => {
//   const [viewMode, setViewMode] = useState('combined'); // 'combined' or 'single'

//   const chartOptions = viewMode === 'combined' 
//     ? generateCombinedChart(filterData, selectDate, seriesState)
//     : generateSingleChart(filterData, selectDate, seriesState);

//   return (
//     <div>
//       <div className="view-mode-toggle">
//         <button 
//           className={viewMode === 'combined' ? 'active' : ''}
//           onClick={() => setViewMode('combined')}
//         >
//           Combined View
//         </button>
//         <button 
//           className={viewMode === 'single' ? 'active' : ''}
//           onClick={() => setViewMode('single')}
//         >
//           Single View
//         </button>
//       </div>
      
//       <ReactApexChart
//         options={chartOptions.options}
//         series={chartOptions.series}
//         type="line"
//         height={350}
//       />
//     </div>
//   );
// };

// // Gauge charts configuration (unchanged from your original)
// export const medianChartOption = {
//     series: [67],
//     options: {
//         chart: {
//             height: 350,
//             type: "radialBar",
//             offsetY: -10,
//         },
//         plotOptions: {
//             radialBar: {
//                 startAngle: -135,
//                 endAngle: 135,
//                 dataLabels: {
//                     name: {
//                         fontSize: "16px",
//                         color: undefined,
//                         offsetY: 120,
//                     },
//                     value: {
//                         offsetY: 76,
//                         fontSize: "22px",
//                         color: undefined,
//                         formatter: function (val) {
//                             return val + "%";
//                         },
//                     },
//                 },
//             },
//         },
//         fill: {
//             type: "gradient",
//             gradient: {
//                 shade: "dark",
//                 shadeIntensity: 0.15,
//                 inverseColors: false,
//                 opacityFrom: 1,
//                 opacityTo: 1,
//                 stops: [0, 50, 65, 91],
//             },
//         },
//         stroke: {
//             dashArray: 4,
//         },
//         labels: ["Median Ratio"],
//     },
// };

// export const chartOptionList = [
//     { id: 1, path: "src/images/charts/chart1.png", title: "Canvas Chart" },
//     { id: 2, path: "src/images/charts/chart2.png", title: "Gradient Circle Chart" },
//     { id: 3, path: "src/images/charts/chart3.png", title: "Strocked Chart" },
//     { id: 4, path: "src/images/charts/chart4.png", title: "Semi Circle Chart" },
//     { id: 5, path: "src/images/charts/chart5.png", title: "Semi Circle Chart" },
//     { id: 6, path: "src/images/charts/chart6.png", title: "Radia Chart" },
//     { id: 7, path: "src/images/charts/chart7.png", title: "Pie Chart" },
//     { id: 8, path: "src/images/charts/chart8.png", title: "Filled Cicle Chart" },
// ];

// export const canvasChatOption = (data, chartData) => {
//     let option;
//     option = {
//         series: [
//             {
//                 type: "gauge",
//                 min: 0,
//                 max: 40, 
//                 axisLine: {
//                     lineStyle: {
//                         width: 10,
//                         color: [
//                             [0.3, "#ff9920"],
//                             [0.7, "#51ce8a"],
//                             [1, "#fc696a"],
//                         ],
//                     },
//                 },
//                 pointer: {
//                     itemStyle: {
//                         color: "auto",
//                     },
//                 },
//                 splitLine: {
//                     distance: -75,
//                     length: 20,
//                     lineStyle: {
//                         color: "#fff",
//                         width: 0,
//                     },
//                 },
//                 axisLabel: {
//                     color: "inherit",
//                     distance: 40,
//                     fontSize: 10,
//                 },
//                 detail: {
//                     valueAnimation: true,
//                     formatter: `{value} ${chartData.id === 1 ? 'V' :
//                               chartData.id === 2 ? 'A' :
//                               chartData.id === 3 ? 'W' :
//                               chartData.id === 4 ? 'C' :
//                               chartData.id === 5 ? 'V' :
//                               chartData.id === 6 ? 'A' :
//                               chartData.id === 7 ? 'V' :
//                               chartData.id === 8 ? 'A' : ""}`,
//                     fontSize: 15,
//                     color: "inherit",
//                     offsetCenter: [0, "75%"],
//                 },
//                 data: [
//                     {
//                         value: chartData.id === 1 ? data[0]?.PvVolt / 1 :
//                                chartData.id === 2 ? data[0]?.PvCur / 1 :
//                                chartData.id === 3 ? data[0]?.PVKWh / 1 :
//                                chartData.id === 4 ? data[0]?.Temperature / 1 :
//                                chartData.id === 5 ? data[0]?.BatVoltage / 1 :
//                                chartData.id === 6 ? data[0]?.BatCurrent / 1 :
//                                chartData.id === 7 ? data[0]?.LoadVoltage / 1 :
//                                chartData.id === 8 ? data[0]?.LoadCurrent / 1 : "",
//                         fontSize: 10,
//                     },
//                 ],
//             },
//         ],
//     };
//     return option;
// };

