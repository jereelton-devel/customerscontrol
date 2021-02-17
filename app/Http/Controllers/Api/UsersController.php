<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use App\Models\Users;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * @method GET
     */
    public function index()
    {
        $users = Users::all();

        if($users) {
            return $users;
        }

        return $this->errorReturn("listar todos");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     * @method UN_KNOW
     */
    public function create()
    {
        return $this->successReturn("CREATE");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * @method POST
     */
    public function store(Request $request)
    {
        if(Users::create($request->all())) {
            return $this->successReturn("Criado");
        }

        return $this->errorReturn("criar");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @method GET
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        if($user) {
            return $user;
        }

        return $this->errorReturn("listar");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @method UN_KNOW
     */
    public function edit($id, Request $request)
    {
        return $this->successReturn("EDIT");
        $user = User::findOrFail($id);

        if($user->update($request->all())) {
            return $this->successReturn("Atualizado");
        }

        return $this->errorReturn("atualizar");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @method PUT
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if($user->update($request->all())) {
            return $this->successReturn("Atualizado");
        }

        return $this->errorReturn("atualizar");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @method DELETE
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if($user->name != "Administrator" && $user->user_level == 1 && $user->delete()) {
            return $this->successReturn("Deletado");
        }

        return $this->errorReturn("deletar");
    }

    private function successReturn($type)
    {
        return json_encode([
            "status" => 1,
            "message" => "{$type} com sucesso"
        ]);
    }

    private function errorReturn($type)
    {
        return json_encode([
            "status" => 0,
            "message" => "Erro ao tentar {$type}"
        ]);
    }
}
