const template = document.createElement('template');
template.innerHTML = `
<style>
    :host{
        display: flex;
        flex-flow: row nowrap;
        gap: 10px;
        font-size: 14px;
        color: #000;
    }
</style>
        <div id="color"></div>
        <span id="companyName"></span>
`;
export default class GraphInfo extends HTMLElement{
    _name= '';
    _color = '';


    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(template.content.cloneNode(true));
    }
    
    set color(value){
        this._color = value;
        this.render();
    }
    get color(){
        return this._color;
    }

    set name(value){
        this._name = value;
        this.render();
    }
    get name(){
        return this._name;
    }

    connectedCallback(){
        if(this.isConnected){
            this.render();
        }
    }

    
    attributeChangedCallback(){
        return ['color', 'name'];
    }
    render(){
        
        this.shadowRoot.getElementById('companyName').textContent = this.getAttribute('name');
        this.shadowRoot.getElementById('color').style.width = '10px';
        this.shadowRoot.getElementById('color').style.height = '10px';
        this.shadowRoot.getElementById('color').style.border = '1px solid black';
        this.shadowRoot.getElementById('color').style.backgroundColor = this.getAttribute('color');
        this.shadowRoot.getElementById('color').style.borderRadius = '3px';
    }
}