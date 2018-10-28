import os
from django.conf import settings


SECRET_KEY = os.environ.get('SECRET_KEY')
ALLOWED_HOSTS = [u'notfacebook.pythonanywhere.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "notfacebook$notfacebook",
        'USER': os.environ.get("DB_USER"),
        'PASSWORD': os.environ.get("DB_PASSWORD"),
        'HOST': os.environ.get("DB_HOST"),
        'PORT': 3306
    }
}


MEDIA_ROOT = os.path.join(settings.BASE_DIR, 'media')
MEDIA_URL = '/media/'
STATIC_ROOT = os.path.join(settings.BASE_DIR, 'static')
STATIC_URL = '/static/'