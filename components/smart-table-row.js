export default class SmartTableRows extends HTMLTableRowElement{
  
  name ='';
  company_name ='';
  price ='';
  change ='';
  chg ='';
  mkt_cap ='';

  constructor() {
      super();
    }

    static get observedAttributes() {
      return ['name',
      'company_name',
      'price',
      'change',
      'chg',
      'mkt_cap'];
    }    
    attributeChangedCallback(attribute, oldValue, newValue) {
      if(oldValue === newValue) return;

      this.onChangeHighlightTextColor(attribute, oldValue);

      if(this.children.namedItem(attribute)){
        this.children.namedItem(attribute).textContent = this.getAttribute(attribute);
        this.children.namedItem(attribute).setAttribute('name', attribute);
      }

      this[attribute] = newValue;
    }

  onChangeHighlightTextColor(attribute, oldValue) {

    const item = this.children.namedItem(attribute);

    if (oldValue) {
      item.setAttribute('style', `color: #FFDF1B;transition: all 0.5s ease-in`);
      setTimeout(() => {
        item.setAttribute('style', `color: #04df99;transition: all 0.5s ease-out`);
      }, 1000);
    }
  }

    connectedCallback(){
      this.render();
    }
    render(){
      const properties = ['name',
      'company_name',
      'price',
      'change',
      'chg',
      'mkt_cap'];
      const rowData = properties.map(property => {
        const td = document.createElement('td');
        td.setAttribute('name', property);
        td.textContent = this[property];
        return td;
      });
      rowData.forEach(data => this.appendChild(data));
    }

}