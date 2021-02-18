<?php

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Country::create([
            'country_name' => 'Brasil'
        ]);

        Country::create([
            'country_name' => 'EUA'
        ]);

        Country::create([
            'country_name' => 'Alemanha'
        ]);

        Country::create([
            'country_name' => 'Mexico'
        ]);

        Country::create([
            'country_name' => 'Russia'
        ]);

        Country::create([
            'country_name' => 'Chile'
        ]);

        Country::create([
            'country_name' => 'Israel'
        ]);

        Country::create([
            'country_name' => 'China'
        ]);

        Country::create([
            'country_name' => 'Iraque'
        ]);

        Country::create([
            'country_name' => 'Belgica'
        ]);

        Country::create([
            'country_name' => 'Argentina'
        ]);

        Country::create([
            'country_name' => 'Australia'
        ]);

        Country::create([
            'country_name' => 'Japão'
        ]);

        Country::create([
            'country_name' => 'India'
        ]);

        Country::create([
            'country_name' => 'Bolivia'
        ]);

        Country::create([
            'country_name' => 'Canada'
        ]);
    }
}
