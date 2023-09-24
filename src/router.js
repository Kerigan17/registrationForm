import {FormOne} from "./components/form-one.js";
import {FormTwo} from "./components/form-two.js";
import {FormThree} from "./components/form-three.js";

export class Router {
    constructor() {
        this.routes = [
            {
                route: '#/form-one',
                title: 'Форма 1',
                template: 'templates/form-one.html',
                page: 1,
                load: () => {
                    new FormOne();
                }
            },
            {
                route: '#/form-two',
                title: 'Форма 2',
                template: 'templates/form-two.html',
                page: 2,
                load: () => {
                    new FormTwo();
                }
            },
            {
                route: '#/form-three',
                title: 'Форма 3',
                template: 'templates/form-three.html',
                page: 3,
                load: () => {
                    new FormThree();
                }
            },
        ]
    }

    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
        });

        if (!newRoute) {
            window.location.href = '#/form-one';
            return;
        }

        document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());
        document.getElementById('page-title').innerText = newRoute.title;
        document.getElementById('page').innerText = newRoute.page;
        newRoute.load();
    }

}