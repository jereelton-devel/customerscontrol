<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'country_id', 'name', 'email', 'gender', 'birth_date',
    ];

    public function country()
    {
        //App\Models\Customer::find(1)->country;
        return $this->belongsTo(Country::class, 'id');
    }
}
