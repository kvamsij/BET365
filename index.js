import DataStore from './DataStore.js'
import DataService from './DataService.js';
import CanvasChart from './Canvas.js';

import  SmartTable  from "./components/smart-table.js";
import  SmartTableRows  from "./components/smart-table-row.js";
import  GraphInfo  from "./components/graphInfo.js";
import  GraphInfoList  from "./components/graphInfoList.js";


window.customElements.define('smart-table', SmartTable, {extends: 'table'});
window.customElements.define('smart-table-row', SmartTableRows,{ extends: 'tr'});
window.customElements.define('graph-info', GraphInfo);
window.customElements.define('graph-info-list', GraphInfoList);

const dataStore = new DataStore();
const dataService = new DataService();
const canvasElement = document.getElementById('canvas');
const smartTable = document.getElementById('smartTable');

const delayProcess = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
};
const domHandler = (data) => {
    new CanvasChart(data, canvasElement);
    smartTable.rowValues = data;
}

(async() => {

    const {columns, rows} = await dataService.getSnapShot();
    dataStore.set('columns', columns);
    dataStore.addToStore(domHandler, rows);

    const results = await dataService.getDeltas();
    
    restartLoop:
    while(true){
        for (let index = 0; index < results.length; index++) {
            const result = results[index];
             dataStore.addToStore(domHandler, result.data);
             await delayProcess(result.delayTimer);
            if(index >= results.length - 1) continue restartLoop;
        }
        break;
    }
})();