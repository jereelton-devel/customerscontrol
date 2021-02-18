
# Customers Control

> Projeto para realizar testes com framework laravel

<hr />

<h2>Especificações</h2>

* Linux Ubuntu 20.04 LTS
* Homestead v10.17.0, v11.4.0
* Settler v9.7.2 (Ubuntu 18.04)
* Settler v10.1.1 (Ubuntu 20.04)
* Laravel 7.25.0 ou superior
* PHP 7.4 ou superior
* Banco de dados: MSSQL, MYSQL, PGSQL

<hr />

<h2>Procedimentos Necessários para uso</h2>

> <h4>Composer</h4>
> composer update, composer install

> <h4>Npm/Yarn</h4>
> npm update, npm install, yarn install

> <h4>Criar Tabelas (Migrations) migrate</h4>
> php artisan migrate ou php artisan migrate:fresh

> <h4>Rodar o Seeder User</h4>
> php artisan db:seed --class=UserTableSeeder

> <h4>Rodar o Seeder Country</h4>
> php artisan db:seed --class=CountryTableSeeder

> <h4>Rodar o Seeder Customer</h4>
> php artisan db:seed --class=CustomerTableSeeder

> [ATALHO SEEDER]: php artisan db:seed

<hr />

<h2>Bugs</h2>

* <strong>[NÃO RESOLVIDO]</strong> : Botão de voltar do browser esta fazendo cache da pagina mesmo após o logout

<hr />

<h2>TODO</h2>

* Paginação de resultados

<hr />

<h2>Instalação do Homestead e Vagrant</h2>

<h4>Instalar o gerenciador de pacotes/dependencias composer</h4>
<pre>sudo apt-get install composer</pre>

<h4>Instalar o gerenciador de VM Vagrant para ser usado junto com o virtualbox</h4>
<pre>sudo apt-get install vagrant</pre>

<h4>Baixar a imagem da VM referente, no caso o ambiente homestead para laravel</h4>
<pre>
vagrant box add laravel/homestead
2) virtualbox (provider)
==> box: Successfully added box 'laravel/homestead' (v11.0.0) for 'virtualbox'!
/home/jereelton/Homestead/ "(nada nessa pasta)"
/home/jereelton/Vagrant/homestead/ "(nada nessa pasta)"
/home/jereelton/VirtualBox VMs/ "(nada nessa pasta)"
/home/jereelton/.vagrant.d/boxes/laravel-VAGRANTSLASH-homestead/11.0.0/virtualbox/ "(local da imagem baixada com vagrant: 1.8GB)"
</pre>

<h4>Clonar o projeto homestead da laravel e configurar o ambiente</h4>
<h6>NOTA: Repare que o local de instalação do projeto é na home do usuário</h6>
<pre>git clone https://github.com/laravel/homestead.git ~/Homestead</pre>

<h4>Acessar a pasta do projeto</h4>
<pre>cd ~/Homestead/</pre>

<h4>Mudar para a branch release do repositorio laravel/homestead</h4>
<pre>git checkout release</pre>

<h4>Inicializar o homestead</h4>
<h6>NOTA: Esse procedimento gera um arquivo Homestead.yaml na raiz do projeto</h6>
<pre>bash init.sh</pre>

