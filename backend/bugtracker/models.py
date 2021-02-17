from django.db import models

TECHNOLOGY_CHOICES = [
    (None, "---Select One---"),
    ("C", "C"),
    ("C#", "C#"),
    ("C++", "C++"),
    ("CSS", "CSS"),
    ("Dart", "Dart"),
    ("Go", "Go"),
    ("Java", "Java"),
    ("JavaScript", "JavaScript"),
    ("Kotlin", "Kotlin"),
    ("HTML", "HTML"),
    ("Perl", "Perl"),
    ("PHP", "PHP"),
    ("Python", "Python"),
    ("R", "R"),
    ("Ruby", "Ruby"),
    ("Rust", "Rust"),
    ("Scala", "Scala"),
    ("Swift", "Swift"),
]

class BugTracker(models.Model):
    
    id = models.AutoField(primary_key = True)
    title = models.CharField(max_length = 120)
    project = models.CharField(max_length = 120, blank = True)
    outstanding = models.BooleanField(default = True)
    short_description = models.CharField(max_length = 120, blank = True)
    long_description = models.TextField(blank = True)
    code_block = models.TextField(blank = True)
    create_date = models.DateTimeField(auto_now_add = True)
    modified_date = models.DateTimeField(auto_now = True)
    close_date = models.DateTimeField(null = True, blank = True)
    resolution = models.TextField(blank = True)
    ref_link = models.TextField(blank = True)
    technology = models.CharField(default = 1, max_length = 15, choices = TECHNOLOGY_CHOICES)

    def __str__(self):
        return self.name