<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('helpers.head')
</head>
<body id="body_login">
    <div id="app">
        <nav id="div_navbar_top" class="navbar navbar-expand-md nav_box_shadow">
            <div class="container-fluid">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>

        <main id="main_box_login">
            @yield('content')
        </main>

        <section>
            <div id="div_right_side">
                <h1>
                    Business Control
                    <small>
                        by JOTICODE
                    </small>
                </h1>

            </div>
        </section>

    </div>

    @include('helpers.noscript')

    <!-- Plugins -->
    <script src="{{ asset('js/plugins/jQuery/jquery-2.2.3.min.js') }}"></script>
    <script src="{{ asset('js/plugins/jQueryUI/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('js/plugins/toastr/toastr.min.js') }}"></script>
    <script src="{{ asset('js/plugins/x-alertify/alertify-1.13.1.min.js') }}"></script>

    <!-- Script Especifico -->
    <script src="{{ asset('js/script.js') }}"></script>

</body>
</html>
