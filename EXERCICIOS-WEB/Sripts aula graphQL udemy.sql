-- Criando a tabela estado

CREATE TABLE ESTADOS (
    ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(45) NOT NULL,
    SIGLA VARCHAR(2) NOT NULL,
    REGIAO ENUM('Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul') NOT NULL,
    POPULACAO DECIMAL(5 , 2 ) NOT NULL,
    PRIMARY KEY (ID),
    UNIQUE KEY (NOME),
    UNIQUE KEY (SIGLA)
);

-- Inserir Estados 1

INSERT INTO ESTADOS 
	(NOME, SIGLA, REGIAO, POPULACAO)
VALUES 
	( 'Acre', 'AC', 'Norte', 0.83);

INSERT INTO ESTADOS 
	(NOME, SIGLA, REGIAO, POPULACAO)
VALUES 
	( 'Alagoas', 'AL', 'Nordeste', 3.38),
    ( 'Amapá', 'AP', 'Norte', 0.8),
    ( 'Amazonas', 'AM', 'Norte', 4.06);
    
-- Inserir Estados 2

INSERT INTO estados
    (nome, sigla, regiao, populacao)
VALUES
    ('Bahia', 'BA', 'Nordeste', 15.34),
    ('Ceará', 'CE', 'Nordeste', 9.02),
    ('Distrito Federal', 'DF', 'Centro-Oeste', 3.04),
    ('Espírito Santo', 'ES', 'Sudeste', 4.02),
    ('Goiás', 'GO', 'Centro-Oeste', 6.78),
    ('Maranhao', 'MA', 'Nordeste', 7.00),
    ('Mato Grosso', 'MT', 'Centro-Oeste', 3.34),
    ('Mato Grosso do Sul', 'MS', 'Centro-Oeste', 2.71),
    ('Minas Gerais', 'MG', 'Sudeste', 21.12),
    ('Pará', 'PA', 'Norte', 8.36),
    ('Paraíba', 'PB', 'Nordeste', 4.03),
    ('Parana', 'PR', 'Sul', 11.22),
    ('Pernambuco', 'PE', 'Nordeste', 9.47),
    ('Piauí', 'PI', 'Nordeste', 3.22),
    ('Rio de Janeiro', 'RJ', 'Sudeste', 16.72),
    ('Rio Grande do Norte', 'RN', 'Nordeste', 3.51),
    ('Rio Grande do Sul', 'RS', 'Sul', 11.32),
    ('Rondônia', 'RO', 'Norte', 1.81),
    ('Roraima', 'RR', 'Norte', 0.52),
    ('Santa Catarina', 'SC', 'Sul', 7.01),
    ('São Paulo', 'SP', 'Sudeste', 45.10),
    ('Sergipe', 'SE', 'Nordeste', 2.29),
    ('Tocantins', 'TO', 'Norte', 1.55);
    
-- Consultar Estados

SELECT *FROM ESTADOS;

SELECT SIGLA, NOME AS 'Nome do Estado' FROM ESTADOS
	WHERE REGIAO = 'SUL';

SELECT 
    NOME, REGIAO, POPULACAO
FROM
    ESTADOS
WHERE
    POPULACAO >= 10
ORDER BY POPULACAO DESC;   
        
-- Atualizar Estados

UPDATE ESTADOS 
SET 
    NOME = 'Maranhão'
WHERE
    SIGLA = 'MA';

SELECT 
    NOME
FROM
    ESTADOS
WHERE
    SIGLA = 'MA';
    
-- Usando Aliases

SELECT EST.NOME FROM ESTADOS EST WHERE SIGLA = 'MA';

UPDATE ESTADOS 
SET 
    NOME = 'Paraná',
    POPULACAO = 11.32
WHERE
    SIGLA = 'PR';
    
-- Inserir Novos estados por ID

INSERT INTO ESTADOS 
	(ID, NOME, SIGLA, REGIAO, POPULACAO)
VALUES 
	(1000, 'Novo', 'NV', 'Sul', 2.54);
    
SELECT * FROM ESTADOS;

INSERT INTO ESTADOS 
	( NOME, SIGLA, REGIAO, POPULACAO)
VALUES 
	('Mais Novo', 'MN', 'Norte', 2.51);
    
-- Excluir Estados

DELETE FROM ESTADOS WHERE SIGLA = 'MN';

SELECT * FROM ESTADOS;

DELETE FROM ESTADOS WHERE ID >= 1000;

-- Consultar com Agregação

-- SOMA
SELECT REGIAO AS 'Região', SUM(POPULACAO) AS TOTAL FROM ESTADOS GROUP BY REGIAO ORDER BY TOTAL DESC;

SELECT SUM(POPULACAO) AS TOTAL FROM ESTADOS;

-- MEDIA
SELECT AVG(POPULACAO) AS TOTAL FROM ESTADOS;

-- Criar tabela Cidades

CREATE TABLE IF NOT EXISTS CIDADES (
	ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(255) NOT NULL,
    ESTADO_ID INT UNSIGNED NOT NULL,
    AREA DECIMAL (10,2),
    PRIMARY KEY (ID),
    FOREIGN KEY (ESTADO_ID) REFERENCES ESTADOS (ID) -- FOREIGN KEY CHAVE ESTRANGEIRA    
);

