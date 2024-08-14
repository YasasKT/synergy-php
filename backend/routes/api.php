<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\EnsureUserIsAuthenticated;

// Public authentication routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('/signup', [AuthController::class, 'store']);
});

// Protected routes
Route::middleware([EnsureUserIsAuthenticated::class])->group(function () {
    Route::prefix('clients')->group(function () {
        Route::post('/', [ClientController::class, 'store']);
        Route::post('/{id}', [ClientController::class, 'update']);
        Route::delete('/{id}', [ClientController::class, 'destroy']);
    });

    Route::prefix('projects')->group(function () {
        Route::post('/', [ProjectController::class, 'store']);
        Route::post('/{project}', [ProjectController::class, 'update']);
        Route::delete('/{project}', [ProjectController::class, 'destroy']);
    });

    Route::prefix('users')->group(function () {
        Route::get('/', [AuthController::class, 'index']);

        Route::get('/admins', [AuthController::class, 'getAllUsers']);
        Route::get('/{id}', [AuthController::class, 'show']);
        Route::patch('/{id}', [AuthController::class, 'update']);
        Route::delete('/{id}', [AuthController::class, 'destroy']);
    });
});

// Public routes
Route::prefix('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index']);
    Route::get('/{id}', [ClientController::class, 'show']);
});

Route::prefix('projects')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/{project}', [ProjectController::class, 'show']);
});
