(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

$(document).ready( function() {

    // Input number style
    $("input[type='number']").inputSpinner();

    // Add loader
    $("button[type='submit']").click( function( e ) {
        e.target.innerHTML = '\
            <div class="spinner-border spinner-border-lg" role="status">\
                <span class="sr-only">Loading...</span>\
            </div>';
    } );

    // Order form
    $("#order_form").submit( function( e ) {
        e.preventDefault();
        e.stopPropagation();
        data = _.mapValues(_.keyBy( $("#order_form").serializeArray(), 'name'), 'value');
        axios.post('https://maquis-bernadette-staging.herokuapp.com/api/v1/orders/send', data, {
            headers: {'Content-type': 'application/json'}
        })
        .then(function (response) {
            document.getElementById( "submitButton" ).innerHTML = "Commandez";
            Lobibox.alert('success', {
                msg: 'Merci beaucoup. Nous allons vous contacter dans quelque minutes.',
                beforeClose: function(lobibox){
                    window.location.reload();
                }
            } );
        })
        .catch(function (error) {
            document.getElementById( "submitButton" ).innerHTML = "Commandez";
            Lobibox.alert('error', {
                msg: 'Oops, nous avons un probleme, laissez nous un peu de temps de le resoudre et reessayez s\'il vous plait'
            } );
        });
    } );
} );
