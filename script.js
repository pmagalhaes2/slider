const previousEl = document.getElementById('previous');
const nextEl = document.getElementById('next');
const sliderEl = document.getElementById('slider');
let interval = undefined;
let timeout = undefined;
let selectedImgIndex = 0;

previousEl.addEventListener('click', onPreviousClick);
nextEl.addEventListener('click', onNextClick);

autoScroll();

function onPreviousClick() {
    const sliderWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft -= sliderWidth;
    --selectedImgIndex;
    handleActiveDot()
    handleSliderClick();
}

function onNextClick() {
    const sliderWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft += sliderWidth;
    ++selectedImgIndex;
    handleActiveDot()
    handleSliderClick();
}

function handleSliderClick() {
    clearTimeout(timeout);
    clearInterval(interval);
    interval = undefined;
    timeout = setTimeout(() => {
        autoScroll();
    }, 10000);
}


function handleActiveDot() {
    const list = Array.from(document.getElementsByClassName('dot'));
    if (selectedImgIndex < 0) selectedImgIndex = 0;
    if (selectedImgIndex >= list.length) selectedImgIndex = list.length - 1;
    list.forEach(el => el.classList.remove('active'));
    list[selectedImgIndex].classList.add('active');
}

function autoScroll() {
    if (interval) return;

    interval = setInterval(() => {
        const sliderWidth = sliderEl.offsetWidth;
        const numberOfImages = sliderEl.childElementCount;
        const selectedImage = (sliderEl.scrollLeft / sliderWidth) + 1;

        if (numberOfImages === selectedImage) {
            sliderEl.scrollLeft = 0;
            selectedImgIndex = 0;
            handleActiveDot()
            return
        }

        sliderEl.scrollLeft += sliderWidth;
        ++selectedImgIndex;
        handleActiveDot()
    }, 3000);
}