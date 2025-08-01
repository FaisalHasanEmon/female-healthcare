from django.shortcuts import render
from datetime import datetime
import calendar


def calendar_view(request):
    # Get date from POST or use today
    date_str = request.POST.get('date', datetime.today().strftime('%Y-%m-%d'))
    try:
        selected_date = datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        selected_date = datetime.today()

    year = selected_date.year
    month = selected_date.month
    day = selected_date.day

    # Create calendar
    cal = calendar.monthcalendar(year, month)
    
    context = {
        'calendar': cal,
        'year': year,
        'month': month,
        'month_name': calendar.month_name[month],
        'selected_date': selected_date,
        'today': datetime.today(),
    }
    return render(request, 'events/calendar.html', context)