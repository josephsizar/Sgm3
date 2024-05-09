from sqlalchemy import create_engine,Column,Integer,String,ForeignKey

from sqlalchemy.orm import relationship , sessionmaker

from sqlalchemy.ext.declarative import declarative_base



engine = create_engine("sqlite:///./sample.db",echo=True)

Base = declarative_base()

# define a model class 

class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True)
    name = Column(String)
    age = Column(Integer)

    addresses = relationship("Address",back_populates="user")


class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer,primary_key=True)
    email = Column(String)
    user_id  = Column(Integer,ForeignKey('users.id'))


    # Define the back reference
    user = relationship("User",back_populates="addresses")




def create_dbs():
    Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()







