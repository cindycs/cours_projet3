// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();



function genererPieces(pieces) {
    //Creation des elements
    //const article = pieces[0];
    for (let i = 0; i < pieces.length; i++) {

        //On declare la variable article qui prends la pièce en compte
        const article = pieces[i];

        // Création d'une balise article pour structurer chaque objet dans une balise article
        const pieceElement = document.createElement("article");

        //On crée les différentes caractéristique de la fiche produit
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerHTML = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerHTML = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = article.description ?? "(Pas de description pour le moment)";
        const stockElement = document.createElement("p");
        stockElement.innerHTML = `Stock: ${article.disponibilite ? "En stock" : "Rupture de stock"}`;


        // Rattachement des éléments aux parents, en l'occurence ici la classe fiches
        const sectionFiches = document.querySelector(".fiches");
        //On rattache la balise article à son parent (.fiches)
        sectionFiches.appendChild(pieceElement);
        //Le contenu de la fiche produit est rattaché quant à lui à la nouvelle balise article
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    }
}

// Premier affichage de la page
genererPieces(pieces);


// GESTION DES FILTRES

//TRIE PAR ORDRE CROISSANT
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    // Copie de la liste pieces. permet de ne pas bouger les éléments de la liste de base
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

//FILTRER PAR PRIX ABORDABLE

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
   console.log(piecesFiltrees);
});

// FILTREER LES PRODUITS QUI POSSEDENT UNE DESCRIPTION

const boutonDesc = document.querySelector(".btn-desc");

boutonDesc.addEventListener("click", function () {
   const piecesDesc = pieces.filter(function (piece) {
        //On retourne la description, si l'élément est absent alors il ne sera pas pris dans la liste
       return piece.description;
   });
   console.log(piecesDesc);
});

// TRIER PAR ORDRE DECROISSANT

const boutonCroissant = document.querySelector(".btn-Croissant");
boutonCroissant.addEventListener("click", function () {
    // Copie de la liste pieces. permet de ne pas bouger les éléments de la liste de base
    const piecesCroissant = Array.from(pieces);
    piecesCroissant.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesCroissant);
});


// PIECES ABORDABLES


//Retourne la valeur de la propriété nom de l'objet piece 
const noms = pieces.map(piece => piece.nom);
//On créer une boucle en partant de la fin de la liste
for(let i = pieces.length -1 ; i >= 0; i--){
    //On supprime avec splice l'affichage de la pièce si le prix de celle-ci est supérieur à 35
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}

// Ajout de l'en-tête puis de la liste au bloc résultats filtres. version simplifié sans créer de const
document.querySelector('.abordables')
.appendChild(abordablesElements)
console.log(noms)


// PIECES DISPONIBLES


//Retourne la valeur de la propriété nom de l'objet piece 
const dispo = pieces.map(piece => piece.nom);
const prixdispo = pieces.map(piece => piece.prix);
//On créer une boucle en partant de la fin de la liste
for(let i = pieces.length -1 ; i >= 0; i--){
    //On supprime avec splice l'affichage des pièces en rupture de stock
   if(pieces[i].disponibilite === false){
    dispo.splice(i,1)
    prixdispo.splice(i,1)
   }
}

//Création de la liste
const disponibleElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < dispo.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = `${dispo[i]} - ${prixdispo[i]} €`;
   disponibleElements.appendChild(nomElement)
}

// Ajout de l'en-tête puis de la liste au bloc résultats filtres. version simplifié sans créer de const
document.querySelector('.disponible')
.appendChild(disponibleElements)

console.log(dispo)

// FILTRE DE PRIX

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
})