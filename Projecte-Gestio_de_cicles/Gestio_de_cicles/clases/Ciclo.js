export class Cicle {

    constructor(nom, categoria, numAlumnes, abreviatura) {
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.dataEdicio = new Date();
        this.moduls = [];
    }

    setNumEdicions() { this.numEdicions++; }

    setDataEdicio() { this.dataEdicio = new Date(); }

    setModul(modul) {
        this.moduls.push(modul);
    }
    
    toString() {
        this.moduls.sort();

        return (`Nombre: ${this.nom}
                Categoria: ${this.categoria}
                Núm. Alumnos: ${this.numAlumnes}
                Abreviatura: ${this.abreviatura}
                Módulos: ${this.moduls}`);
    }

}