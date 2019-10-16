class Author:

    def __init__(self, author, institutions, fields, article):
        self.author = author
        self.institutions = institutions
        self.fields = fields
        self.articles = [article]
        self.alternative_fields = {i : 1 for i in fields}