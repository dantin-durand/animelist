async function handleError(messageError) {
    const alert = await alertController.create({
      header: 'Erreur',
      message: messageError,
      buttons: ['Fermer']
    });

    await alert.present();
}