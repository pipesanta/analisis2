class Autor():
    
    def __init__(self, nombre, articulos, area, institucion):
        self.__nombre = nombre
        self.__articulos = articulos 
        self.__area = area
        self.__institucion = institucion


    def get_nombre(self):
        return str(self.__nombre)
    
    def set_nombre(self, x):
        self.__nombre = x

    def get_articulos(self):
        return self.__articulos
    
    def set_articulos(self, x):
        self.__articulos = x
        
    def get_area(self):
        return str(self.__area)
    
    def set_area(self, x):
        self.__area = x
        
    def get_institucion(self):
        return str(self.__institucion)
    
    def set_institucion(self, x):
        self.__institucion = x
    
    def autorToDiccionario(self):
        autorDiccionario = {'Nombre': str(self.__nombre), 'Articulos': self.__articulos, 'Area': str(self.__area), 'Institucion': str(self.__institucion)}
        return autorDiccionario