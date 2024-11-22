from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'index.html', {'page_title': 'Home'})

def test(request):
    return render(request, 'test.html', {'page_title': 'Test'})