const search = document.querySelector("ion-searchbar");

const results = document.getElementById("results");

// const button = document.getElementById("typeSearch");
// button.addEventListener('click', handleButtonClick);

search.addEventListener("keyup", (e) => {
    if (e.keyCode === 13){
        if(!search.value){
            results.innerHTML = `<ion-title>Aucune recherche.</ion-title>`;
            handleError("aucun texte saisi.");
            return;
        }
        handlePop();
    }
});



function handlePop() {
    const actionSheet = document.createElement('ion-action-sheet');
  
    actionSheet.header = 'Vous recherchez:';
    actionSheet.buttons = [{
      text: 'Animé',
      icon: 'tv',
      handler: () => {
        submitSearch("anime");
      }
    }, {
        text: 'Manga',
        icon: 'book',
        handler: () => {
            submitSearch("manga");
        }
    }, {
        text: 'Personne',
        icon: 'people',
        handler: () => {
            submitSearch("people");
        }
    }, {
        text: 'Personnage',
        icon: 'person',
        handler: () => {
            submitSearch("character");
        }
    }, {
      text: 'Fermer',
      icon: 'close',
      role: 'cancel',
    }];
    document.body.appendChild(actionSheet);
    return actionSheet.present();
  }



function submitSearch(type){
    console.log(search.value);
    results.innerHTML = '';
    if (search.value === '') {
      results.innerHTML = `<p>Aucune ${type} trouvé.</p>`;
      return;
    }
    axios
    .get(
      `https://api.jikan.moe/v3/search/${type}?q=${search.value}`
    )
    .then((response) => {
        if(type == "anime"){
            for (const key in response.data.results) {
                results.innerHTML += `
                <ion-card>
                    <img src="${response.data.results[key].image_url}" />
                    <ion-card-header href="${response.data.results[key].url}">
                        <ion-card-subtitle>${response.data.results[key].type}</ion-card-subtitle>
                        <ion-card-title>${response.data.results[key].title}</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                        ${response.data.results[key].synopsis}
                        <br><br>
                        <b>${response.data.results[key].episodes}</b> épisodes
                    </ion-card-content>


                    <ion-item href="${response.data.results[key].url}">
                        <ion-label>Consulter</ion-label>
                    </ion-item>
                </ion-card>
            `;
            }
        }
        else if(type == "manga"){
            for (const key in response.data.results) {
                results.innerHTML += `
                <ion-card>
                    <img src="${response.data.results[key].image_url}" />
                    <ion-card-header href="${response.data.results[key].url}">
                        <ion-card-subtitle>${response.data.results[key].type}</ion-card-subtitle>
                        <ion-card-title>${response.data.results[key].title}</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                        ${response.data.results[key].synopsis}
                        <br><br>
                        <b>${response.data.results[key].volumes}</b> volumes
                    </ion-card-content>
                    <ion-item href="${response.data.results[key].url}">
                        <ion-label>Consulter</ion-label>
                    </ion-item>
                </ion-card>
            `;
            }
        }
        else if(type == "people"){
            for (const key in response.data.results) {
                results.innerHTML += `
                <ion-card>
                    <img src="${response.data.results[key].image_url}" />
                    <ion-card-header>
                        <ion-card-subtitle>Personne</ion-card-subtitle>
                        <ion-card-title>${response.data.results[key].name}</ion-card-title>
                    </ion-card-header>
                    <ion-item href="${response.data.results[key].url}">
                        <ion-label>Consulter</ion-label> 
                    </ion-item>
                </ion-card>
            `;
            }
        }
        else if(type == "character"){
            for (const key in response.data.results) {
                results.innerHTML += `
                <ion-card>
                    <img src="${response.data.results[key].image_url}" />
                    <ion-card-header href="${response.data.results[key].url}">
                        <ion-card-subtitle>Personnage</ion-card-subtitle>
                        <ion-card-title>${response.data.results[key].name}</ion-card-title>
                    </ion-card-header>
                    <ion-item href="${response.data.results[key].url}">
                        <ion-label>Consulter</ion-label>
                    </ion-item>
                </ion-card>
            `;
            }
        }
    })
    .catch((error) => {
        console.log(error.response.status);
        if(error.response.status == 404){
            results.innerHTML = `<ion-title>Aucune recherche.</ion-title>`;
            handleError("Une erreur est survenue.");
        }
        return;
    });
}

