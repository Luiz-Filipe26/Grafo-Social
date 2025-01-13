import { ChartDrawer } from "./ChartDrawer.js";
import { GraphBuilder } from "./GraphBuilder.js";
import { Drawer, Circle, Point } from "./Drawer.js";

function afterFileRead(nonBlankLines) {
    const { edges, nameToVertice } = GraphBuilder.parseEdges(nonBlankLines);

    const verticeToConnecteds = GraphBuilder.buildVerticeToConnecteds(edges);

    const vertices = Array.from(nameToVertice.values());

    const circle = new Circle(250, 250, 200);
    const point = new Point(5, 'blue');

    const coordinates = GraphBuilder.getCoordinatesOfPoints(circle, vertices);

    const drawer = new Drawer(ctx);
    drawer.drawGraph(coordinates, verticeToConnecteds, point);

    const degrees = Array.from(verticeToConnecteds.entries())
        .map(([vertex, connectedVertices]) => [vertex.name, connectedVertices.length]);

    degrees.sort((a, b) => b[1] - a[1]);

    const chartDiv = document.getElementById('chart_div');

    google.charts.setOnLoadCallback(() => {
        const chartDrawer = new ChartDrawer(chartDiv, false, 'Grau de Conexões', 'Número de conexões de cada pessoa (vértice)');
        chartDrawer.setData(degrees, 'Vértice', ['Grau']);
    });
}

google.charts.load('current', { 'packages': ['corechart', 'bar'] });

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const lines = reader.result.split('\n').filter(line => line.trim() !== '');
        afterFileRead(lines);
    };
    reader.readAsText(file);
});
