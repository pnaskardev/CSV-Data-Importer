from django.urls import path

from . views import FileViewSet

urlpatterns = [
    path('upload/', FileViewSet.as_view({'post': 'create'}), name="post-data"),
    path('get/', FileViewSet.as_view({'get': 'list'}), name="post-data")
]
