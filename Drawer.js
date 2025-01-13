export class Circle {
    constructor(centerX, centerY, radius) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }
}

export class Point {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}

export class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawNode(x, y, name, point) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, point.size, 0, 2 * Math.PI);
        this.ctx.fillStyle = point.color;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(name, x, y - 10);
    }

    drawEdge(vertex1, vertex2) {
        this.ctx.beginPath();
        this.ctx.moveTo(vertex1.x, vertex1.y);
        this.ctx.lineTo(vertex2.x, vertex2.y);
        this.ctx.strokeStyle = 'gray';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawGraph(vertices, verticeToConnecteds, point) {
        const processedVertices = new Set();

        vertices.forEach(vertex => {
            const connectedVertices = verticeToConnecteds.get(vertex) || [];

            connectedVertices.forEach(connectedVertex => {
                if (processedVertices.has(connectedVertex)) {
                    return;
                }

                this.drawEdge(vertex, connectedVertex);
            });

            processedVertices.add(vertex);

            this.drawNode(vertex.x, vertex.y, vertex.name, point);
        });
    }
}