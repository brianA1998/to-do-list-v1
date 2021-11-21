const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
lista = document.getElementById("lista");
const empty = document.querySelector(".empty");
let tareas = [];
let geo = { lat: null, lon: null };


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

        recuperarUbicacion();
        console.log(geo)
        ul.appendChild(li);

        input.value = "";
        empty.style.display = "none";
    }

    
    tareas.push({texto: text,
                "completado" : false,
                "ubicacion" : {"lat": geo.lat,"lon": geo.lon}
    })

    localStorage.setItem("tareas", JSON.stringify(tareas));

});


function shareTask() {
    const btnShare = document.createElement("button");
    btnShare.className = "btn-share";

    btnShare.addEventListener("click", (e) => {
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

function copyTask() {

    const btnCopy = document.createElement("button");
    btnCopy.textContent = "Copiar";
    btnCopy.className = "btn-copy";

    btnCopy.addEventListener("click", (e) => {
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

document.getElementById('btnFullscreen').addEventListener('click', function () {
    toggleFullscreen();
});


function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function recuperarUbicacion() {

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (location) {
                geo.lat = location.coords.latitude;
                geo.lon = location.coords.longitude;
            },
            function (err) {
                console.warn(err);
                geo.lat = null;
                geo.lon = null;
            }
        );
    } else {
        return null;
    }

}

