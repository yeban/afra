define(['bootstrap'],
function () {

    return ['$http', '$location', function (http, location) {
        var scope = this;
        scope.location = location;

        scope.signup = function () {
            var form = $('form');
            var form_data = form.serialize();
            http.post('signup', form_data,
                      {
                          headers: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                          }
                      })
            .then(function () {
                scope.response = 200;
            });
        }

        scope.signin = function () {
            var form = $('form');
            var form_data = form.serialize();
            http.post('signin', form_data,
                      {
                          headers: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                          }
                      })
            .then(function (response) {
                scope.user = response.data;
                location.path('/dashboard');
            })
        }

    }];
});
