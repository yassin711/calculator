const themeToggleBtns = document.querySelectorAll('.theme-toggle div')

themeToggleBtns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        removeActiveClass()
        btn.classList.add('active')
        document.body.className = ''
        const theme = e.target.closest('.theme').getAttribute('data-theme')
        if(theme == 2) document.body.classList.add('theme-2')
        else if(theme == 3) document.body.classList.add('theme-3')
    })
})

function removeActiveClass(){
    themeToggleBtns.forEach(btn=>{
        btn.classList.remove('active')
    })
}
///////////////////////////////////////

//calculator logic
const screen = document.querySelector('.screen')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')
const reset = document.querySelector('.reset')
const del = document.querySelector('.delete')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const operationSign = document.querySelector('.operation-sign')


numbers.forEach(number=>{
    number.addEventListener('click',e=>{
        if(e.target.textContent == '.' && next.textContent.includes('.')) return
        next.textContent += e.target.textContent
        next.textContent = next.textContent.replace('.',',')
    })
})

operations.forEach(operation=>{
    operation.addEventListener('click',e=>{
        if(next.textContent && previous.textContent) calc()
        screen.classList.remove('justify')
        next.classList.remove('output')
        previous.textContent = next.textContent
        next.textContent = ''
        operationSign.textContent = e.target.textContent
    })
})

reset.addEventListener('click',()=>{
    next.textContent = ''
    previous.textContent = ''
})

del.addEventListener('click',()=>{
    next.textContent = next.textContent.slice(0,-1)
})

equal.addEventListener('click',()=>{
    calc()
    screen.classList.add('justify')
    next.classList.add('output')
})


function calc(){
    if(!previous.textContent) return
    
    const sign = operationSign.textContent
    previous.textContent = previous.textContent.replace(',','.')
    next.textContent = next.textContent.replace(',','.')
    switch(sign){
        case '+' :
            next.textContent = +next.textContent + +previous.textContent
            break
        case '-' :
            next.textContent = +previous.textContent - +next.textContent
            break
        case 'x' :
            next.textContent = +next.textContent * +previous.textContent
            break
        case '/' :
            next.textContent = +previous.textContent / +next.textContent            

    }
    previous.textContent = ''
    if(next.textContent.includes('.')){
        const afterSign = next.textContent.slice(next.textContent.indexOf('.') + 1)
        if(afterSign.length > 3) next.textContent = Number(next.textContent).toFixed(3)
    } 
    next.textContent = next.textContent.replace('.',',')
}
Math.round()