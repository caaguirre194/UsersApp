import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { NoLoginGuard } from "./guards/no-login.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginPageModule",
    canActivate: [NoLoginGuard]
  },
  { path: "main", loadChildren: "./pages/main/main.module#MainPageModule" },
  {
    path: "signin",
    loadChildren: "./pages/signin/signin.module#SigninPageModule"
  },
  { path: "users", loadChildren: "./pages/users/users.module#UsersPageModule" },
  {
    path: "remember",
    loadChildren: "./pages/remember/remember.module#RememberPageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
