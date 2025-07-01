create database gerenciador_tar;

use gerenciador_tar;

create table tarefa (
	Id int not null auto_increment primary key,
    Titulo varchar(255) not null,
    Andamento bool not null default false
);