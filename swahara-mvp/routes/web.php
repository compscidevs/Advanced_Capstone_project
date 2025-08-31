<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AgreementController;

Route::get('/process-dummy', [AgreementController::class, 'processDummyRequest']);
Route::get('/admin/agreements', [AgreementController::class, 'index']);