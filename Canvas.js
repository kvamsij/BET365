
export default class CanvasChart{
    static data = new Map();
    static context = null;
    static colors = new Map(
        [['GOOG', '#494949'],
        ['BIDU', '#673ab7'],
        ['YNDX', '#2196f3'],
        ['BCOR', '#e91e63c2'],
        ['YHOO', '#cddc39'],
         ['MSFT', '#ff9800'], 
         ['IACI', '#9c27b0'],
         ['FB', '#cf3917'],
         ['AAPL', '#0f7b12'], 
         ['TWTR', '#0a0a0a']]
    )
    constructor(data, canvasElement){
        this.canvasElement = canvasElement;
        this.canvasElement.width = 600;
        this.canvasElement.height = 400;
        CanvasChart.data = data;
        CanvasChart.context = this.canvasElement.getContext('2d');
        CanvasChart.context.translate(0, this.canvasElement.height/1.5);
        CanvasChart.context.scale(1, -1);
        CanvasChart.context.lineWidth = (this.canvasElement.height/1.5) * 0.003;
        CanvasChart.context.lineCap = "round";
        CanvasChart.context.save();
        CanvasChart.transformData();
        CanvasChart.joinPointWithLines();
        CanvasChart.plotPoints();
    }
    static transformData(){
        let data = Array.from(this.data).slice(0, -1);
        data = data.map(value => {
            return [value[0], value[1].map(v => v.slice(2, 3))];
        });
        return data;
    }
    static joinPointWithLines(){
        const data = this.transformData();
        const t = data.map(values => [values[0], values[1].reduce((p, c) => p.concat(c))]);
        const context = this.context;
        t.forEach(value => {
            const normaliseValues = CanvasChart.normaliseData(value);
            let x = 0;          
            let distance = context.canvas.width / normaliseValues.length;
            context.beginPath();
            context.moveTo(x, parseInt(normaliseValues[0]));
            for (let index = 0; index < normaliseValues.length; index++) {
                CanvasChart.graphLine(normaliseValues, index, x, distance, context, value);
            }
        });
    }

    static graphLine(normaliseValues, index, x, distance, context, value) {
        const point = normaliseValues[index];
        const newDistance = x + (distance * (index + 1));
        let y = parseInt(point);
        context.lineTo(newDistance, y);
        context.strokeStyle = this.colors.get(value[0]);
        context.stroke();
    }

    static plotPoints(){
        const data = this.transformData();
        const t = data.map(values => [values[0], values[1].reduce((p, c) => p.concat(c))]);
          const context = this.context;
        let startPoint = 0;
        t.forEach(value => {
            const normaliseValues = CanvasChart.normaliseData(value);
            let distance = context.canvas.width / normaliseValues.length;
            normaliseValues.forEach((point, index) => {
                CanvasChart.graphPoint(startPoint, distance, index, context, point, value);
            });
        });
    }

    static graphPoint(startPoint, distance, index, context, point, value) {
        const newDistance = startPoint + (distance * (index + 1));
        context.beginPath();
        context.arc(newDistance, point, 2, Math.PI * 0, Math.PI * 2);
        context.fillStyle = this.colors.get(value[0]);
        context.fill();
    }

    static normaliseData(value) {
        const plotValues = value[1].filter(n => n).map(pValues => parseFloat(pValues));
        const { min, max } = CanvasChart.getMinMaxValues(plotValues);
        const normaliseValues = plotValues.map(v => {
            return (
                ((v - min) / (max - min)) * 150
            );
        });
        return normaliseValues.slice(-6).map(value => parseInt(value));
    }

    static getMinMaxValues(plotValues) {
        const min = plotValues.reduce((v1, v2) => v1 < v2 ? v1 : v2);
        const max = plotValues.reduce((v1, v2) => v1 > v2 ? v1 : v2);
        return { min, max };
    }
};