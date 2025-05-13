<?php
namespace App\Providers;

use App\Interfaces\AuthRepositoryInterface;
use App\Interfaces\GoogleLoginRepositoryInterface;
use App\Interfaces\OrgRepositoryInterface;
use App\Interfaces\PaymentMethodRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\AuthRepository;
use App\Repositories\GoogleLoginRepository;
use App\Repositories\OrgRepository;
use App\Repositories\PaymentMethodRepository;
use App\Repositories\UserRepository;
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
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(PaymentMethodRepositoryInterface::class, PaymentMethodRepository::class);
        $this->app->bind(OrgRepositoryInterface::class, OrgRepository::class);

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
