export class Vertex {
    constructor(name) {
        this.name = name;
        this.x = undefined;
        this.y = undefined;
    }
}

export class Edge {
    constructor(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
    }
}

export class GraphBuilder {
    static parseEdges(lines) {
        const nameToVertice = new Map();
        const edges = [];
        const edgeSet = new Set();

        lines.forEach(line => {
            const match = line.trim().match(/^(.+?)\s*-\s*(.+)$/);
            if (match) {
                const v1Name = match[1].trim();
                const v2Name = match[2].trim();

                if (!nameToVertice.has(v1Name)) {
                    nameToVertice.set(v1Name, new Vertex(v1Name));
                }
                if (!nameToVertice.has(v2Name)) {
                    nameToVertice.set(v2Name, new Vertex(v2Name));
                }

                const v1 = nameToVertice.get(v1Name);
                const v2 = nameToVertice.get(v2Name);

                const sortedEdge = [v1Name, v2Name].sort().join('-');
                if (!edgeSet.has(sortedEdge)) {
                    edgeSet.add(sortedEdge);
                    edges.push(new Edge(v1, v2));
                }
            }
        });

        return { edges, nameToVertice };
    }

    static buildVerticeToConnecteds(edges) {
        const verticeToConnecteds = new Map();

        edges.forEach(({ v1, v2 }) => {
            if (!verticeToConnecteds.has(v1)) verticeToConnecteds.set(v1, []);
            if (!verticeToConnecteds.has(v2)) verticeToConnecteds.set(v2, []);

            verticeToConnecteds.get(v1).push(v2);
            verticeToConnecteds.get(v2).push(v1);
        });

        return verticeToConnecteds;
    }

    static getCoordinatesOfPoints(circle, vertices) {
        const { centerX, centerY, radius } = circle;
        const numOfPoints = vertices.length;

        vertices.forEach((vertex, index) => {
            const angle = (2 * Math.PI / numOfPoints) * index;
            vertex.x = centerX + radius * Math.cos(angle);
            vertex.y = centerY + radius * Math.sin(angle);
        });

        return vertices;
    }
}