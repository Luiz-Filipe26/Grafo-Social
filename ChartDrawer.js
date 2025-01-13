export class ChartDrawer {
    constructor(chartDiv, isHorizontal, chartTitle, chartSubtitle) {
        this.chartDiv = chartDiv;
        this.chartTitle = chartTitle;
        this.chartSubtitle = chartSubtitle;
        this.isHorizontal = isHorizontal;
        this.chart = new google.visualization.ColumnChart(chartDiv);
    }

    /**
     * Define os dados do gráfico e as configurações para o eixo X e Y.
     *
     * @param {Array<Array<(string|number)>>} data - Array de arrays, onde cada sub-array começa com o nome da propriedade (e.g., 'Vértice')
     *                       e os valores das barras para cada coluna do eixo Y (e.g., [grau, número de letras]).
     *                       Exemplo: [['Vértice A', 3, 4], ['Vértice B', 2, 3]]
     *
     * @param {string} XAxisName - Nome da coluna para o eixo X (e.g., 'Vértice').
     *
     * @param {Array<string>} YAxisColumnNames - Array de strings representando os nomes das colunas para o eixo Y (e.g., ['Grau', 'Número de Letras']).
     */
    setData(data, XAxisName, YAxisColumnNames) {
        this.data = data;
        this.XAxisName = XAxisName;
        this.YAxisColumnNames = YAxisColumnNames;

        this.drawChart();
    }

    drawChart() {
        const dataTable = new google.visualization.DataTable();

        dataTable.addColumn('string', this.XAxisName);

        this.YAxisColumnNames.forEach(col => {
            dataTable.addColumn('number', col);
        });

        this.data.forEach(row => {
            dataTable.addRow(row);
        });

        const options = {
            chart: {
                title: this.chartTitle,
                subtitle: this.chartSubtitle,
            },
            bars: this.isHorizontal ? 'horizontal' : 'vertical',
            backgroundColor: { fill: 'transparent' },
            hAxis: {
                slantedText: true, 
                slantedTextAngle: 45,
                textStyle: {
                    fontSize: 10
                }
            }
        };

        this.chart.draw(dataTable, options);
    }
}