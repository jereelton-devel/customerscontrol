<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    @include('helpers.head')
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-dark position-relative bg-dark">
            <div class="container-fluid">
                <div class="navbar-header">

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse pull-right" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">
                        <!-- Authentication Links -->
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Perfil</a>
                                <a class="dropdown-item" href="#">Configurações</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    Logout
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        @yield('content')
    </div>

    <div id="div_lock_screen"></div>
    <div id="div_modal_customer" class="modal">
        <div class="modal-header bg-dark text-light">
            <span id="span_title_modal">Novo Cliente</span>
            <hr />
            <div>
                <a id="a_close_modal" class="fa fa-close a_close_modal"></a>
            </div>
        </div>
        <div class="modal-body">

            <p>
                País
                <select class="input-group" id="select_country_new">
                </select>
            </p>

            <p>
                Nome
                <input type="text" id="customer_name" name="" value="" class="input-group" />
            </p>

            <p>
                Email
                <input type="email" id="customer_mail" name="" value="" class="input-group" />
            </p>

            <p>
                Genero
                <select class="input-group" id="customer_gen">
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Nao_informado">Não informado</option>
                </select>
            </p>

            <p>
                Data de Nascimento
                <input type="date" id="customer_date" name="" value="" class="input-group" />
            </p>

            <p style="text-align: center">
                <a id="a_save_new_customer" class="btn btn-success">
                    <i class="fa fa-save"></i>
                    Salvar
                </a>

                <a id="a_cancel_new_customer" class="btn btn-danger">
                    <i class="fa fa-ban"></i>
                    Cancelar
                </a>
            </p>

        </div>
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
