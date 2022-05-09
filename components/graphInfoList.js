import CanvasChart from "../Canvas.js";

export default class GraphInfoList extends HTMLElement{

    colors = CanvasChart.colors;
    constructor(){
        super();
        // this.attachShadow({mode: 'open'});
        // this.shadowRoot.append(template.content.cloneNode(true));
        for (const [key, value] of this.colors) {
            const graphInfo = document.createElement('graph-info');
                graphInfo.setAttribute('name', key);
                graphInfo.setAttribute('color', value);
                this.appendChild(graphInfo);
          }
    }
}