<h4>Gerar a chave publica para o ambiente homestead</h4>
<pre>
ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/jereelton/.ssh/id_rsa): /home/jereelton/.ssh/id_rsa_homestead
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/jereelton/.ssh/id_rsa_homestead
Your public key has been saved in /home/jereelton/.ssh/id_rsa_homestead.pub
The key fingerprint is:
SHA256:vSlzwxINgpXBSD123456YpLDGVUn35E+2+DdyKMaaU4 jereelton@jereelton-ubuntu-desktop
The keys randomart image is:
+---[RSA 3072]----+
|.+.++Oo+ ..      |
|+o= =o* ...      |
|*+xytp..o.       |
|oo     . B       |
|        S X o    |
|        .= O .   |
|       E+ B .    |
|      + .* .     |
|       o.        |
+----[SHA256]-----+
jereelton@jereelton-ubuntu-desktop:~/Homestead$ ls -ltr ~/.ssh/
total 24
-rw-r--r-- 1 jereelton jereelton  573 jan  9 17:36 id_rsa_ubuntu_desktop_devel.pub
-rw------- 1 jereelton jereelton 2655 jan  9 17:36 id_rsa_ubuntu_desktop_devel
-rw-r--r-- 1 jereelton jereelton  270 jan  9 17:39 config
-rw-r--r-- 1 jereelton jereelton 3316 fev 11 22:46 known_hosts
-rw-r--r-- 1 jereelton jereelton  588 fev 12 20:20 id_rsa_homestead.pub
-rw------- 1 jereelton jereelton 2622 fev 12 20:20 id_rsa_homestead
</pre>

<h4>Configurar arquivo</h4>
<h6>NOTA: Use um editor de texto qualquer</h6>
<pre>
sublime-text.subl Homestead.yaml
[*****************************************EXEMPLO*************************************]
---
ip: "192.168.10.10"
memory: 2048
cpus: 2
provider: virtualbox

		authorize: ~/.ssh/id_rsa_homestead.pub

		keys:
		    - ~/.ssh/id_rsa_homestead

		folders:
		    - map: ~/Devel/laravel/exemplo
		      to: /home/vagrant/code/exemplo

		    - map: ~/Devel/laravel/app1
		      to: /home/vagrant/code/app1

		    - map: ~/Devel/laravel/app2
		      to: /home/vagrant/code/app2

		sites:
		    - map: exemplo.local
		      to: /home/vagrant/code/exemplo

		    - map: app2.local
		      to: /home/vagrant/code/app1/public
		      
		    - map: app1.test
		      to: /home/vagrant/code/app2/public

		databases:
		    - homestead

		features:
		    - mysql: false
		    - mariadb: false
		    - postgresql: false
		    - ohmyzsh: false
		    - webdriver: false

		#services:
		#    - enabled:
		#        - "postgresql@12-main"
		#    - disabled:
		#        - "postgresql@11-main"

		# ports:
		#     - send: 50000
		#       to: 5000
		#     - send: 7777
		#       to: 777
		#       protocol: udp
	[*******************************************************************************************]
</pre>

<h4>Definir resolução de nomes para os sites/projetos dentro do homestead</h4>
<pre>
configurar /etc/hosts
192.168.10.10	exemplo.local
192.168.10.10	app1.test
192.168.10.10	app2.test
</pre>

<h4>Inicializar o ambiente com o vagrant</h4>
<h6>NOTA: Nesse ponto a imagem baixada pelo vagrant é incorporada ao virtualbox</h6>
<pre>
vagrant up --provision

#local onde ficam os arquivos e configurações da maquina
/home/jereelton/Homestead/.vagrant/machines/homestead/virtualbox/

#local da imagem baixada com vagrant: 1.8GB
/home/jereelton/.vagrant.d/boxes/laravel-VAGRANTSLASH-homestead/11.0.0/virtualbox/

#local da VM no Virtual Box: 6.4GB
/home/jereelton/VirtualBox VMs/homestead/
</pre>

<h4>EXTRAS: Comandos para auxiliar no vagrant</h4>
<pre>
vagrant halt  => "Desligar VM"
vagrant ssh ou ssh vagrant@192.168.10.10 => "Acesso via ssh na VM"
vagrant resume => "Continuar VM pausada"
vagrant reload --provision => "Reinciiar VM"
vagrant destroy ff40a74 (id) => "Remover VM"
vagrant global-status => "Verificar status e ids das VMs"
</pre>

* Configuração Do Ambiente Homestead Finalizado!

<hr />

<h2>Usar uma versão especifica do laravel</h2>
<h6>NOTA: Para iniciar a instalação de uma versão especifica</h6>
<pre>
composer create-project --prefer-dist laravel/laravel:^7.25 .
</pre>

