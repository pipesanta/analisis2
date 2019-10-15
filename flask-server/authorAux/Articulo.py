class Articulo():

    def __init__(self, nombre, añoPublicacion, numeroCitas, id):
        self.__nombre = nombre
        self.__añoPublicacion = añoPublicacion
        self.__numeroCitas = numeroCitas
        self.__id = id

    def get_nombre(self):
        return self.__nombre

    def set_nombre(self, x):
        self.__nombre = x

    def get_añoPublicacion(self):
        return self.__añoPublicacion

    def set_añoPublicacion(self, x):
        self.__añoPublicacion = x

    def get_numeroCitas(self):
        return self.__numeroCitas

    def set_numeroCitas(self, x):
        self.__numeroCitas = x

    def get_id(self):
        return self.__id

    def set_id(self, x):
        self.__id = x

    def articuloToDiccionario(self):
        artDiccionario = {'Nombre': self.__nombre, 'AñoPublicacion': self.__añoPublicacion,
                          'NumeroCitas': self.__numeroCitas, 'ID': self.__id}
        return artDiccionario
