<?php

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Customer::create([
            'country_id' => 1,
            'name' => 'Marcos Silva',
            'email' => 'marcossilva@email.com',
            'gender' => 'Masculino',
            'birth_date' => '10/12/1980'
        ]);

        Customer::create([
            'country_id' => 2,
            'name' => 'Ana Silva',
            'email' => 'anasilva@email.com',
            'gender' => 'Feminino',
            'birth_date' => '05/05/1998'
        ]);

        Customer::create([
            'country_id' => 3,
            'name' => 'Jairo Oliveira',
            'email' => 'jairooliveira@email.com',
            'gender' => NULL,
            'birth_date' => '11/19/1985'
        ]);

        Customer::create([
            'country_id' => 4,
            'name' => 'Alexandre Souza',
            'email' => 'alexandre@email.com',
            'gender' => NULL,
            'birth_date' => '01/23/2001'
        ]);

        Customer::create([
            'country_id' => 5,
            'name' => 'Marcelo Ferrreira',
            'email' => 'marceloferreira@email.com',
            'gender' => 'Masculino',
            'birth_date' => '08/30/1973'
        ]);

        Customer::create([
            'country_id' => 6,
            'name' => 'Jeferson Nunes',
            'email' => 'jefersonnunes@email.com',
            'gender' => 'Masculino',
            'birth_date' => '04/27/1986'
        ]);

        Customer::create([
            'country_id' => 7,
            'name' => 'Paulo Santos',
            'email' => 'paulosantos@email.com',
            'gender' => 'Masculino',
            'birth_date' => '02/15/1990'
        ]);
    }
}
