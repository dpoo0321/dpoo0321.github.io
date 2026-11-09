const projects = [
    {name: "Personal Wordmark", desc: "This was my first project in my design class and the purpose was create a wordmark, then make a design with the sketches. Honestly, it doesn't have an actual meaning. I just found it funny and that's all."},
    {name: "Stencil portrait", desc: "A portrait of Tom Holland using a technique that consist in only showing the shadow's of the person that you want to draw. This was one of my favorite activities."},
    {name: "Tesellation", desc: "A cardboard that has a shape of a drawing that follows a truchet pattern. I use a laser cutter to put that shape twice and make different shapes."},
    {name: "Design Project", desc: "My personal design project. Here I'm working on the design of a idea for a videogame that is for a school project."},
    {name: "Tangram", desc: "Just a Tangram that I designed with digital tools and then I printed with the laser cutter."},
    ];
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const ProjectName = document.querySelector(".project-name");
const ProjectDesc = document.querySelector(".project-desc")
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex){
    if(isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;
    cards.forEach((card, i) => {
        const offset = (i - currentIndex + cards.length) % cards.length;
        card.className = "card";

        if(offset === 0) card.classList.add("center");
        else if(offset === 1) card.classList.add("right-1");
        else if(offset === 2) card.classList.add("right-2");
        else if(offset === cards.length -1) card.classList.add("left-1");
        else if (offset === cards.length -2) card.classList.add("left-2");
        else card.classList.add("hidden");
    });
    dots.forEach((dot, i)=> dot.classList.toggle("active", i === currentIndex));
    ProjectName.style.opacity = "0";
    setTimeout(() =>{
        ProjectName.textContent = projects[currentIndex].name;
        ProjectDesc.textContent = projects[currentIndex].desc;
        ProjectName.style.opacity = ProjectDesc.style.opacity = "1";
    }, 300);
    setTimeout(() => (isAnimating = false), 800);
}
[leftArrow, rightArrow].forEach((arrow, idx) =>
    arrow.addEventListener("click", () => updateCarousel(currentIndex + (idx ? 1 : -1)))
    );
dots.forEach((dot, i) => dot.addEventListener("click", () => updateCarousel(i)));
cards.forEach((card, i) => card.addEventListener("click", () => updateCarousel(i)));

document.addEventListener("keydown", (e) =>{
    if(e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
    if(e.key === "ArrowRight") updateCarousel(currentIndex + 1);
});

let touchStartX = 0;
document.addEventListener("touchstart", (e) => (touchStartX - e.changedTouches[0].screenX));
document.addEventListener("touchend", (e) =>{
    const diff =touchStartX = e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) updateCarousel(currentIndex + (diff > 0 ? 1 : -1));
});
updateCarousel(0);
