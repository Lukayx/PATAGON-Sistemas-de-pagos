import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

/**
 * Componente que renderiza un gráfico de barras utilizando los datos y opciones proporcionados.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string[]} props.labels - Etiquetas para el eje X del gráfico.
 * @param {number[]} props.dataPoints - Valores numéricos para cada barra del gráfico.
 * @param {string} props.title - Título del gráfico y de la leyenda.
 * @param {string} props.color - Color principal para las barras y bordes del gráfico (en formato CSS).
 * @returns {JSX.Element} Elemento JSX que representa el gráfico de barras.
 */
const BarGraphic = ({ labels, dataPoints, title, color }) => {
    const midata = {
        labels,
        datasets: [
            {
                label: title,
                data: dataPoints,
                borderColor: color,
                backgroundColor: color,
                pointRadius: 5,
            },
        ],
    };

    const misoptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgb(255,255,255, 0.8)',
                    font: { weight: 'bold' },
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
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Método de pago',
                    color: 'rgb(255,255,255, 0.8)',
                    font: { weight: 'bold' },
                },
                ticks: {
                    color: 'rgb(255,255,255, 0.8)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Cantidad',
                    color: 'rgb(255,255,255, 0.8)',
                    font: { weight: 'bold' },
                },
                ticks: {
                    color: 'rgb(255,255,255, 0.8)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
                suggestedMin: 0,
            },
        },
    };

    return <Bar data={midata} options={misoptions} />;
};


export default BarGraphic;
