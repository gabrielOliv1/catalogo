const closeMessage = document.querySelector("#close")
const message = document.querySelector("#mensagem")

closeMessage.addEventListener("click", function (){
    message.style.display = "none"
})

setTimeout(() => {
    message.style.display = "none"
}, 3000)