<?php
namespace App\Providers;

use App\Interfaces\AuthRepositoryInterface;
use App\Interfaces\GoogleLoginRepositoryInterface;
use App\Repositories\AuthRepository;
use App\Repositories\GoogleLoginRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(GoogleLoginRepositoryInterface::class, GoogleLoginRepository::class);
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
