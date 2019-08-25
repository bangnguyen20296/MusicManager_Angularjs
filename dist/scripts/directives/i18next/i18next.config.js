(function (window) {
    window.i18next
        .use(window.i18nextXHRBackend)
        .use(window.i18nextSprintfPostProcessor)

    window.i18next.init({
        debug: false,
        lng: 'en', // If not given, i18n will detect the browser language.
        fallbackLng: ['en', 'vi'], // Default is dev
        backend: {
            loadPath: './app/scripts/directives/i18next/locales/{{lng}}/{{ns}}.json'
        },
        useCookie: false,
        useLocalStorage: false,
        // fallbackNS: true,
    }, function (err, t) {
        console.log('resources loaded');
    });
})(window)