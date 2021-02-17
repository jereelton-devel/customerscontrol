@extends('layouts.profile')

@section('content')
<div class="container">

    <div class="row">

        <div class="col-md-12 col-md-offset-2">

            <div id="div_user_profile" class="card">

                <div class="card-header bg-dark">Dashboard</div>

                <div class="card-body">

                    <div class="links">
                        <a href="/access_control">Navegar</a>
                        <a href="/access_control">Welcome</a>
                        <a href="/access_control">Sobre</a>
                        <a href="/access_control">Profile</a>
                    </div>

                    <hr />

                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    Você esta logado!
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
