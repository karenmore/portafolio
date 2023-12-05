function changeText(label) {
    const phrase = label.textContent;
    let text = '';
    for(const item of phrase) {
        if(item !==' '){
            text += `
                <b>${item}</b>
            `;
        }else {
            text += `
                <b>${item}</b>
            `;
        }
    }
    label.innerHTML = text;
}
function animateText(label) {
    const text = document.querySelectorAll('b');
    let i = 0;
    const pint = setInterval(() =>  {
        text[i].classList.toggle('zoom');
        i++;
        if(i>=text.length){
            clearInterval(print);
            i = 0;
            const clean = setInterval(() =>  {
                text[i].classList.toggle('zoom');
                i++;
                if(i>=text.length){
                    clearInterval(clean);
                }
            },200);
        }
    },200);
}
function skills() {
    const skill = document.querySelector('.slider__skills');
    const list = document.querySelectorAll('.slider__skills img');
    const images = Array.from(list).map(element => element.getAttribute('src'));

    let count = 0;
    let html = `<img src="${images[count]}" alt="hard skill"></img>`
    skill.innerHTML = html;
    const prev = document.querySelector('.btn_prev');
    const next = document.querySelector('.btn_next');
    prev.addEventListener('click', () => {
        clearInterval(interval);
        if(0 < count ) {
            count--;
        }else {
            count = images.length-1;
        }
        html = `<img src="${images[count]}" alt="hard skill"></img>`;
        skill.innerHTML = html;
    });
    next.addEventListener('click', () => {
        clearInterval(interval);
        if(count < images.length-1 ) {
            count++;
        }else {
            count = 0;
        }
        html = `<img src="${images[count]}" alt="hard skill"></img>`;
        skill.innerHTML = html;
    });
    const interval = setInterval(() =>{
        if(count < images.length-1 ) {
            count++;
        }else {
            count = 0;
        }
        html = `<img src="${images[count]}" alt="hard skill"></img>`;
        skill.innerHTML = html;
    },2000);
}
function mode() {
    const body = document.querySelector('body');
    const btn = document.querySelector('.icon_mode');
    const icon = document.querySelector('.icon_mode ion-icon');
    const iframe = document.querySelector('.header iframe');
    const link = iframe.contentDocument.querySelector('link');
    console.log(link.href);
    btn.addEventListener('click',() => {  
        body.classList.toggle('dark');
        if(icon.name ==='sunny-sharp') {
            icon.name = 'moon-sharp';
        }else {
            icon.name = 'sunny-sharp';
        }
        if(link.getAttribute('href')==='./src/background-animation/dark.css') {
            link.href = './src/background-animation/style.css';
        }else {
            link.href = './src/background-animation/dark.css';
        }
    });
}
function sound() {
    const btn = document.querySelector('.icon_volumen');
    const icon = document.querySelector('.icon_volumen ion-icon');
    const audio = document.querySelector('.icon_volumen audio');
    btn.addEventListener('click', () => {
        if(icon.name === 'volume-mute-sharp') {
            icon.name = 'volume-high-sharp';
        }else {
            icon.name =  'volume-mute-sharp';
        }
        if(audio.paused) {
            audio.play();
        }else {
            audio.pause();
        }
    });
}
function social() {
    const h1 = document.querySelector('h1');
    const nav = document.querySelector('.header_nav');
    const footer = document.querySelector('.footer');
    footer.classList.toggle('active');
    changeText(h1);
    animateText(h1);
    setTimeout(() => {
        footer.classList.toggle('active');        
    }, 2000);
    nav.addEventListener('click',() => {
        footer.classList.toggle('active');
        animateText(h1);
        setTimeout(() => {
            footer.classList.toggle('active');        
        }, 2000);
    });
}
async function getApi() {
    const url = 'https://fundametos-api-porfolios-dev-exsn.2.ie-1.fl0.io/api/v1/projects';
    try {
        const data =  await fetch(url);
        const res = await data.json();
        localStorage.setItem('projects', JSON.stringify(res));
        return res;
    }catch (error) {
        console.log(error);
    }
}
function printProjects (projects) {
    const list = document.querySelectorAll('.splide__slide');
    const path = location.href.split('/').at(-1).at(0)
    projects.forEach((project, i) => {
        const {descripcion, image, tecnologias, titulo, 
            description, technologies, title } = project;
        let html = '';
        if (path ==='e') {
            html = `        
            <div>
                <h3>${title}</h3>
                <p>${description}</p>
                <p>${technologies}</p>
            </div>
            <figure>
                <img src="${image}" alt="slider item">
            </figure>`;
        }else {
            html = `        
            <div>
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
                <p>${tecnologias}</p>
            </div>
            <figure>
                <img src="${image}" alt="slider item">
            </figure>`;
        }
        list[i].innerHTML = html;
    });
}
function slider () {
    const splide = new Splide( '.splide', {
        type: 'loop',
        autoplay: true,
        speed: 1000,
        breakpoints: {
            849: {
                direction: 'ttb',
                height: '65vh',
            },
        } 
      } );
    splide.mount();
}
async function main () {
    const projects = JSON.parse(localStorage.getItem('projects')) || await getApi();
    printProjects(projects) ;
    skills();
    mode();
    sound();
    social();
    slider();
}
main();