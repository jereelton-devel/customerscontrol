<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'user_level', 'name', 'email', 'password', 'remember_token',
    ];
}
