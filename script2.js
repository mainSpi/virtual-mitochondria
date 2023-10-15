const colors = [

    // '#452103',
    '#934B00',
    '#FFBD00',
    '#F2A65A',

    '#1E3888',
    '#7F96FF',
    '#47A8BD',

    '#904C77',
    '#139A43',
    '#74D3AE',
    '#DBF4A7',

    '#603140',
    '#DD9787',
    '#DD9AC2',

    '#898989',
    '#404040',

    '#678D58',

];
graph();
graphGrad();

function graph() {
    const ctx = document.getElementById('myChart');
    let data = [100];
    let data2 = [2];

    Chart.defaults.font.size = 16;
    Chart.defaults.font.family = 'Exo';
    Chart.defaults.font.weight = '500';

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

                // {
                //     label: 'Mitocôndria',
                //     backgroundColor: '#FFBD00'
                // },
                // {
                //     label: "Seila",
                //     backgroundColor: '#FF0054'
                // }
            ]
        },
        options: {
            animation: false,
            elements: {
                point: {
                    radius: alternateRadius,
                    pointStyle: 'circle',
                    backgroundColor: alternateColor
                }
            },
            aspectRatio: 1.9,
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
                        text: '% de Oxigênio no meio X Tempo',
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
                        display: false,
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
                        display: false,
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


    for (const c of colors) {
        chart.data.datasets.push(
            {label: 'Cores legais', backgroundColor: c}
        );
    }

    chart.update();

    let count = 0;
    let loop = setInterval(() => {
        data.push(data[data.length - 1] - 0.9);
        // data2.push(5);
        count++;
        chart.update();
        if (count >= 100) {
            clearInterval(loop);
        }
    }, 500);

}

function graphGrad() {
    const ctx = document.getElementById('grad');
    let data = [50];

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: new Array(100).fill(''),
            datasets: [
                {
                    label: 'protons',
                    data: data,
                    fill: false,
                    borderColor: "#ff00dc",
                    tension: 0.1,
                }
            ]
        },
        options: {
            animation: false,
            elements: {
                point: {
                    radius: alternateRadius,
                    pointStyle: 'circle',
                    backgroundColor: alternateColor,
                    borderColor: '#000000'
                }
            },
            maintainAspectRatio: false,
            plugins: {
                label: {
                    display: false
                },
                legend: {
                    labels: {
                        filter: () => false,
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
                        text: 'Gradiente de prótons X Tempo',
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
                    ticks: {
                        display: true
                    },

                    title: {
                        display: false,
                        text: 'Gradiente de prótons',
                        font: {
                            size: 16
                        }
                    },

                    // grid line settings
                    grid: {
                        drawTicks: false,
                    }
                },
            }
        }
    });


    chart.data.datasets.push({label: 'teste', backgroundColor: '#00FF00'});
    chart.update();

    let count = 0;
    let loop = setInterval(() => {
        if (count < 20){
            data.push(20);
        } else if (count <50){
            data.push(80);
        } else if (count <80){
            data.push(50);
        } else if (count <100){
            data.push(100);
        }

        count++;
        chart.update();
        if (count >= 100) {
            clearInterval(loop);
        }
    }, 500);

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