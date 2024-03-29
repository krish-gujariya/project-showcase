const right = document.getElementById("right");
const left  =document.getElementById("left");
const sliders = document.getElementsByClassName("slidebar");
console.log(sliders[0 ]);

right.addEventListener('click', (event)=>{
    sliders[0].scrollBy({left:-245, behavior:'smooth'});
})

left.addEventListener("click", (event)=>{
    sliders[0].scrollBy({left:245, behavior:'smooth'});
})