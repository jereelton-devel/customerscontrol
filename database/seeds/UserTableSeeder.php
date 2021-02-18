<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'user_level' => '0',
            'name' => 'Administrator',
            'email' => 'admin@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '0',
            'name' => 'Support',
            'email' => 'support@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '0',
            'name' => 'Advanced',
            'email' => 'advanced@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '1',
            'name' => 'Lucas Natan',
            'email' => 'lucas@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '1',
            'name' => 'Manoela Santos',
            'email' => 'manoela@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '1',
            'name' => 'Marcelo Santos',
            'email' => 'marcelo@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '1',
            'name' => 'Paulo Santos',
            'email' => 'paulo@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '1',
            'name' => 'Joel Santos',
            'email' => 'joel@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '1',
            'name' => 'Maria Santos',
            'email' => 'maria@email.com',
            'password' => bcrypt('123mudar')
        ]);

        User::create([
            'user_level' => '1',
            'name' => 'João Santos',
            'email' => 'joao@email.com',
            'password' => bcrypt('123mudar')
        ]);
    }
}
