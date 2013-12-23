require.config({
    config: {
        'controllers/genome': {
            plugins: {
                name:     "WebApollo",
                location: "JBrowse/WebApollo"
            }
        }
    }
});

define(['controllers/genome']
, function (genome) {

    return ['$http', '$q', '$cookieStore', '$injector', function (http, q, cookie, injector) {

        injector.invoke(genome, this); // call 'super' controller
        var jbrowse = this;

        var get = function () {
            return http.get('data/tasks/next')
            .then(function (response) {
                return response.data;
            })
            .then(function (task) {
                cookie.put('task', task);
                return task;
            });
        };

        var put = function (id, submission) {
            var data = JSON.stringify(submission);
            return http.post('data/tasks/' + id, data).then(function (response) {
                console.log('saved submission');
            });
            // what on failure?
        }

        this.done = function () {
            jbrowse.edits().then(function (annotation){
                var task = cookie.get('task');
                put(task.id, annotation)
                .then(function () {
                    $('#thanks').modal();
                });
            });
        }

        $('#thanks').on('hidden.bs.modal', function () {
            jbrowse.clear_edits()
            .then(get)
            .then(function (task) {
                jbrowse.load(task);
            });
        });

        // initialize
        q.when(cookie.get('task'))
        .then(function (task) {
            return task || get();
        })
        .then(function (task) {
            jbrowse.load(task);
        });
    }];
});
