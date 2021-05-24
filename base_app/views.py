from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from base_app.forms import SignUpForm
from base_app.forms import UserLoginForm
from base_app.forms import UserPost
from django.shortcuts import redirect
from django.contrib import messages
from base_app.models import Post
from django.http import JsonResponse
import json
import requests

# Create your views here.


def base(request):
    if request.user.is_authenticated:
        userpost = UserPost()
        return render(request, 'base_app/index.html', {'name': request.user, "userpost": userpost})
    else:
        return HttpResponseRedirect('/')


def authuser(request):
    if not request.user.is_authenticated:
        form = SignUpForm()
        fm = UserLoginForm()
        return render(request, 'base_app/authuser.html', {'form': form, 'fm': fm})
    else:
        return redirect('/index')


def userpost(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            fm = UserPost(request.POST, request.FILES)
            if fm.is_valid():
                user_post = Post()
                user_post.user = request.user
                user_post.post = fm.cleaned_data['post']
                checkimage = request.POST.get('post_image', None)
                print("this is checkimage ", checkimage)
                if checkimage == '':
                    user_post.save()
                    return redirect('/')
                elif checkimage is None:
                    user_post.post_image = request.FILES['post_image']
                    user_post.save()
            return redirect('/')
    else:
        return redirect('/')

# SIGNUP FORM


def SignUp(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            form = SignUpForm(request.POST)
            form.save()
            messages.success(
                request, 'Profile details updated. Now u can login ')
            return redirect('/')

        else:
            fm = UserLoginForm()
            return render(request, 'base_app/authuser.html', {'form': form, 'fm': fm})
    else:
        return redirect('/index')
# Login form


def Login(request):
    if not request.user.is_authenticated:
        if request.method == 'POST':
            fm = UserLoginForm(request=request, data=request.POST)
            if fm.is_valid():
                uname = fm.cleaned_data['username']
                upass = fm.cleaned_data['password']
                user = authenticate(username=uname, password=upass)
                if user is not None:
                    login(request, user)
                    return redirect('/index')
            else:
                form = SignUpForm()
                return render(request, 'base_app/authuser.html', {'form': form, 'fm': fm})
    else:
        return redirect('/index')

# logout


def Logout(request):
    logout(request)
    return HttpResponseRedirect('/')


def userprofile(request):
    if request.user.is_authenticated:
        userpost = UserPost()
        post_user = request.user
        user_all_post = Post.objects.filter(user=post_user.id)
        post_length = len(user_all_post)
        all_post = {'name': request.user, "userpost": userpost,
                    "length": post_length, "post": user_all_post}

        return render(request, 'base_app/userprofile.html', all_post)
    else:
        return redirect('/')


# fetch("https://myallies-breaking-news-v1.p.rapidapi.com/GetTopNews", {
# 	"method": "GET",
# 	"headers": {
# 		"x-rapidapi-key": "ef835c617cmsh1dd90528e2f583bp128877jsndbe1a82212ba",
# 		"x-rapidapi-host": "myallies-breaking-news-v1.p.rapidapi.com"
# 	}
# })
# .then(response => {
# 	console.log(response);
# })
# .catch(err => {
# 	console.error(err);
# });


def premium(request):
    if request.user.is_authenticated:
        return render(request,'base_app/premium.html',{'name': request.user})
    else:
        return HttpResponseRedirect('/')
    


def all_news(request):
    if request.user.is_authenticated:
        userpost = UserPost()
        return render(request,'base_app/all_news.html',{'name': request.user})
    else:
        return HttpResponseRedirect('/')

def create_post(request):
    if request.user.is_authenticated:
        userpost = UserPost()
        return render(request,'base_app/create_post.html',{'name': request.user,"userpost": userpost})
    else:
        return HttpResponseRedirect('/')


def top_job(request):
    if request.user.is_authenticated:
        return render(request,'base_app/top_job.html',{'name': request.user})
    else:
        return HttpResponseRedirect('/')


    
def game(request):
    if request.user.is_authenticated:
        return render(request,'base_app/game.html')
    else:
        return HttpResponseRedirect('/')