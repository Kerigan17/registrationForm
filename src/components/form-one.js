export class FormOne {
    constructor() {
        this.processElement = null;
        this.ageElement = null;
        this.ageCountElement = null;
        this.ageMinElement = null;
        this.ageMaxnElement = null;
        this.ageMin = 18;
        this.ageMax = 35;
        this.ageCount = 0;
        this.gender = '';
        this.genderManElement = null;
        this.genderWomanElement = null;
        this.ageNowElement = null;
        this.widthRangeElement = 0;
        this.step = 0;
        let that = this;

        this.processElement = document.getElementById('btn');
        this.processElement.onclick = function () {
            if (that.gender !== '' && that.ageCount) {
                console.log(that.ageCount);
                console.log(that.gender);
                location.href = '#/form-two';
            }
        }

        this.ageElement = document.getElementById('age');
        this.widthRangeElement = this.ageElement.offsetWidth;
        this.ageMinElement = document.getElementById('min-age');
        this.ageMaxnElement = document.getElementById('max-age');
        this.ageNowElement = document.getElementById('age-now-element');
        this.ageCountElement = document.getElementById('age-now')

        this.ageCount = this.ageElement.value;
        this.ageCountElement.innerText = this.ageCount;
        this.ageMinElement.innerText = this.ageMin;
        this.ageMaxnElement.innerText = this.ageMax;
        this.ageElement.min = this.ageMin;
        this.ageElement.max = this.ageMax;

        let posAgeElement = this.widthRangeElement/2 - this.ageNowElement.offsetWidth * 2 - 5;
        this.step = this.widthRangeElement / (this.ageMax - this.ageMin) - 3;
        this.ageNowElement.style.left = posAgeElement + 'px';
        this.ageElement.onchange =  () => {
            that.ageCount = that.ageElement.value;
        }
        this.ageElement.oninput = () => {
            if (Number(that.ageCountElement.innerText) < Number(that.ageElement.value)) {
                posAgeElement = posAgeElement + that.step;
            } else if (Number(that.ageCountElement.innerText) > Number(that.ageElement.value)){
                posAgeElement = posAgeElement - that.step;
            }
            that.ageCountElement.innerText = that.ageElement.value;
            that.ageNowElement.style.left = posAgeElement + 'px';
        }

        this.genderManElement = document.getElementById('man');
        this.genderWomanElement = document.getElementById('woman');

        this.genderManElement.onclick = () => {
            that.gender = 'man';
            if (that.processElement.disabled) {
                that.processElement.disabled = false;
            }
        }
        this.genderWomanElement.onclick = () => {
            that.gender = 'woman';
            if (that.processElement.disabled) {
                that.processElement.disabled = false;
            }
        }
    }
}