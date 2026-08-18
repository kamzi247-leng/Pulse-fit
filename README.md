# PulseFit Gym - Class & Session Scheduler

A functional Django scheduling app: members pick a class or session, pick a
date/time, and book. Staff manage everything through the Django admin panel.

## Software stack

- Python 3.11+
- Django 6.0
- PostgreSQL (production) or SQLite (instant local testing, zero setup)
- python-decouple (reads settings from a .env file)
- psycopg2-binary (Postgres driver, only needed if using Postgres)
- Plain HTML/CSS templates (no frontend framework needed)

## Setup (Windows 11, PowerShell)

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env`. Leave the DB_* fields blank to start
   instantly on SQLite (recommended if PostgreSQL is giving you trouble),
   or fill them in once PostgreSQL is set up.
4. Run migrations:
   ```
   python manage.py migrate
   ```
5. Create an admin user:
   ```
   python manage.py createsuperuser
   ```
6. Add classes (Yoga, HIIT Bootcamp, Personal Training, etc.) at
   http://127.0.0.1:8000/admin/ or via `python manage.py shell`.
7. Run the server:
   ```
   python manage.py runserver
   ```
8. Visit http://127.0.0.1:8000/

## Switching between SQLite and PostgreSQL

No code changes needed either way. settings.py checks whether `DB_NAME` is
set in `.env`:
- Blank / missing -> uses SQLite (`db.sqlite3`), zero setup
- Filled in -> uses PostgreSQL automatically

## Adapting to a different business

Only the `Service` objects and some template text need to change - the
underlying booking logic (double-booking prevention, past-date blocking,
email lookup) stays identical:
- Hair salon: services = "Haircut", "Coloring", "Blowout"
- Tutoring: services = "Math Tutoring", "SAT Prep"
- Consulting: services = "Discovery Call", "Strategy Session"
- Bookstore: services = "Fiction Book Club", "Non-Fiction Book Club", "Author Signing"
