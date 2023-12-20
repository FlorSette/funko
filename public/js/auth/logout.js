const timeElement = document.getElementById('time')

const updateTime = () => {
    timeElement.textContent = parseInt(timeElement.textContent) -1 
}

window.setInterval(updateTime, 1000)


