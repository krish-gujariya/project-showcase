let title;


let w = document.getElementById('ccs');

let tempel = document.querySelector('.row');
function newcontent(entity) {
    tempel.style.backgroundColor = "#f0f6ff71"
    child = entity.children[1];
    entity.style.backgroundColor = "#c6ddff";
    title = child.innerHTML;
    let c = `
    <div class="head1">
    <h3>The Best Managed Cloud Hosting For ${title} </h3>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In nisi sed ipsa, at veniam ad voluptatum, dolorem nemo soluta, libero officia quis! Commodi, sit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, repudiandae. </p>
    </div>
    <div class="option">
    <ul>
    <li>Unlimited Bandwidth</li> 
    <li>Network Speed</li> 
    <li>Turbo power</li> 
    <li>Xtreme Freedom</li> 
    </ul>
    </div>
    <div class="md">
    <a href="http://">More Detail</a>
    </div>
    `;
    w.innerHTML = c;
    tempel = entity;
    }


let c = document.querySelector('.slide');




let card = `
<div class="card1">
    <div class="cus">
        <img src="imags/awan/profile.png" alt="">
    </div>
    <div class="star">
        <img src="imags/awan/Star 2.png" alt="">
        <img src="imags/awan/Star 2.png" alt="">
        <img src="imags/awan/Star 2.png" alt="">
        <img src="imags/awan/Star 2.png" alt="">
        <img src="imags/awan/Star 2.png" alt="">
    </div>
    <div class="containt">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates quidem ratione
            tempore, iure sed quae.</p>
        <p class="name">Guys Hawkins</p>
        <p>Manager</p>
    </div>
</div>
`;

function create(){
    const div1 = document.createElement('div');
    div1.setAttribute("class" , "contin mutate");
    div1.innerHTML = card;
    return div1;
}

function scrollleft(){
    c.scrollBy({
        left: -900,
        behavior: 'smooth'
    })
}

function scrollright(){
    c.scrollBy({
        left: 900,
        behavior: 'smooth'
    })
    c.appendChild(create());
}