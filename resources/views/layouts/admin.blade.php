@extends('layouts.profile')

@section('content')
<div class="container">

    <div class="row justify-content-center">

        <div id="div_box_login" class="col-md-5">

            <div class="card bg-dark text-light">

                <div class="card-header bg-gray">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="text-md-right margin-left-fix">E-Mail</label>
                            <br />

                            <div class="col-md-12">
                                <input
                                    id="email"
                                    type="email"
                                    class="form-control @error('email') is-invalid @enderror"
                                    name="email" value="{{ old('email') }}"
                                    required
                                    autocomplete="email"
                                    autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">

                            <label for="password" class="text-md-right margin-left-fix">{{ __('Senha') }}</label>
                            <br />

                            <div class="col-md-12">
                                <input
                                    id="password"
                                    type="password"
                                    class="form-control @error('password') is-invalid @enderror"
                                    name="password"
                                    required
                                    autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror

                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-12" id="div_buttons_login">
                                <button type="submit" class="btn btn-primary bg-dark">
                                    {{ __('Entrar') }}
                                </button>
                                <button type="reset" class="btn btn-danger bg-danger">
                                    {{ __('Cancelar') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
