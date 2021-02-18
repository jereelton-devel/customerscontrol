<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'UserAccessController@setInitialRoute');

Route::get('/access_control', 'UserAccessController@setPlaceRoute');

Route::get('/dashboard/{user_name}', 'UserAccessController@dashAccess');

Route::get('/profile/{user_name}', 'UserAccessController@profileAccess');
