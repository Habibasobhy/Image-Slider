let myImages = Array.from(document.querySelectorAll(".slide-image img"));
let SliderImage = document.querySelector(".slider-image img");
let nextBtn = document.querySelector(".prev-next .next");
let prevBtn = document.querySelector(".prev-next .prev");
let dots = Array.from(document.querySelectorAll(".dot"));
let currentIndex = 0;
let autoSlideInterval;
let startX = 0;


// for(let i = 0; i<myImages.length; i++){
//     myImages[i].addEventListener("click" , function(eventInfo){
//         let currentImgSrc = eventInfo.target.getAttribute("src");
//         currentIndex = myImages.indexOf(eventInfo.target); 
//         SliderImage.setAttribute("src",`${currentImgSrc}`);

//         updateActiveDot();
//     })
// }

// Function to update the displayed image and active dot
function updateSliderImage() {
    SliderImage.style.opacity = 0; 
    setTimeout(function() {
        SliderImage.setAttribute("src", myImages[currentIndex].getAttribute("src"));
        SliderImage.style.opacity = 1; 
    }, 500); 
    updateActiveDot();
}

// Function to update the active dot using a for loop
function updateActiveDot() {
    for (let index = 0; index < dots.length; index++) {
        if (index === currentIndex) {
            dots[index].classList.add("active"); 
        } else {
            dots[index].classList.remove("active");
        }
    }
}

// Add click event for each thumbnail image using a for loop
for (let i = 0; i < myImages.length; i++) {
    myImages[i].addEventListener("click", function () {
        currentIndex = i; 
        updateSliderImage();
    });
}

// Add click event for pagination dots using a for loop
for (let j = 0; j < dots.length; j++) {
    dots[j].addEventListener("click", function() {
        currentIndex = j; 
        updateSliderImage();
    });
}

// Event listeners for next and previous buttons
nextBtn.addEventListener("click" , nextSlide);
prevBtn.addEventListener("click" , prevSlide);

// Function to move to the next slide
function nextSlide(){
    currentIndex++;
    if (currentIndex >= myImages.length) currentIndex = 0;
    SliderImage.setAttribute("src",`${myImages[currentIndex].getAttribute("src")}`);
    updateActiveDot();
}

// Function to move to the prev slide
function prevSlide(){
    currentIndex--;
    if (currentIndex < 0) currentIndex = myImages.length - 1;
    SliderImage.setAttribute("src",`${myImages[currentIndex].getAttribute("src")}`);
    updateActiveDot();
}

// Set up the automatic slide transition
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Change image every 5 seconds
}

// Pause the automatic slide on hover
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Add event listeners to the slider for hovering functionality
SliderImage.addEventListener("mouseenter", stopAutoSlide);
SliderImage.addEventListener("mouseleave", startAutoSlide);

// Start auto-slide when the page loads
startAutoSlide();


SliderImage.addEventListener("touchstart", function(event) {
    startX = event.touches[0].clientX;
});

SliderImage.addEventListener("touchend", function(event) {
    let endX = event.changedTouches[0].clientX;
    let deltaX = startX - endX;

    if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            nextSlide(); // التمرير إلى اليسار يعني الانتقال إلى الصورة التالية
        } else {
            prevSlide(); // التمرير إلى اليمين يعني الانتقال إلى الصورة السابقة
        }
    }
});