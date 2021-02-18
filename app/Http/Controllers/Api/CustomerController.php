<?php

namespace App\Http\Controllers\Api;

use App\Models\Customer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class CustomerController extends Controller
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

            $customers = DB::table('customers')
                ->join('countries', 'customers.country_id', '=', 'countries.id')
                ->select('customers.*', 'countries.country_name')
                ->orderBy('customers.id')
                ->get();

            if ($customers) {
                return $customers;
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

            $new_customer = Customer::create($request->all());

            if($new_customer) {
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

            $customer = Customer::findOrFail($id);

            if($customer) {
                return $customer;
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
        return successReturn("EDIT");
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

            $customer = Customer::findOrFail($id);

            if($customer->update($request->all())) {
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

            $customer = Customer::findOrFail($id);

            if($customer->delete()) {
                return successReturn("Deletado");
            }

            return errorReturn("deletar");

        } catch (Throwable $exception) {
            return exceptionReturn($exception->getMessage());
        }
    }
}
