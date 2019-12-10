window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //Tabs
    let  tab = document.querySelectorAll('.info-header-tab'),
         info = document.querySelector('.info-header'),
         tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a){
        for(let i =a;i<tabContent.length;i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }   

    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for(let i =0;i<tab.length;i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
   
    // let sec = 11,
    //     min = 20,
    //     hour = 18;

    // let id = setTimeout(function log(){
    //     if(sec <=0){
    //         sec = 60;
    //         //document.querySelector('.seconds').textContent = sec -= 1;
    //         document.querySelector('.minutes').textContent = min -= 1;
    //     }
    //     if (min <= 0){
    //         min = 60;
    //         document.querySelector('.minutes').textContent = min -= 1;
    //         document.querySelector('.hours').textContent = hour -= 1;
    //     }
    //     else{
    //         document.querySelector('.seconds').textContent = sec -= 1;
    //     }
    //     setTimeout(log,1000);
    // });
    
    
    // let sec = 11,
    //     min = 20,
    //     hour = 18;

    // let id = setInterval(frame,1000);    
    
    // function frame(){   
    //     if(sec <=0){
    //         sec = 60;
    //         //document.querySelector('.seconds').textContent = sec -= 1;
    //         document.querySelector('.minutes').textContent = min -= 1;
    //     }
    //     if (min <= 0){
    //         min = 60;
    //         document.querySelector('.minutes').textContent = min -= 1;
    //         document.querySelector('.hours').textContent = hour -= 1;
    //     }
    //     else{
    //         document.querySelector('.seconds').textContent = sec -= 1;
    //     }
    // }

    //Timer
    let deadline = '2019-12-12';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000)%60),
            min = Math.floor((t/1000/60)%60),
            hour = Math.floor((t/(1000*60*60)));
        
        return {
            'total' : t,
            'hours' : hour,
            'minutes' : min,
            'seconds' : seconds
        };
    }

    function SetClock(id,endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            second = timer.querySelector('.seconds'),
            timeInteval =  setInterval(UpdateClock,1000);


        function UpdateClock(){
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            second.textContent = t.seconds;

            if(t.total <= 0){
                clearInterval(timeInteval);
                hours.textContent = "00";
                minutes.textContent = "00";
                second.textContent = "00";
            }
            if(t.seconds >= 0 && t.seconds <=9){
                second.textContent = "0"+t.seconds;
            }
            if(t.minutes >= 0 && t.minutes<=9){
                minutes.textContent = "0"+t.minutes;
            }
            if(t.hours >= 0 && t.hours<=9){
                hours.textContent = "0"+t.hours;   
            }

        }
    }

    SetClock('timer',deadline);


    //Modal for mail

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click',function() {
        overlay.style.display = 'block';       
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click',function() {
        overlay.style.display = 'none';
        this.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    // AJAX
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.textContent = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.textContent = message.success;
            } else {
                statusMessage.textContent = message.failure;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }

        //fetch API
        //sendForm();
    });


    //Вариант через  fetch api
    // async function sendForm(){
    // const url = 'https://reqres.in/api/users';
    //     let formData = new FormData(form);
    //     let obj = {};
    //     formData.forEach(function(value, key){
    //          obj[key] =  value;
    //     });
    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST', // или 'PUT'
    //             body: JSON.stringify(obj),
    //             headers: {
    //             'Content-Type': 'application/json'
    //             }
    //         });
    //         const json = await response.json();
    //         console.log('Успех:', JSON.stringify(json));
    //     } 
    //     catch (error) {
    //         console.error('Ошибка:', error);
    //     }
    // }

    //Калькулятор
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('input', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum)*4000 ;

        if(restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('input', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if(persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('input', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });


    //слайдер
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n); 
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });


    //отправка второй формы
    let contact_form = document.getElementById('form');
    contact_form.addEventListener('submit', function(event) {
        event.preventDefault();
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        let formData = new FormData(contact_form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);
    });

}); 