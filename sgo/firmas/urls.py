"""Firmas urls."""

# Django
from django.urls import path
from django.contrib.auth import views as auth_views
from firmas import views


urlpatterns = [
    # Management
    path(
        route='',
        view=views.ContratoAprobadoList.as_view(),
        name='list'
     ),
    path(
        route='enviado_contrato',
        view=views.ContratoEnviadoList.as_view(),
        name='enviado-contrato'
     ),
    path(
        route='<int:contrato_id>/estado/',
        view=views.firma_estado,
        name="estado"
    ),
    path(
        route='list_anexo',
        view=views.AnexoAprobadoList.as_view(),
        name='list-anexo'
     ),
    path(
        route='enviado_anexo',
        view=views.AnexoEnviadoList.as_view(),
        name='enviado-anexo'
     ),
    path(
        route='<int:anexo_id>/estado_anexo/',
        view=views.estado_anexo,
        name="estado-anexo"
    ),
    # path(
    #     route='<int:planta_id>/',
    #     view=views.FirmaListView.as_view(),
    #     name='list'
    # ),
]
