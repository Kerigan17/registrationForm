export class FormThree {
    constructor() {
        let that = this;
        this.popup = null;
        this.processElement = null;
        this.closeElement = null;
        this.nameElement = null;
        this.phoneElement = null;
        this.name = '';
        this.userLocation = null;
        this.mask = "+375 (__) ___ __ __";
        this.preloaderElement = null;
        this.errorNameElement = null;
        this.errorPhoneElement = null;
        this.timerId = null;
        this.agreeElement = null;

        this.nameElement = document.getElementById('name');
        this.nameElement.addEventListener('input', () => {
            clearTimeout(that.timerId);

            that.timerId = setTimeout(() => {
                that.checkedValuesForm();
                that.checkedName();
            }, 500);
        })

        this.nameElement.onblur = () => {
            this.checkedName();
            this.checkedValuesForm();
        }

        this.phoneElement = document.getElementById('phone');
        fetch("https://ipinfo.io/json?token=e8394fe6541024")
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setLocation(jsonResponse.country);
            });

        this.phoneElement.addEventListener('keydown', (e) => {
            this.phoneMask(e.key);
            clearTimeout(that.timerId);
            that.timerId = setTimeout(() => {
                that.checkedValuesForm();
                that.checkedPhone();
            }, 1000);
        });
        this.phoneElement.addEventListener('input', (e) => {
            this.checkedPhoneValue(true);
            e.target.value = that.mask;
        });
        this.phoneElement.onblur = () => {
            if (that.phoneElement.value === '') {
                this.checkedPhoneValue(false);
            }
        }

        this.popup = document.getElementById('popup');
        this.popup.style.display = 'none';

        this.closeElement = document.getElementById('close-popup');
        this.closeElement.onclick = () => {
            that.popup.style.display = 'none';
        }

        this.preloaderElement = document.getElementById('preloader');
        this.preloaderElement.classList.remove('active');

        this.processElement = document.getElementById('btn');
        this.processElement.disabled = true;
        this.processElement.onclick = () => {
            this.preloaderElement.classList.add('active');
            setTimeout(() => {
                this.preloaderElement.classList.remove('active');
                that.popup.style.display = 'flex';

                this.phoneElement.value = '';
                this.nameElement.value = '';
                this.name = '';
                this.processElement.disabled = true;
            }, 3000)
        }

        this.errorNameElement = document.getElementById('error-name');
        this.errorPhoneElement = document.getElementById('error-phone');

        this.agreeElement = document.getElementById('agree');
        this.agreeElement.addEventListener('change', () => {
            this.checkedValuesForm();
        })
    }

    setLocation(value) {
        if (value) {
            this.userLocation = value;

            if (this.userLocation === 'BY') {
                this.mask = "+375 (__) ___ __ __";
            } else if (this.userLocation === 'RU') {
                this.mask = "+7 (___) ___ ____";
            }
            this.phoneElement.placeholder = this.mask;
        }
    }

    checkedName() {
        if (/^[А-Я][а-я]+$/.test(this.nameElement.value)) {
            this.name = this.nameElement.value;
            this.nameElement.style.borderColor = '#E3E3E3';
            this.errorNameElement.style.display = 'none';
        } else {
            this.nameElement.style.borderColor = 'red';
            this.errorNameElement.style.display = 'block';
        }
    }

    checkedPhone() {
        if (this.phoneElement.value.indexOf('_') !== -1) {
            this.checkedPhoneValue(false);
        } else {
            this.checkedPhoneValue(true);
        }
    }
    checkedPhoneValue(status) {
        if (status) {
            this.phoneElement.style.borderColor = '#E3E3E3';
            this.errorPhoneElement.style.display = 'none';
        } else {
            this.phoneElement.style.borderColor = 'red';
            this.errorPhoneElement.style.display = 'block';
        }
    }

    checkedValuesForm() {
        if (this.name !== '' && this.phoneElement.value.indexOf('_') === -1 && this.agreeElement.checked) {
            this.processElement.disabled = false;
        } else {
            this.processElement.disabled = true;
        }
    }

    phoneMask(symbol) {
        if (Number(symbol)) {
            this.mask = this.mask.replace('_', symbol);
        } else if (symbol === 'Backspace') {
            if (this.mask[this.mask.indexOf('(')+1] !== '_') {
                for (let i = this.mask.length; i >= 0; i--) {
                    if (Number(this.mask[i])) {
                        this.mask = this.mask.slice(0, i) + '_' + this.mask.slice(i+1, this.mask.length)
                        return this.mask;
                    }
                }
            }
        }
        return this.mask;
    }
}