<hr />

<h2>Configurar o projeto criado com laravel</h4>

<h4>Configurar um projeto</h4>

<pre>
#Acessar o local onde o projeto foi criado, exemplo:
/home/jereelton/Devel/laravel/app2/teste

#Mover o arquivo ENV e edita-lo (configurações do projeto laravel)
mv .env.example .env

#Atualizar o projeto via composer
composer update

#Atualizar dependencias do projeto
composer install

#Atualizar a estrutura do autoload para mapear as novas dependencias
composer dump-autoload

#Gerar a chave de autenticação da aplicação
php artisan key:generate
</pre>

<h4>Configurar o banco de dados</h4>

> IMPORTANTE: Este processo serve apenas para os casos onde ainda não existe o banco de dados, ou casos onde uma nova instalação foi realizada.

* MYSQL
<pre>
[CRIAR USUARIO DEDICADO]

# Acessar o mysql como root ou homestead
mysql -u root -p
    Infome a senha:

# Criar o usuario
CREATE USER 'devel'@'localhost' IDENTIFIED BY '123mudar';
CREATE USER 'devel'@'%' IDENTIFIED BY '123mudar';

# Consultar usuario criado
SELECT user, authentication_string, plugin, host FROM mysql.user;

# Conceder privilegios ao usuario criado
GRANT ALL PRIVILEGES ON *.* TO 'devel'@'localhost' WITH GRANT OPTION;

# Caso necessario atualizar as concessões do novo usuário
FLUSH PRIVILEGES;

# Testar conexao com o novo usuario
mysql -u devel -p
    Infome a senha:

# Criar a base de dados para o usuário/aplicação
CREATE SCHEMA `db_laravel` DEFAULT CHARACTER SET utf8mb4;

# Pode ser utilizado o Workbench ou DBeaver para gerenciar o Banco
</pre>

* MSSQL
<pre>
[ESSA OPERAÇÃO UTILIZA O USUARIO PADRAO DO MSSQL (SA) E SENHA DEVEL (123Mudar$)]

# Atualizar sistema
sudo apt-get update
sudo apt-get -y upgrade

# Adicionar a chave publica de confiança da microsoft
sudo wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

# Adicionar o repositorio da microsoft na lista do ubuntu
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2019.list)"

# Instalar o servidor MSSQL
sudo apt install mssql-server

# Configurar o MSSQL, licença de uso, senha etc...
sudo /opt/mssql/bin/mssql-conf setup

# Verificar se o serviço do mssql esta ativo
systemctl status mssql-server.service

# Adicionar chave publica de confiança da microsoft
curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

# Obter lista de respositorio necessario da microsoft
curl https://packages.microsoft.com/config/ubuntu/19.10/prod.list > mssql-release.list
sudo cp mssql-release.list /etc/apt/sources.list.d/mssql-release.list

# Aceitar e instalar a ferramenta sqlcmd de linha de comando para gerenciamento de banco
sudo ACCEPT_EULA=Y apt install mssql-tools unixodbc-dev

# Atualizar novamete o sistema apos configurar o ambiente para uso do MSSQL
sudo apt update

# Configurar a variavel de ambiente PATH para executar o sqlcmd (opcional)
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
source ~/.bashrc

# Executar em CLI
sqlcmd -S 127.0.0.1 -U SA

# Nesse caso a base de dados foi criada pelo SGBD DBeaver
</pre>

* PGSQL
<pre>
[PARA TODOS OS USUARIOS A SENHA É PADRÃO (123mudar)]

# Instalar o postgres caso ainda nao tenhao instalado
sudo apt-get install postgresql

# Assumir o super usuario do postgres
sudo su - postgres "acesso ao ambiente postgres"
psql "para abrir o terminal CLI do postgres"

