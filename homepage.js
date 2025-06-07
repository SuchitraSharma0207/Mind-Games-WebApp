let navbar = document.querySelector('.header .flex .navbar');
let menuBtn = document.querySelector('#menu-btn');
let header = document.querySelector('.header');

menuBtn.onclick = () =>{
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('fa-times');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    menuBtn.classList.remove('fa-times');

    if(window.scrollY > 0){
        header.classList.add('active')
    }
    else{
        header.classList.remove('active')
    }

}