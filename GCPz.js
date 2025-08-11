//image array and button functions
let arrayImages = [
    "cat1.jpg",
    "dog1.jpg",
    "cat2.jpg",
    "dog2.jpg",
];

let currantSlide = 0;
let soundO = true; // cats starts then switchws to dog
let meow = new Audio('meow.mp3');
let woof = new Audio('woof.mp3');


function displaySlideshowImage(ImgLocation){
    //grabs photo location
    let imgelement = document.getElementById("imgslide");
    //grabs the images form the array
    imgelement.src = arrayImages[ImgLocation];

}

//previous button and next button
function prevSlide(){
    //subtracts 1 to the slide counter
    currantSlide = currantSlide -1;
    //checks to see if currantslide = 0
    if (currantSlide < 0){
        // cycles to the 4th image
        currantSlide = arrayImages.length -1;

    }
    if(soundO){
        woof.play();
        soundO=false;

    }else{
        meow.play();
        soundO=true;
    }
    displaySlideshowImage(currantSlide);
}

function nextSlide(){
    //adds 1 to the slide counter
    currantSlide = currantSlide + 1

    //checks to see if the slide counter goes over the lenght of the array
    if (currantSlide == arrayImages.length){
        //cylces the loop
        currantSlide = 0;
    }
    if(soundO){
        woof.play();
        soundO=false;

    }else{
        meow.play();
        soundO=true;
    }
    
    displaySlideshowImage(currantSlide);
}

displaySlideshowImage(currantSlide);