module.exports = {
    handlers: {
        translate: function(cb) {
            if (!this.id) {
                // Added translate API to show word translation
                return $http.post("http://api.linalgo.com/v0/gtranslate", {
                    'q': word,
                    'source': 'en',
                    'target': 'fr',
                    'format': 'text'
                }).then(function (response) {
                    this.text = response.data.translatedText;
                    cb();
                }).catch(cb)
            }
            else {
                cb()
            }
        },
        replace: function(cb) {
            this.display_options.replace = true;
            if (!this.id) {
                this.display_options.edit = true;
            }
            cb();
        },
        question: function(cb) {
            if (!this.id) {
                this.display_options.edit = true;
            }
            cb();
        },
    }
}