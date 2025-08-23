from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
from .models import CycleInfo


def daily_update_job():
    print(f"[{datetime.now()}] Running daily cycle update job...")
    for cycle in CycleInfo.objects.all():
        cycle.calculate_period_length()
        cycle.update_current_phase(save=True)
        cycle.save()
    print("Daily cycle update complete.")


def start():
    scheduler = BackgroundScheduler()
    # Runs every day at 00:01
    scheduler.add_job(
        daily_update_job,
        CronTrigger(
            hour=0, minute=0, second=1
        )
    )
    scheduler.start()
