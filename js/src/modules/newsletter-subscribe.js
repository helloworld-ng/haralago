var NewsletterSubscribe = (function(){
    var openButtons, closeButton, subscribeButton, backgrounds, modal, form;
    var form = {
        name: null,
        email: null
    }

    function validate() {
        var subscribeButtonIsActive = false;

        form.find('input').on('input', function(){
            form.name = $('#subscribe-name').val();
            form.email = $('#subscribe-email').val();

            if (!subscribeButtonIsActive && form.name && form.email) {
                subscribeButtonIsActive = true;
                subscribeButton.removeAttr('disabled');
            } else if (subscribeButtonIsActive && !form.name && !form.email) {
                subscribeButtonIsActive = false;
                subscribeButton.attr('disabled', true);
            }
        });
    }

    function onSubmit() {
        form.submit(function(e){
            e.preventDefault();
        
            subscribeButton.attr('disabled', true);
            form.find('input').attr('disabled', true);
            subscribeButton.html('Please wait...');
        
            var request = new Request('https://power-death.glitch.me/mailchimp', {
                method: 'POST',
                mode: 'cors',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    email_address: form.email,
                    status: "pending",
                    merge_fields: {
                        FNAME: form.name.split(" ")[0],
                        LNAME: form.name.split(" ")[1]
                    }
                })
            });
        
            fetch(request).then(function(response) {
                return response.json();
            }).then(function(response) {
                showSuccess();
            }).catch(function(){
                showSuccess(); // to change
            });
        })
    }

    function showSuccess() {
        $("#subscribe-default").hide();
        $("#subscribe-success").show();
    }

    function reset() {
        form.find('input').val('');
        $("#subscribe-default").show();
        $("#subscribe-success").hide();
        form.find('input').removeAttr('disabled');
        subscribeButton.html('Submit');
    }

    return {
        init: function() {
            openButtons = $('.subscribeTrigger');
            closeButton = $('#subscribeClose');
            subscribeButton = $('#subscribe-button');
            backgrounds = $('section').find('.container');
            modal = $('#newsletterSubscribe');
            form = $('#newsletterSubscribeForm');
            
            var self = this;
            openButtons.click(function(e){
                e.preventDefault();
                self.show();
            });       
            closeButton.click(function(e){
                e.preventDefault();
                self.hide();
            });

            validate();
            onSubmit();
        },
        show: function() {
            backgrounds.css({opacity: 0.2});
            modal.fadeIn(function(){
                form.find('input').eq(0).focus();
            });
        },
        hide: function() {           
            modal.fadeOut(function() {
                backgrounds.css({opacity: 1});
                reset();
            });
        }
    }
})();