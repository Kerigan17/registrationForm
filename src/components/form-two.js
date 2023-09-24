export class FormTwo {
    constructor() {
        this.processElement = null;
        this.city = 'Минск';
        this.optionControls = null;
        this.optionHeadElement = null;
        this.optionBodyElement = null;
        this.textElement = null;
        this.message = '';
        let that = this;

        this.textElement = document.getElementById('text')
        this.optionBodyElement = document.getElementById('option-body');
        this.optionBodyElement.style.display = 'none';

        this.optionHeadElement = document.getElementById('option-head');
        this.optionHeadElement.onclick = () => {
            if (that.optionBodyElement.style.display === 'none') {
                that.optionBodyElement.style.display = 'block';
                that.optionHeadElement.style.borderRadius = '10px 10px 0 0';
            } else {
                that.optionBodyElement.style.display = 'none';
            }
        }

        this.textElement.addEventListener('input', () => {
            that.message = that.textElement.value;

            if (that.textElement.value !== '') {
                that.processElement.disabled = false;
            } else {
                that.processElement.disabled = true;
            }
        });

        this.optionControls = document.getElementsByClassName('form-select-body-item');
        for (let i = 0; i < this.optionControls.length; i++) {
            this.optionControls[i].onclick = (event) => {
                that.city = event.target.innerText;
                that.optionBodyElement.style.display = 'none';
                that.optionHeadElement.children[0].innerText = that.city;
            }
        }

        this.processElement = document.getElementById('btn');
        this.processElement.onclick = () => {
            if (that.city && that.message !== '') {
                location.href = '#/form-three';
            }
        }
    }

}