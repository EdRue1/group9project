<template>
  <div class="w-1/2">
    <canvas class="p-10" ref="zipChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Define props
const props = defineProps({
  label: Array,
  chartData: Array
});

// Reference to the chart canvas
const zipChart = ref(null);

// Create the chart when the component is mounted
onMounted(() => {
  if (zipChart.value) {
    new Chart(zipChart.value, {
      type: 'doughnut',
      data: {
        labels: props.label,
        datasets: [
          {
            borderWidth: 1,
            data: props.chartData
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Clients by Zip Code'
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }
});
</script>
