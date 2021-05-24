from django.urls import path, include
from base_app import views
urlpatterns = [
    path('index/', views.base, name="base"),
    path('SignUp/', views.SignUp, name="Signup"),
    path('', views.authuser, name="authuser"),
    path('Login/', views.Login, name="Login"),
    path('Logout/', views.Logout, name="Logout"),
    path('userpost/', views.userpost, name="post"),
    path('profile/', views.userprofile, name="userprofile"),
    path('premium/',views.premium,name="premium"),
    path("news/",views.all_news,name="all_news"),
    path("post/",views.create_post,name="create_post"),
    path("topCommunities/",views.top_job,name="top_job"), 
    path('game/',views.game,name="game"),



]
