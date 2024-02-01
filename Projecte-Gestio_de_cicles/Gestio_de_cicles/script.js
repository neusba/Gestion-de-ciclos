import { Cicle } from "./clases/Ciclo.js";
import { Modul } from "./clases/Modulo.js";

document.getElementById("afegirCicle").addEventListener("click", afegirCicle);
document.getElementById("afegirModul").addEventListener("click", afegirModul);

let llistatCicles = [];

function afegirCicle(){
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;

    let cicle = new Cicle(nom, categoria, numAlumnes, abreviatura);
    let posicio = document.getElementById("editCicle").value;

    if(posicio === "-1"){
        //Afegim el cicle al llistat
        llistatCicles.push(cicle);
    }else{
        //Editar cicle
        llistatCicles[posicio].nom = cicle.nom;
        llistatCicles[posicio].categoria = cicle.categoria;
        llistatCicles[posicio].numAlumnes = cicle.numAlumnes;
        llistatCicles[posicio].abreviatura = cicle.abreviatura;
        llistatCicles[posicio].setNumEdicions();
        llistatCicles[posicio].setDataEdicio();

        console.log(`${llistatCicles[posicio].toString()}
                    Núm. Ediciones: ${llistatCicles[posicio].numEdicions}
                    Fecha edición: ${llistatCicles[posicio].dataEdicio}`);
    }
    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value=-1;
}

function afegirModul(){
    let cicle = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    let modul = new Modul(cicle, modul_nom, modul_num, modul_hores);
    let ciclo = llistatCicles[cicle];
    ciclo.setModul(modul);

    actualitzarSelector();
    printLlistat(llistatCicles);
    netejarFormularis();

    document.getElementById("editCicle").value=-1;
}

//Funció per llistar els cicles
function printLlistat (llistat){
    let str="";
    llistat.forEach(function(element, index){
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>

                    <button type="button" id="btnRemoveCicle_${index}" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button" id="btnEditCicle_${index}" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button" id="btnCalculHores_${index}" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>

                </div>`;
    });
    document.getElementById("llistat").innerHTML=str;

    llistat.forEach(function(llistat, index){    
        document.getElementById(`btnRemoveCicle_${index}`).addEventListener("click", function(){removeCicle(index)});
        document.getElementById(`btnEditCicle_${index}`).addEventListener("click", function(){editCicle(index)});
        document.getElementById(`btnCalculHores_${index}`).addEventListener("click", function(){calculHores(index)});
    });
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector(){
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function(element, index){
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(i){
    llistatCicles.splice(i, 1);
    actualitzarSelector();
    printLlistat(llistatCicles);
    netejarFormularis();

    document.getElementById("editCicle").value=-1;
}

//Funció per editar un cicle
function editCicle(i){
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    document.getElementById("editCicle").value=i;    
}


//Funció per netejar els formularis
function netejarFormularis(){
    var inputs = document.getElementsByTagName("input");
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    
    var selects = document.getElementsByTagName("select");
    for (let i=0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}

//Funció per calcular les hores del cicle
function calculHores(i) {
    let hores = 0;
    llistatCicles[i].moduls.forEach(modul => {
        hores += parseInt(modul.modul_hores);
    });
    alert(`Horas totales del ciclo: ${hores}`);
} 