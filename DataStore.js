
export default class DataStore extends Map{
    static companies = ['GOOG','BIDU','YNDX','BCOR','YHOO',
                         'MSFT', 'IACI','FB','AAPL', 'TWTR'];
    static columns = [];
    constructor(){
        super();
        DataStore.companies.forEach(company => this.set(company, []));
    }
    isEmpty(){
        return this.size === 0;
    }
    
    addToStore(callback, ...args){
        args[0].forEach((arg, i) => {
            const hasValue = arg[0].length != 0;
            const key = hasValue ? arg[0] : DataStore.companies[i];
            const data = super.get(key);
            const isEmptyArray = data.length === 0;
            if(isEmptyArray) data.concat([arg]);
            data.push(arg);
            super.set(key, data);
        });
        callback(this);
    }
}