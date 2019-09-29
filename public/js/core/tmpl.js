(function () {
    this.tmpl = function (selector, data) {
        let html = $(selector).html();
        Mustache.parse(html);
        return Mustache.render(html, data);
    };

    this.template = (template, data) => {
        try {
            return new EJS({
                url: `${baseUrl}/tpl/${template}`
            }).render(data);
        } catch (e) {
            throw new Error(e);
        }
    };
})();