from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse('Index...')

def handler400(request, exception):
    return HttpResponse('Custom 400 message...')

def handler403(request, exception):
    return HttpResponse('Custom 403 message...')

def handler404(request, exception):
    return HttpResponse('Custom 404 message...')

def handler500(request):
    return HttpResponse('Custom 500 message...')