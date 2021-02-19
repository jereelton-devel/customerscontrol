
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="pragma" content="no-cache" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">

<title>{{ config('app.name', 'Laravel') }}</title>

<!--Bootstrap-->
<link href="{{ asset('css/app.css') }}" rel="stylesheet">

<!--Toastr-->
<link rel="stylesheet" href="{{ asset('css/toastr/toastr.min.css') }}" />

<!--Alertify-->
<link rel="stylesheet" href="{{ asset('css/x-alertify/alertify-1.13.1.css') }}" />
<link rel="stylesheet" href="{{ asset('css/x-alertify/themes/default.min.css') }}" />
<link rel="stylesheet" href="{{ asset('css/x-alertify/themes/semantic.min.css') }}" />
<link rel="stylesheet" href="{{ asset('css/x-alertify/themes/bootstrap.min.css') }}" />

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">

<!-- Ionicons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">

<!-- Styles -->
<link href="{{ asset('css/login_register.css') }}" rel="stylesheet">
<link href="{{ asset('css/profile.css') }}" rel="stylesheet">
<link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">
<link href="{{ asset('css/css.css') }}" rel="stylesheet">

