export default class SmartTable extends HTMLTableElement{
    _rowValues = [];
    _columnNames = [];

    constructor() {
        super();
      }

    set rowValues(values){
        if(this.rowValues.length <= 0){
            this._rowValues = values;
            this.render();
            return;
        }
        this.update(values);
    }
    get rowValues(){
        return this._rowValues;
    }


    set columnNames(values){
        if(this.columnNames.length <= 0){
            this._columnNames = values;
            return;
        }
    }

    get columnNames(){
        return this._columnNames;
    }
    

    async connectedCallback() {
        if(this.isConnected) {
            this.render();
        }
    }

    update(rowValues){

        const rows = Array.from(rowValues).slice(0, -1).map(row => row[1]);

        for (let index = 0; index < rows.length; index++) {
            const rowData =  this.selectLastArrayAndFilterEmptyValues(rows, index);
            if(rowData.length <= 0) continue;
            this.updateTableRowAttributes(index, rowData);
            this.updateTableFooter();
            }
    }
    updateTableFooter() {
        var options = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        };
        var today = new Date();
        this.querySelector('tfoot').textContent = `updated @ ${today.toLocaleDateString("en-GB", options)}`;
    }

    selectLastArrayAndFilterEmptyValues(Values, index) {
        return Values[index].slice(-1)[0].filter(n => n);
    }

    updateTableRowAttributes(index, rowData) {
        const row = this.rows.item(index);
        row.setAttribute('price', rowData[0]);
        row.setAttribute('change', rowData[1]);
        row.setAttribute('chg', rowData[2]);
    }

    render(){
        if(this.rowValues.length <= 0) return;
        const rows = Array.from(this.rowValues).slice(0, -1);
        const columns = this.renderHeaders();
        this.renderRows(rows, columns);
    }

    renderRows(rows, columns) {
        rows.forEach(rowValues => {
            const smartTableRow = document.createElement('tr', { is: "smart-table-row" });
            columns.forEach((column, index) => {
                const key = (column === 'Chg %') ? column.replace(' %', '') : column.replace(' ', '_');
                smartTableRow.setAttribute(key.toLowerCase(), rowValues[1][0][index]);
            });
            this.querySelector('tbody').appendChild(smartTableRow);
        });
    }

    renderHeaders() {
        const columns = this.rowValues.get('columns');
        const tr = document.createElement('tr');
        columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column;
            tr.appendChild(th);
        });
        this.querySelector('thead').appendChild(tr);
        return columns;
    }
}