import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJs.register(ArcElement, Tooltip, Legend);

/**
 * Componente que renderiza un gráfico circular (Doughnut) utilizando los datos y configuraciones proporcionadas.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string[]} [props.labels=[]] - Etiquetas para cada segmento del gráfico.
 * @param {number[]} [props.dataPoints=[]] - Valores numéricos para cada segmento del gráfico.
 * @param {string} [props.title='Título del Gráfico'] - Título que se muestra en la parte superior del gráfico.
 * @param {string[]} [props.colors=['#36A2EB', '#FF6384', '#FFCE56']] - Colores para cada segmento del gráfico.
 * @returns {JSX.Element} Elemento JSX que representa el gráfico circular.
 */
export default function CircularGraphic({ labels = [], dataPoints = [], title = 'Título del Gráfico', colors = ['#36A2EB', '#FF6384', '#FFCE56'] }) {
    // Configuración de los datos del gráfico
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: dataPoints,
                backgroundColor: colors, // Colores para cada segmento
                hoverBackgroundColor: colors.map(color => `${color}AA`), // Colores de hover (con opacidad)
            },
        ],
    };

    // Configuración de las opciones del gráfico
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgb(255,255,255, 0.8)', // Color blanco para la leyenda
                    font: {
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                text: title,
                color: 'rgb(255,255,255, 0.8)',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
            },
        },
    };

    return <Doughnut data={chartData} options={chartOptions} />;
}
