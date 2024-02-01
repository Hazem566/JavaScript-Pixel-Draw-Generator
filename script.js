const heightRange = document.getElementById('height__range');
const widthRange = document.getElementById('width__range');
const heightValue = document.querySelector('.height__value');
const widthValue = document.querySelector('.width__value');
const drawBord = document.querySelector('.drawBord');
// Target Buttons
const clearBtn = document.getElementById('clear');
const createBtn = document.getElementById('create');
const paintBtn = document.getElementById('paint');
const eraseBtn = document.getElementById('erase');
const colorInput = document.getElementById('color');

// style button background 
const btns = document.querySelectorAll('button');
btns.forEach( btn => {
    btn.addEventListener('click', () => {
        btns.forEach( btn => btn.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Display Rangs value
window.onload = () => {
    heightRange.value =0;
    widthRange.value =0;
    heightValue.innerHTML = "00";
    widthValue.innerHTML = "00";
    drawBord.innerHTML = '';
    btns.forEach(btn => btn.classList.remove('active'));
}
const handleNumber = (num) => {
    return num.toString().padStart(2, 0);
};
heightRange.addEventListener('input', () => {
    heightValue.innerText = handleNumber(heightRange.value);
});
widthRange.addEventListener('input', () => {
    widthValue.innerText = handleNumber(widthRange.value);
});


// project setup
draw = false;
erase = false;

clearBtn.addEventListener('click', () => {
    drawBord.innerHTML = '';
});
paintBtn.addEventListener('click', () => {
    erase = false;
});
eraseBtn.addEventListener('click', () => {
    erase = true;
});


// Satrt Project 
createBtn.addEventListener('click', () => {
    drawBord.innerHTML = '';
    let count = 0;
    for(let i=0;i<heightRange.value;i++) {
        count += 2;
        const boxsContainer = document.createElement('div');
        boxsContainer.classList.add('boxsContainer');
        for (let x=0;x<widthRange.value;x++) {
            count += 2;
            const box = document.createElement('div');
            box.classList.add("box");
            box.setAttribute('id', `box${count}`);
            boxsContainer.appendChild(box);

            box.addEventListener('mousedown', () => {
                draw = true;
                if(erase) {
                    box.style.backgroundColor = 'transparent';
                } else {
                    box.backgroundColor = colorInput.value;
                }
            });
            box.addEventListener('mousemove', (e) => {
                let boxId = document.elementFromPoint(e.clientX, e.clientY).id;
                if (boxId == box.id) {
                    if(draw && !erase) {
                        box.style.backgroundColor = colorInput.value;
                    } else if(draw && erase) {
                        box.style.backgroundColor = 'transparent';
                    }
                }
            });
            box.addEventListener('mouseup', () => {
                draw = false;
            });
            box.addEventListener('touchstart',() => {
                draw = true;
                if (erase) {
                    box.style.backgroundColor = 'transparent';
                } else {
                    box.style.backgroundColor = colorInput.value;
                }
            });
            box.addEventListener('touchmove', (e) => {
                let boxId = elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).id;
                if (boxId == box.id) {
                    if (draw && erase) {
                        box.style.backgroundColor = 'transparent';
                    } else if (draw && !erase) {
                        box.style.backgroundColor = colorInput.value;
                    }
                }
            });
            box.addEventListener('touchend', () => {
                draw = false;
            });
        }
        drawBord.appendChild(boxsContainer);
    }
});


// End Of Project. Thabk you