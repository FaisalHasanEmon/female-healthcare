from django.shortcuts import render

def chart_view(request):
    # user = request.user
    # print(user)
    # profile = user.profile
    # profile_id = profile.pk
    # Fetch symptom activity levels for the user's profile
    
    return render(request, 'chart.html')