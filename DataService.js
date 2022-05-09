export default class DataService{
    urls = new Map([
        ['snapshot', './data/snapshot.csv'],
        ['deltas', './data/Deltas.csv'],
    ]);
    
    constructor(){}

    async getSnapShot(){
        const url = this.urls.get('snapshot');
        const data = await (await fetch(url)).text();
        return DataService.transformSnapShot(data);
    }
    async getDeltas(){
        const url = this.urls.get('deltas');
        const data = await (await fetch(url)).text();
        return DataService.transformDeltas(data);
    }

    static transformSnapShot(data){
        const rawData = data.trim().split('\r\n').map(data => data.split(','));
        return DataService.getColumnsAndRows(rawData);
    }

    static getColumnsAndRows(rawData) {
        const columns = rawData[0];
        const rows = rawData.splice(1, rawData.length);
        return { columns, rows };
    }

    static transformDeltas(data){
        let rawData = DataService.csvToArray(data);
        return DataService.extractDelaysAndDeltaSets(rawData);
    }

    static extractDelaysAndDeltaSets(rawData) {
        const parsedrawData = rawData.map(d => d.filter(value => value));
        let delays = parsedrawData.filter(rows => rows.length == 1);
        const delayIndex = delays.map(delay => parsedrawData.indexOf(delay));
        const results = [];
        let from = 0;
        delayIndex.forEach(index => {
            results.push({data: rawData.slice(from, index), delayTimer: +rawData[index].join('')});
            from = index + 1;
        });
        return results;
    }

    static csvToArray(data) {
        return data.trim().split('\r\n').map(data => data.split(','));
    }

}