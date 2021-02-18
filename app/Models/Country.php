<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'country_id', 'country_name',
    ];

    public function customer()
    {
        //App\Models\Country::find(1)->customer
        return $this->hasMany(Customer::class, 'country_id');
    }
}
