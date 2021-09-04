const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");


addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const text = input.value;

    if (text !== "") {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = text;

        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        li.appendChild(shareTask())
        li.appendChild(copyTask())
        ul.appendChild(li);

        input.value = "";
        empty.style.display = "none";
    }
});


function shareTask(){
    const btnShare = document.createElement("button");
    btnShare.textContent = "Compartir";
    btnShare.className = "btn-share";
    
    btnShare.addEventListener("click",(e)=>{
        const item = document.querySelector("p");
        navigator.share({
            title: 'MI TAREA',
            text: item.textContent,
            url: 'https://whatwebcando.today/'
          })
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing:', error));
      });

      return btnShare;

}

function copyTask(){

    const btnCopy = document.createElement("button");
    btnCopy.textContent = "Copiar";
    
    btnCopy.addEventListener("click",(e)=>{
        const item = document.querySelector("p");
       
        navigator.clipboard.writeText(item.textContent)
        console.log(item.textContent)
        alert('Tarea copiada');
    });
    return btnCopy;
}



function addDeleteBtn() {
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll("li");

        if (items.length === 0) {
            empty.style.display = "block";
        }
    });

    return deleteBtn;
}