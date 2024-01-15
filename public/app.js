var EchartsLinesBasicLight = function() {
  // Basic line chart
  var _linesBasicLightExample = function() {
      if (typeof echarts == 'undefined') {
          console.warn('Warning - echarts.min.js is not loaded.');
          return;
      }

      var line_basic_element = document.getElementById('line_basic');
      if (line_basic_element) {
          var line_basic = echarts.init(line_basic_element);
          var dynamicData = [];
          line_basic.setOption({

              // Define colors
              color: ['#EF5350', '#66BB6A'],

              // Global text styles
              textStyle: {
                  fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                  fontSize: 13
              },

              // Chart animation duration
              animationDuration: 750,

              // Setup grid
              grid: {
                  left: 0,
                  right: 40,
                  top: 35,
                  bottom: 0,
                  containLabel: true
              },

              // Add legend
              legend: {
                  data: ['ResistanceValue'],
                  itemHeight: 8,
                  itemGap: 20
              },

              // Add tooltip
              tooltip: {
                  trigger: 'axis',
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  padding: [10, 15],
                  textStyle: {
                      fontSize: 13,
                      fontFamily: 'Roboto, sans-serif'
                  }
              },

              // Horizontal axis
              xAxis: [{
                  type: 'category',
                  boundaryGap: false,
                  data: ['', '', '', '', '', '', ''],
                  axisLabel: {
                      color: '#333'
                  },
                  axisLine: {
                      lineStyle: {
                          color: '#999'
                      }
                  },
                  splitLine: {
                      lineStyle: {
                          color: ['#eee']
                      }
                  }
              }],

              // Vertical axis
              yAxis: [{
                  type: 'value',
                  axisLabel: {
                      formatter: '{value} °C',
                      color: '#333'
                  },
                  axisLine: {
                      lineStyle: {
                          color: '#999'
                      }
                  },
                  splitLine: {
                      lineStyle: {
                          color: ['#eee']
                      }
                  },
                  splitArea: {
                      show: true,
                      areaStyle: {
                          color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                      }
                  }
              }],

              // Add series
              series: [
                  {
                      name: 'ResistanceValue',
                      type: 'line',
                      data: dynamicData,
                      smooth: true,
                      symbolSize: 7,
                      markLine: {
                          data: [{
                              type: 'average',
                              name: 'Average'
                          }]
                      },
                      itemStyle: {
                          normal: {
                              borderWidth: 2
                          }
                      }
                  },
               
              ]
          });
          const socket = io();
          socket.on("MOTORSERVO", function (data) {
            console.log("Updates from the server:", data);
      
            // Append new data to the array
            dynamicData.push(data);
      
            // Keep only the last 7 elements (or adjust as needed)
            dynamicData = dynamicData.slice(-7);
      
            // Update the chart with the new data
            line_basic.setOption({
              series: [
                {
                  data: dynamicData,
                },
              ],
            });
          });
        }


      //
      // Resize charts
      //

      // Resize function
      var triggerChartResize = function() {
          line_basic_element && line_basic.resize();
      };

      // On sidebar width change
      var sidebarToggle = document.querySelectorAll('.sidebar-control');
      if (sidebarToggle) {
          sidebarToggle.forEach(function(togglers) {
              togglers.addEventListener('click', triggerChartResize);
          });
      }

      // On window resize
      var resizeCharts;
      window.addEventListener('resize', function() {
          clearTimeout(resizeCharts);
          resizeCharts = setTimeout(function () {
              triggerChartResize();
          }, 200);
      });
  };


  //
  // Return objects assigned to module
  //

  return {
      init: function() {
          _linesBasicLightExample();
      }
  }
}();



    

// Listen for resistance data updates from the server
/*
socket.on('MOTORSERVO', (data) => {
  console.log("updates from the server  :")
    const resistanceValueElement = document.getElementById('resistanceValue');

  resistanceValueElement.textContent = `Resistance Value: ${data}`;

  
});*/