# Adicionar um usuario para gerenciar o banco de dados
CREATE USER devel SUPERUSER INHERIT CREATEDB CREATEROLE;
ALTER USER devel PASSWORD '123mudar';
\du "para listar os usuarios"

                                  List of roles
Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
devel     | Superuser, Create role, Create DB                          | {}
homestead | Superuser                                                  | {}
pgteste   | Superuser, Create role, Create DB                          | {}
postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

"também pode ser criado da seguinte forma" 
createuser -P pgteste "porem sem as devidas permissões"

                                  List of roles
Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
devel     | Superuser, Create role, Create DB                          | {}
homestead | Superuser                                                  | {}
pgteste   |                                                            | {}
postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

# Editar permissoes de acesso de outros usuarios/hosts
sudo su - postgres
sudo vi /etc/postgresql/9.6/main/pg_hba.conf
sudo vi /etc/postgresql/10/main/pg_hba.conf
sudo vi /etc/postgresql/11/main/pg_hba.conf
sudo vi /etc/postgresql/12/main/pg_hba.conf
sudo vi /etc/postgresql/13/main/pg_hba.conf

=============================================================================
TODAS AS VERSÃO INSTALADAS DEVEM SEGUIR A CONFIGURAÇÃO ABAIXO NOS RESPECTIVOS 
ARQUIVOS DE CONFIGURAÇÃO
=============================================================================
listen_addresses = '*'
    port = 5432

#Habilitar porta padrão de comunicação ao postgresql
sudo ufw allow from any to any port 5432 proto tcp

#Verificar a lista de portas disponiveis e ouvintes
ss -nlt

#Apos alterações, reiniciar o serviço do postgresql
sudo systemctl restart postgresql
systemctl status postgresql.service

#Nesse caso a base de dados foi criada pelo SGBD DBeaver
</pre>

<h4>Preparar ambiente para autenticação</h4>

<pre>
#Instalar as dependencias para iniciar a configuração de autenticação
composer require laravel/ui:^2.4
php artisan ui vue --auth
npm init
npm install
yarn install

#Instalar o bootstrap e demais recursos front-end
// Generate basic scaffolding...
php artisan ui bootstrap
php artisan ui vue
php artisan ui react

// Generate login / registration scaffolding...
php artisan ui bootstrap --auth
php artisan ui vue --auth
php artisan ui react --auth
</pre>

<h4>Ambiente para autenticação</h4>

<pre>
# {ROOT_PATH}/app/Exceptions/Handler.php

    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

# {ROOT_PATH}/app/Http/Controllers/Auth/LoginController.php

    protected $redirectTo = '/access_control';

# {ROOT_PATH}/app/Http/Controllers/Auth/RegisterController.php

    protected  $redirectTo = '/login';

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'user_level' => 'required|max:1',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    protected function create(array $data)
    {
        return User::create([
            'user_level' => $data['user_level'],
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

# {ROOT_PATH}/app/Http/Middleware/RedirectIfAuthenticated.php

    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            return redirect('/');
        }

        return $next($request);
    }

# {ROOT_PATH}/app/JereeltonDevel/LoginRoute.php
    
    Classe para gerenciar regras de rotas (transformar em controller)

# {ROOT_PATH}/app/Providers/AppServiceProvider.php
    
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

# {ROOT_PATH}/app/User.php

    class User extends Authenticatable
    {
        use Notifiable;
    
        protected $guard = 'user';
        protected $table = 'users';

-----------------------------------------------------------------------------------------------------

        /**
         * Send the password reset notification.
         *
         * @param  string  $token
         * @return void
         */
        public function sendPasswordResetNotification($token)
        {
            $this->notify(new ResetPasswordNotification($token));
        }

# {ROOT_PATH}/config/app.php

    'name' => env('APP_NAME', 'Teste'),
    'timezone' => 'America/Sao_Paulo',

# {ROOT_PATH}/config/view.php

    'paths' => [
        resource_path('views'),
        public_path("views"),
    ],

# {ROOT_PATH}/public

# {ROOT_PATH}/resources

# {ROOT_PATH}/routes/web.php

</pre>

* Configuração de Projeto Finalizado!

<hr />