CREATE TABLE IF NOT EXISTS TESTE (
	ID INT UNSIGNED NOT NULL AUTO_INCREMENT    
    PRIMARY KEY    
);

DROP TABLE IF EXISTS TESTE;

-- Inserir Cidades 

SELECT *FROM ESTADOS WHERE ID = 25;

INSERT INTO CIDADES (NOME, AREA, ESTADO_ID) 
VALUES ('Campinas', 795 , 25);

INSERT INTO CIDADES (NOME, AREA, ESTADO_ID) 
VALUES ('Niterói', 139.9, 19);

INSERT INTO CIDADES (NOME, AREA, ESTADO_ID) 
VALUES (
	'Caruaru', 920.6,  (SELECT ID FROM ESTADOS WHERE SIGLA = 'PE'));

INSERT INTO CIDADES (NOME, AREA, ESTADO_ID) 
VALUES (
	'Juazeiro do Norte', 248.2,  (SELECT ID FROM ESTADOS WHERE SIGLA = 'CE'));
    
SELECT *FROM CIDADES;    

-- Consultar Com Join

SELECT 
	E.NOME AS Estado, 
    C.NOME AS Cidade, 
    REGIAO AS Região
FROM ESTADOS E, CIDADES C WHERE E.ID = C.ESTADO_ID;

SELECT 
	E.NOME AS Estado, 
    C.NOME AS Cidade, 
    REGIAO AS Região
FROM ESTADOS E
INNER JOIN CIDADES C ON E.ID = C.ESTADO_ID;

-- Criar Tabela Prefeitos

CREATE TABLE IF NOT EXISTS PREFEITOS (
	ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(255) NOT NULL,
    CIDADE_ID INT UNSIGNED,
    PRIMARY KEY(ID),
    UNIQUE KEY (CIDADE_ID), -- Não aceita duplicação
    FOREIGN KEY (CIDADE_ID) REFERENCES CIDADES (ID) 
    );
    
    -- Inserir Prefeitos
    
    SELECT *FROM CIDADES;
    
    INSERT INTO PREFEITOS 
		(NOME, CIDADE_ID)
	VALUES
		('Rodrigo Neves', 2),
        ('Raquel Lyra', 3),
        ('Zenaldo Coutinho', NULL);
        
	SELECT *FROM PREFEITOS;
	
    INSERT INTO PREFEITOS
		(NOME, CIDADE_ID)
	VALUES
		('Rafael Greca', NULL);
	
    -- RELAÇAO 1 PRA 1 ACIMA
    
    -- Consultar com Joins
    
    SELECT *FROM PREFEITOS;
    SELECT *FROM CIDADES;
    SELECT *FROM CIDADES C INNER JOIN PREFEITOS P ON C.ID = P.CIDADE_ID;
    
    SELECT *FROM CIDADES C LEFT JOIN PREFEITOS P ON C.ID = P.CIDADE_ID;
	SELECT *FROM CIDADES C LEFT OUTER JOIN PREFEITOS P ON C.ID = P.CIDADE_ID; -- Funciona igual o left join, é a mesma coisa
    
    SELECT *FROM CIDADES C RIGHT JOIN PREFEITOS P ON C.ID = P.CIDADE_ID;
    
    SELECT *FROM CIDADES C LEFT OUTER JOIN PREFEITOS P ON C.ID = P.CIDADE_ID
    UNION -- ALL -- COM ALL TRAS TODAS AS DUPLICAÇÕES
	SELECT *FROM CIDADES C RIGHT JOIN PREFEITOS P ON C.ID = P.CIDADE_ID;
    
    -- Criar tabela Empresa
    
    CREATE TABLE IF NOT EXISTS EMPRESAS (
		ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
        NOME VARCHAR(255) NOT NULL, 
        CNPJ INT UNSIGNED,
        PRIMARY KEY(ID),
        UNIQUE KEY (CNPJ)
        );
        
        -- Cidades_empresas
	CREATE TABLE IF NOT EXISTS EMPRESAS_UNIDADES (
		EMPRESA_ID INT UNSIGNED NOT NULL,
        CIDADE_ID INT UNSIGNED NOT NULL,
        SEDE TINYINT(1) NOT NULL,
        PRIMARY KEY (EMPRESA_ID, CIDADE_ID)
        );
    
-- Inserir Empresas

ALTER TABLE EMPRESAS MODIFY CNPJ VARCHAR(14);

DESC EMPRESAS; -- DESCREVER A TABELA
DESC PREFEITOS;
SELECT *FROM EMPRESAS;
SELECT *FROM CIDADES;
	INSERT INTO EMPRESAS 
		(NOME, CNPJ)
	VALUES
		('Bradesco', 9569418000132),
        ('Vale', 27887148000146),
        ('Cielo', 01598317000134);
        
INSERT INTO EMPRESAS_UNIDADES
	(EMPRESA_ID, CIDADE_ID, SEDE)
VALUES
	(1, 1, 1),
    (1, 2, 0),
    (2, 1, 0),
    (2, 2, 1);
    
-- Consultar Empresas
SELECT E.NOME EMPRESA, C.NOME AS `CIDADES`
FROM EMPRESAS E, EMPRESAS_UNIDADES EU, CIDADES C
WHERE E.ID  = EU.EMPRESA_ID
AND C.ID = EU.CIDADE_ID
AND SEDE
