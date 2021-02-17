from rest_framework import serializers
from .models import BugTracker
import random

tech = [
  "C",
  "C#",
  "C++", 
  "CSS",
  "Dart",
  "Go",
  "Java",
  "JavaScript",
  "Kotlin",
  "HTML",
  "Perl",
  "PHP",
  "Python",
  "R",
  "Ruby",
  "Rust",
  "Scala",
  "Swift",
]

class BugTrackerSerializer(serializers.ModelSerializer):
  class Meta:
    model = BugTracker
    fields = ('id',
            'title',
            'project',
            'outstanding',
            'short_description',
            'long_description',
            'code_block',
            'create_date',
            'modified_date',
            'close_date',
            'resolution',
            'ref_link',
            'technology'
            )


class VisualSerializer(serializers.ModelSerializer):
  
  label = serializers.SerializerMethodField()
  target = serializers.CharField(source = 'technology')
  source = serializers.CharField(source = 'id')
  id = serializers.SerializerMethodField()

  class Meta:
    model = BugTracker
    fields = (
      'id',
      'title',
      'outstanding',
      'target',
      'label',
      'source',
    )
    read_only_fields = (
      'id',
      'title',
      'outstanding',
      'target',
      'label',
      'source',
    )

  def get_label(self, obj):
    return 'Bug #' + str(obj.id)

  def get_id(self, obj):
    return str(obj.id)


class SumTechSerializer(serializers.ModelSerializer):
  
  label = serializers.CharField(source = 'project')
  value = serializers.IntegerField()

  class Meta:
    model = BugTracker
    fields = (
      'label',
      'value'
    )

class SumOtdSerializer(serializers.ModelSerializer):
  
  label = serializers.CharField(source = 'outstanding')
  value = serializers.IntegerField()

  class Meta:
    model = BugTracker
    fields = (
      'label',
      'value'
    )

class AvgCloseSerializer(serializers.ModelSerializer):

  class Meta:
    model = BugTracker
    fields = (
      'create_date',
      'close_date',
    )

class BugFilterSerializer(serializers.ModelSerializer):
  class Meta:
    model = BugTracker
    fields = ('id',
            'title',
            'project',
            'outstanding',
            'short_description',
            'long_description',
            'code_block',
            'create_date',
            'modified_date',
            'close_date',
            'resolution',
            'ref_link',
            'technology'
            )