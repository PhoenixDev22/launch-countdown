const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const secs = 1000;
const mins = 60;
const hs = 60;
const ds = 24;

const today = new Date().getTime();
const endDate = new Date().setHours(new Date().getHours() + 215)
let  t, days , minutes, hours , seconds;

const counter = setInterval(() => {
    let now = new Date().getTime(); // The current time in  milliseconds
    let timeLeft = parseInt(localStorage.getItem('t')); // Get The leftTime for the Launching if it exists in the local storage
   
    if (parseInt(localStorage.getItem('t')) <= 0) {
        localStorage.removeItem('t');
        clearInterval(counter);
        document.querySelector('.title').textContent = 'Countdown is Over';
        document.getElementById('counter').hidden = true;
    }

    if (timeLeft > 0) {
        t = timeLeft - 1000
    } else {
        t = endDate - now;  // Calculate the remaining time
    }
    

    days = Math.floor(t / (secs * mins * hs * ds));
    hours = Math.floor((t % (secs * mins * hs * ds)) / (secs * mins * hs));
    minutes = Math.floor((t % (secs * mins * hs)) / (secs * mins))
    seconds = Math.floor((t % (secs * mins)) / secs);

    flip(document.querySelector("[data-seconds]"), seconds);
    flip(document.querySelector("[data-minutes]"), minutes);
    flip(document.querySelector("[data-hours]"), hours);
    flip(document.querySelector("[data-days]"), days);
 
    timeLeft =  days * secs * mins * hs * ds + hours * secs * mins * hs + minutes * secs * mins + seconds * secs  
    localStorage.setItem('t', `${timeLeft}`)
   
}, 1000)


function flip(card, newNumber) {
    const topEl = card.querySelector('.top-number');
    const bottomEl = card.querySelector('.bottom-number');
    const startNumber = parseInt(topEl.textContent);
   
    if (newNumber === startNumber) return
 
    // Create top layer of the counter item to  be animated
    const createdTopEl = document.createElement('span');
    createdTopEl.classList.add('top-flip');

    const createdBottomEl = document.createElement('span');
    createdBottomEl.classList.add('bottom-flip');

    topEl.textContent = ("0" + startNumber.toString()).slice(-2)
    bottomEl.textContent = ("0" + startNumber.toString()).slice(-2)
    createdTopEl.textContent = ("0" + startNumber.toString()).slice(-2)
    createdBottomEl.textContent = ("0" + newNumber.toString()).slice(-2)

    createdTopEl.addEventListener('animationstart', () => {
        topEl.textContent = ("0" + newNumber.toString()).slice(-2);
    })
    createdTopEl.addEventListener('animationend', () => {
        createdTopEl.remove();
    })
    createdBottomEl.addEventListener('animationend', () => {
        bottomEl.textContent = ("0" + newNumber.toString()).slice(-2)
        createdBottomEl.remove();
    })
    card.append(createdTopEl, createdBottomEl)
} 


