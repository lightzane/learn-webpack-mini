// import './style.scss'; // already imported in "entry" of webpack.config.js

import { btnAdd, form, output, x, y } from "./app/constants/general";

document.addEventListener('DOMContentLoaded', () => {

    btnAdd.addEventListener('click', () => {
        alert(+x.value + +y.value);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        output.innerText = JSON.stringify({ username: form.username.value, password: form.password.value }, null, 4);
    });

    // to demo debugging and usage of sourceMap files
    const person: any = {};
    console.log(person.fly());

});