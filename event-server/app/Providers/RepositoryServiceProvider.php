<?php
namespace App\Providers;

use App\Interfaces\GoogleLoginRepositoryInterface;
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
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
