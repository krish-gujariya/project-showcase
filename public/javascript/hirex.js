let slide = document.querySelector(".slidingbar"); 
console.log(slide);

function slideleft(){
    slide.scrollBy({
        left: -3200,
        behavior: 'smooth'
    });
    console.log(" left");
}

function slideright(){
    slide.scrollBy({
        left: 3200,
        behavior: "smooth"
    })
}