var EchartsLinesBasicLight = function() {
    // Configuration de base pour le graphique linéaire Echarts
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
                // Configuration du graphique ici...
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
                    data: dynamicData.map(function (item) {
                        return item[0];
                    })
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Temperature',
                        type: 'line',
                        data: dynamicData.map(function (item) {
                            return item[1];
                        }),
                        smooth: true,
                        symbolSize: 7,
                        itemStyle: {
                            normal: {
                                borderWidth: 2
                            }
                    }}
                ]
            });
        }
    };

    return {
        init: function() {
            _linesBasicLightExample();
        }
    }
}();

// Initialisation de la jauge d'humidité
var gauge = new RadialGauge({
    renderTo: 'gauge-humidity',
    width: 400,
    height: 400,
    units: 'Angle',
    minValue: 0,
    maxValue: 180,
    majorTicks: ['Neutre', 'Montée', 'Descente'],
    minorTicks: 22,
    strokeTicks: true,
    highlights: [
        { from: 0, to: 50, color: 'rgba(0,255,0,.15)' },
        { from: 50, to: 100, color: 'rgba(255,0,0,.15)' },
        { from: 100, to: 180, color: 'rgba(0,0,255,.15)' }
    ],
    colorPlate: '#fff',
    borderShadowWidth: 0,
    borders: false,
    needleType: 'arrow',
    needleWidth: 2,
    animationDuration: 1500,
    animationRule: 'linear',
    tickSide: 'left',
    numberSide: 'left',
    needleSide: 'left',
    barStrokeWidth: 7,
    barBeginCircle: false,
    valueBox: true,
    valueTextShadow: false,
    colorValueBoxRect: '#fff',
    colorValueBoxRectEnd: '#fff'
}).draw();

var socket = io();

// Réception des données via Socket.io
socket.on('MOTORSERVO', function(data) {
    var angle = convertDataToAngle(data); 
    gauge.value = angle;
    EchartsLinesBasicLight.init();
});

// Fonction pour convertir les données en angle pour la jauge
function convertDataToAngle(data) {
    // Implémentez votre logique de conversion ici
    return parseInt(data); // Exemple simple
}