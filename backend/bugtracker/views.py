from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet
from django.db.models import ( Count )
from .serializers import ( BugTrackerSerializer, VisualSerializer, SumTechSerializer, SumOtdSerializer, AvgCloseSerializer, BugFilterSerializer )
from .models import BugTracker

class BugTrackerView(viewsets.ModelViewSet):
  serializer_class = BugTrackerSerializer
  queryset = BugTracker.objects.all()

class VisualView(GenericViewSet, ListModelMixin):
  serializer_class = VisualSerializer
  queryset = BugTracker.objects.all()

class SumTechView(GenericViewSet, ListModelMixin):
  serializer_class = SumTechSerializer
  queryset = BugTracker.objects.all().values('project').annotate(value=Count('id'))


class SumOtdView(GenericViewSet, ListModelMixin):
  serializer_class = SumOtdSerializer
  queryset = BugTracker.objects.all().values('outstanding').annotate(value=Count('id'))

class AvgCloseView(GenericViewSet, ListModelMixin):
  serializer_class = AvgCloseSerializer
  queryset = BugTracker.objects.filter(outstanding=False)

class BugFilterView(viewsets.ModelViewSet):
  serializer_class = BugTrackerSerializer
  queryset = BugTracker.objects.all()
  filterset_fields = ('outstanding', 'technology', 'project')