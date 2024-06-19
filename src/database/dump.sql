create table usuarios(
id serial primary key,
  nome varchar(255) not null,
  email varchar(255) unique not null,
  senha text not null
);

create table categorias(
	id serial primary key,
  descricao varchar(255) not null
);

create table transacoes(
	id serial primary key,
  descricao varchar(255),
  valor int not null,
  data date,
  categoria_id int references categorias(id),
  usuario_id int references usuarios(id),
  tipo varchar(255)
);

insert into categorias(descricao)
values('Alimentação')

insert into categorias (descricao)
values
('Assinaturas e Serviços'),
('Casa'), 
('Mercado');

insert into categorias (descricao)
values
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');
