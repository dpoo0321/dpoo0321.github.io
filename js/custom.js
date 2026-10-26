const projects = [
    {name: "Personal Wordmark"},
    {name: "Stencil_portrait"},
];
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const ProjectName = document.querySelectorAll(".project-name");
const leftArrow = document.querySelectorAll(".nav-arrow.left");
const rightArrow = document.querySelectorAll(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex){
    if(isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;
    cards.forEach((cards, i) => {
        const offset = (i - currentIndex + cards.length) % cards.length;
        card.className = "card";

        if(offset === 0) card.classList.add("center");
        else if(offset === 1) card.classList.add("right-1");
        else if(offset === 2) card.ClassList.add("right-2");
        else if(offset === cards.length -1) card.classList.add("left-1");
        else if (offset === cards.length -2) card.classList.add("left-2");
        else card.classList.add("hidden");
    });
    dots.forEach((dot, i)=> dot.classList.toggle("active", i === currentIndex));
    ProjectName.style.opacity = "0";
    setTimeout(() =>{
        ProjectName.textContent = projects[currentIndex].name;
        ProjectName.style.opacity = "1";
    }, 300);
    setTimeout(() => (isAnimating = false), 800);
}
[leftArrow, rightArrow].forEach((arrow, idx) =>
    arrow.addEventListener("click", () => updateCarousel(currentIndex + (idx ? 1 : -1)))
    );
dots.forEach((dot, i)=> dot.addEventListener("click", () => updateCarousel(i)));
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
