
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import password_validation
from django.contrib.auth.models import User
from base_app.models import Post

from django.contrib.auth.validators import UnicodeUsernameValidator

username_validator = UnicodeUsernameValidator()


class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=12, min_length=4, required=True, help_text='Required: First Name',
                                 widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}))
    last_name = forms.CharField(max_length=12, min_length=4, required=True, help_text='Required: Last Name',
                                widget=(forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Last Name'})))
    email = forms.EmailField(max_length=50, help_text='Required. Inform a valid email address.',
                             widget=(forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Email'})))
    password1 = forms.CharField(
        widget=(forms.PasswordInput(
            attrs={'class': 'form-control', 'placeholder': 'Password'})),
    )
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Password Again'}),
                                )
    username = forms.CharField(

        max_length=150,

        validators=[username_validator],

        widget=forms.TextInput(
            attrs={'class': 'form-control', 'placeholder': 'Username'})
    )

    def clean_email(self):
        if User.objects.filter(email=self.cleaned_data['email']).exists():
            raise forms.ValidationError(
                "the given email is already registered")
        return self.cleaned_data['email']

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name',
                  'email', 'password1', 'password2',)


class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

    username = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Email address or Username', 'id': 'hello'}))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control ',
            'placeholder': 'Password',
            'id': 'hi',
        }))


class UserPost(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['post', 'post_image']
        widgets = {'post': forms.Textarea(
            attrs={'class': 'form-control ', 'placeholder': "What's on your mind "})}
