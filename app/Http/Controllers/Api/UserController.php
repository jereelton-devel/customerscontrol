<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * @method GET
     */
    public function index()
    {
        try {

            $users = User::all();

            if($users) {
                return $users;
            }

            return errorReturn("listar todos");

        } catch (Throwable $exception) {
            return exceptionReturn($exception->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     * @method UN_KNOW
     */
    public function create()
    {
        return successReturn("CREATE");
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
        try {

            if(User::create($request->all())) {
                return successReturn("Criado");
            }

            return errorReturn("criar");

        } catch (Throwable $exception) {
            return exceptionReturn($exception->getMessage());
        }
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
        try {

            $user = User::findOrFail($id);

            if($user) {
                return $user;
            }

            return errorReturn("listar");

        } catch (Throwable $exception) {
            return exceptionReturn($exception->getMessage());
        }
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
        try {

            return successReturn("EDIT");
            $user = User::findOrFail($id);

            if($user->update($request->all())) {
                return successReturn("Atualizado");
            }

            return errorReturn("atualizar");

        } catch (Throwable $exception) {
            return exceptionReturn($exception->getMessage());
        }
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
        try {

            $user = User::findOrFail($id);

            if($user->update($request->all())) {
                return successReturn("Atualizado");
            }

            return errorReturn("atualizar");

        } catch (Throwable $exception) {
            return exceptionReturn($exception->getMessage());
        }
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
        try {

            $user = User::findOrFail($id);

            if($user->name != "Administrator" && $user->user_level == 1 && $user->delete()) {
                return successReturn("Deletado");
            }

            return errorReturn("deletar");

        } catch (Throwable $exception) {
            return exceptionReturn($exception->getMessage());
        }
    }
}
