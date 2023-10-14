const url_string = window.location.href;
const url = new URL(url_string);
const adp = url.searchParams.get("adp");
const inibidor = url.searchParams.get("inibidor");
const substrato = url.searchParams.get("substrato");
const desacoplador = url.searchParams.get("desacoplador");


graph();


function graph() {


    let label = '';
    label += adp === "semadp" ? '0' : adp;
    label += " nmol ADP";
    label += inibidor === "semini" ? '' : ' + ' + inibidor;
    label += desacoplador === "semdes" ? '' : ' + ' + desacoplador;

    const ctx = document.getElementById('myChart');
    let data = [100];
    let data2 = [2];

    Chart.defaults.font.size = 18;

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: new Array(100).fill(''),
            datasets: [
                {
                    label: 'oxigenio',
                    data: data,
                    fill: false,
                    borderColor: "#712cf9",
                    tension: 0.1
                },

                {
                    label: 'protons',
                    data: data2,
                    fill: false,
                    borderColor: "#ff00dc",
                    tension: 0.1,
                    yAxisID: 'y1'
                },

                {
                    label: 'Mitocôndria',
                    backgroundColor: '#FFBD00'
                },
                {
                    label: label,
                    backgroundColor: '#FF0054'
                }
            ]
        },
        options: {
            elements: {
                point: {
                    radius: alternateRadius,
                    pointStyle: 'circle',
                    backgroundColor: alternateColor
                }
            },
            aspectRatio: 1.5,
            plugins: {
                label: {
                    display: false
                },
                legend: {
                    labels: {
                        filter: (legendItem, chartData) => (legendItem.text !== 'oxigenio' && legendItem.text !== 'protons'),
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Tempo',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        display: false
                    },
                },
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: '% de Oxigênio no meio',
                        font: {
                            size: 16
                        }
                    }
                },
                y1: {
                    min: 0,
                    max: 50,
                    type: 'linear',
                    display: true,
                    position: 'right',

                    ticks: {
                        display: false
                    },

                    title: {
                        display: true,
                        text: 'Gradiente de prótons',
                        font: {
                            size: 16
                        }
                    },

                    // grid line settings
                    grid: {
                        display: false,
                        drawTicks: false,
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    }
                }
            }
        }
    });


    chart.data.datasets.push({label: 'teste', backgroundColor: '#00FF00'});
    chart.update();

    let count = 0;
    let loop = setInterval(() => {
        data.push(data[data.length - 1] - 0.9);
        data2.push(5);
        count++;
        chart.update();
        if (count >= 100) {
            clearInterval(loop);
        }
    }, 50);

    // let loop = setInterval(() => {
    //     if (count < 13) {
    //         let a = Math.floor(Math.random() * 10);
    //         let num = a % 2 === 0 ? 1 : -1;
    //         data.push(95 + num * Math.floor(Math.random() * 2));
    //     } else if (count < 26) {
    //         let a = Math.floor(Math.random() * 10);
    //         let num = a % 2 === 0 ? 1 : -1;
    //         data.push(data[data.length - 1] + num * Math.floor(Math.random() * 1.2) - 0.5);
    //     } else {
    //
    //         let a = Math.floor(Math.random() * 10);
    //         let num = a % 2 === 0 ? 1 : -1;
    //
    //         switch (estado) {
    //             case "halt":
    //                 data.push(data[25] + num * Math.floor(Math.random() * 1.5));
    //             case "mantem":
    //                 data.push(data[data.length - 1] + num * Math.floor(Math.random() * 1.2) - 0.3);
    //                 break;
    //             case "brusca":
    //                 data.push(getQueda(count, 29, -3, -24) + num * Math.floor(Math.random() * 1.5));
    //                 break;
    //         }
    //
    //
    //     }
    //
    //
    //     count++;
    //     chart.update();
    //     if (count >= 100) {
    //         clearInterval(loop);
    //     }
    // }, 50);

}

function alternateRadius(ctx) {
    if (ctx.dataIndex === 12 || ctx.dataIndex === 25) {
        return 10;
    } else {
        return 0;
    }
}

function alternateColor(ctx) {
    if (ctx.dataIndex === 12) {
        return '#FFBD00';
    } else {
        return '#FF0054';
    }
}