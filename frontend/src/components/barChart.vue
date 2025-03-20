<template>
  <div>
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>


<!-- Changes from options API to composition API-->
<script>
import { ref, onMounted } from 'vue'; // Import Composition API hooks
import { Chart, registerables } from 'chart.js';
import { Colors } from 'chart.js';

// Register necessary components
Chart.register(...registerables);
Chart.register(Colors);

// Define the props
export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },

  // Create a reference for the Attendance Bar Chart
  setup(props) {
    const attendanceChart = ref(null);
    
    // Use onMounted to run chart initialization when the component is mounted
    onMounted(async () => {
      await new Chart(attendanceChart.value, {
        type: 'bar',
        data: {
          labels: props.label, // Use props for dynamic data
          datasets: [
            {
              borderWidth: 1,
              data: props.chartData
            }
          ]
        },
        options: {
          scales: {
            y: {
              ticks: {
                stepSize: 1
              }
            },
            x: {
              gridLines: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Attendance Chart'
            }
          },
          responsive: true,
          maintainAspectRatio: true
        }
      });
    });

    return {
      attendanceChart // Return the reference of the Attendance Chart for use in the template
    };
  }
}
</script>


