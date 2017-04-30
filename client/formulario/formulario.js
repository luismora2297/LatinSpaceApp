Template.formularios.onCreated( function(){
    Session.set('FormularioListo', false);
      GoogleMaps.load({
        key: "AIzaSyCTmQZ_IJoqteedF6XDFjdsaCgaSxDnhik"
     });
})


Template.formularios.helpers({
   ReadyForm() {
       return  Session.get('FormularioListo');
   }
})


Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error al Cargar la Imagen: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});

AutoForm.hooks({
  reporteFormDelizamiento: {
      // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
      console.log( result )
    
  },
  // Called when any submit operation fails
  onError: function(formType, error) {
    console.log( error )
  },
  }
});