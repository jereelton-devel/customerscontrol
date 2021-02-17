<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class UserAccessController extends Controller
{
    private $user_level;

    public function __construct($user_level = 0)
    {
        $this->user_level = $user_level;
    }

    public function setPlaceRoute()
    {
        if(!Auth::check()) {
            return redirect('/');
        }

        $user = auth()->user();

        if(intval($user->user_level) === 0)
        {
            $red = "/dashboard/{$user->name}";
        }
        else
        {
            $red = "/profile/{$user->name}";
        }

        return redirect($red);
    }

    public function setInitialRoute()
    {
        if(!Auth::check()) {
            return view('auth.login');
        }

        return $this->setPlaceRoute();
    }

    public function dashAccess($username)
    {
        if(!Auth::check()) {
            return redirect("/");
        }

        $user = auth()->user();

        if($user->user_level === 0)
            return view('dashboard.index', ['username' => $user->name]);

        return redirect("/profile/{$user->name}");
    }

    public function profileAccess($username)
    {
        if(!Auth::check()) {
            return redirect("/");
        }

        $user = auth()->user();

        if($user->user_level === 1)
            return view('profile.index', ['username' => $user->name]);

        return redirect("/dashboard/{$user->name}");
    }

}
