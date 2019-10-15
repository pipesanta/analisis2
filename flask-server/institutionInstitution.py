
class Institution:

    def __init__(self, institution, author, fields, article, year):
        self.institution = institution
        self.author = author
        self.fields = fields
        self.articles = article
        self.trayectory = {year:1}
    
    def update_trayectory(self, year):
        if year in self.trayectory:
          self.trayectory[year] += 1
        else:
          self.trayectory[year] = 1